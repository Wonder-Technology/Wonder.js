
struct InstanceData {
  float geometryIndex;
  float materialIndex;
  float pad_0;
  float pad_1;

  mat3 normalMatrix;
  mat4 modelMatrix;
};

struct Vertex {
  vec4 position;
  vec4 texCoord;
  vec4 normal;
  vec4 tangent;
};

/*
extract this to avoid duplicate instead of move this into InstanceData.
*/
struct PointIndexData {
  uint vertexIndex;
  uint faceIndex;
};

struct PBRMaterial {
  vec4 diffuse;

  float metalness;
  float roughness;
  float specular;
  float pad_0;

  float diffuseMapLayerIndex;
  float metalRoughnessMapLayerIndex;
  float emissionMapLayerIndex;
  float normalMapLayerIndex;

  vec2 diffuseMapOffset;
  vec2 metalRoughnessMapOffset;
  vec2 emissionMapOffset;
  vec2 normalMapOffset;
};

hitAttributeEXT vec3 attribs;

layout(std140, set = 0, binding = 3) buffer SceneDesc { InstanceData i[]; }
sceneDesc;

layout(scalar, set = 0, binding = 4) buffer ScenePointIndexData {
  PointIndexData o[];
}
scenePointIndexData;

// TODO use array of blocks!how to upload data???
layout(scalar, set = 0, binding = 5) buffer Vertices { Vertex v[]; }
vertices;
layout(scalar, set = 0, binding = 6) buffer Indices { uint i[]; }
indices;

layout(std140, set = 0, binding = 7) buffer MatColorBufferObject {
  PBRMaterial m[];
}
materials;

layout(set = 0, binding = 8) uniform sampler textureSampler;
layout(set = 0, binding = 9) uniform texture2DArray textureArray;

vec2 _blerp(vec2 b, vec2 p1, vec2 p2, vec2 p3) {
  return (1.0 - b.x - b.y) * p1 + b.x * p2 + b.y * p3;
}

vec3 _blerp(vec2 b, vec3 p1, vec3 p2, vec3 p3) {
  return (1.0 - b.x - b.y) * p1 + b.x * p2 + b.y * p3;
}

uint _getVertexIndex(PointIndexData pointIndexData) {
  return pointIndexData.vertexIndex;
}

uint _getFaceIndex(PointIndexData pointIndexData) {
  return pointIndexData.faceIndex;
}

mat3 _getNormalMatrix(InstanceData instanceData) {
  return instanceData.normalMatrix;
}

mat4 _getModelMatrix(InstanceData instanceData) {
  return instanceData.modelMatrix;
}

InstanceData _getInstanceData(uint instanceIndex) {
  return sceneDesc.i[instanceIndex];
}

PointIndexData _getPointIndexData(uint geometryIndex) {
  return scenePointIndexData.o[geometryIndex];
}

PBRMaterial _getMaterial(uint materialIndex) {
  return materials.m[materialIndex];
}

ivec3 _getTriangleIndices(uint faceIndex, uint primitiveIndex) {
  return ivec3(indices.i[faceIndex + 3 * primitiveIndex + 0],
               indices.i[faceIndex + 3 * primitiveIndex + 1],
               indices.i[faceIndex + 3 * primitiveIndex + 2]);
}

Vertex _getTriangleVertex(uint vertexIndex, uint index) {
  return vertices.v[vertexIndex + index];
}

bool _hasMap(uint mapLayerIndex) { return mapLayerIndex < 2048; }

struct HitShadingData {
  vec3 worldPosition;
  vec3 worldNormal;
  vec3 V;
  vec3 materialDiffuse;
  vec3 materialEmission;
  float materialMetalness;
  float materialRoughness;
  float materialSpecular;
};

HitShadingData getHitShadingData(uint instanceIndex, uint primitiveIndex) {
  InstanceData instanceData = _getInstanceData(instanceIndex);

  uint geometryIndex = uint(instanceData.geometryIndex);
  uint materialIndex = uint(instanceData.materialIndex);

  PointIndexData pointIndexData = _getPointIndexData(geometryIndex);
  uint vertexIndex = _getVertexIndex(pointIndexData);
  uint faceIndex = _getFaceIndex(pointIndexData);

  // Indices of the triangle
  ivec3 ind = _getTriangleIndices(faceIndex, primitiveIndex);

  // Vertex of the triangle
  Vertex v0 = _getTriangleVertex(vertexIndex, ind.x);
  Vertex v1 = _getTriangleVertex(vertexIndex, ind.y);
  Vertex v2 = _getTriangleVertex(vertexIndex, ind.z);

  const vec2 u0 = v0.texCoord.xy, u1 = v1.texCoord.xy, u2 = v2.texCoord.xy;
  const vec3 n0 = v0.normal.xyz, n1 = v1.normal.xyz, n2 = v2.normal.xyz;
  const vec3 t0 = v0.tangent.xyz, t1 = v1.tangent.xyz, t2 = v2.tangent.xyz;

  const vec2 uv = _blerp(attribs.xy, u0.xy, u1.xy, u2.xy);
  const vec3 no = _blerp(attribs.xy, n0.xyz, n1.xyz, n2.xyz);
  const vec3 ta = _blerp(attribs.xy, t0.xyz, t1.xyz, t2.xyz);

  mat3 normalMatrix = _getNormalMatrix(instanceData);

  const vec3 nw = normalize(normalMatrix * no);
  const vec3 tw = normalize(normalMatrix * ta);
  const vec3 bw = cross(nw, tw);

  PBRMaterial mat = _getMaterial(materialIndex);

  uint diffuseMapLayerIndex = uint(mat.diffuseMapLayerIndex);
  uint normalMapLayerIndex = uint(mat.normalMapLayerIndex);
  uint emissionMapLayerIndex = uint(mat.emissionMapLayerIndex);
  uint metalRoughnessMapLayerIndex = uint(mat.metalRoughnessMapLayerIndex);

  HitShadingData data;

  if (_hasMap(diffuseMapLayerIndex)) {
    data.materialDiffuse =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(uv * diffuseMapOffset, diffuseMapLayerIndex))
            .rgb +
        vec3(mat.diffuse);
  } else {
    data.materialDiffuse = vec3(mat.diffuse);
  }

  if (_hasMap(normalMapLayerIndex)) {
    data.worldNormal =
        mat3(tw, bw, nw) *
        normalize((texture(sampler2DArray(textureArray, textureSampler),
                           vec3(uv * normalMapOffset, mat.normalIndex))
                       .rgb) *
                      2.0 -
                  1.0)
            .xyz;
  } else {
    data.worldNormal = nw;
  }

  if (_hasMap(emissionMapLayerIndex)) {
    data.materialEmission =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(uv * emissionMapOffset, emissionIndex))
            .rgb;
  } else {
    data.materialEmission = vec3(0.0);
  }

  vec2 metalRoughness;
  if (_hasMap(metalRoughnessMapLayerIndex)) {
    metalRoughness =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(uv * metalRoughnessMapOffset, metalRoughnessMapLayerIndex))
            .rg;

    data.materialMetalness = metalRoughness.r + mat.metalness;
    data.materialRoughness = metalRoughness.g + mat.roughness;
  } else {
    data.materialMetalness = mat.metalness;
    data.materialRoughness = mat.roughness;
  }

  const vec3 p0 = v0.position.xyz, p1 = v1.position.xyz, p2 = v2.position.xyz;

  vec3 localPos = _blerp(attribs.xy, p0.xyz, p1.xyz, p2.xyz);

  data.worldPosition =
      vec3(_getModelMatrix(instanceData) * vec4(localPos, 1.0));

  // data.V = normalize(uCamera.cameraPosition.xyz - data.worldPosition);
  data.V = -gl_WorldRayDirectionEXT;

  return data;
}
