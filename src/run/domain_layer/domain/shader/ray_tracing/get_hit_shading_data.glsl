
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

/*!
extract this to avoid duplicate instead of move this into InstanceData.
*/
struct PointIndexData {
  uint vertexIndex;
  uint faceIndex;
};

struct BSDFMaterial {
  vec4 diffuse;

  vec3 emissionColor;
  float pad_0;

  vec4 specularColorAndAlphaCutoff;

  float metalness;
  float roughness;
  float specular;
  float transmission;

  float ior;
  float isDoubleSide;
  float diffuseMapLayerIndex;
  float channelRoughnessMetallicMapLayerIndex;

  float emissionMapLayerIndex;
  float normalMapLayerIndex;
  float transmissionMapLayerIndex;
  float specularMapLayerIndex;

  vec2 diffuseMapScale;
  vec2 channelRoughnessMetallicMapScale;

  vec2 emissionMapScale;
  vec2 normalMapScale;

  vec2 transmissionMapScale;
  vec2 specularMapScale;

  vec2 diffuseMapWrapData;
  vec2 channelRoughnessMetallicMapWrapData;

  vec2 emissionMapWrapData;
  vec2 normalMapWrapData;

  vec2 transmissionMapWrapData;
  vec2 specularMapWrapData;
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
  BSDFMaterial m[];
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

BSDFMaterial _getMaterial(uint materialIndex) {
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
  vec3 materialSpecularColor;
  vec3 materialEmission;
  float materialMetalness;
  float materialRoughness;
  float materialSpecular;
  float materialTransmission;
  float materialIOR;
};

bool _isUseAlphaAsCoverageInsteadOfTransmission(float alphaCutoff) {
  return alphaCutoff > 0.0;
}

bool _isHandleAlphaCutoff(float alphaCutoff) { return alphaCutoff != 1.0; }

float _computeUVFieldByWrap(float wrap, float uvField) {
  switch (int(wrap)) {
    // ClampToEdge
  case 0:
    if (uvField > 1.0) {
      return 1.0;
    } else if (uvField < 0.0) {
      return 0.0;
    } else {
      return uvField;
    }
    // Repeat
  case 1:
    if (uvField > 1.0) {
      return uvField - int(uvField);
    } else if (uvField < 0.0) {
      return 1.0 - (abs(uvField) - int(abs(uvField)));
    } else {
      return uvField;
    }
    // Mirror
  case 2:
    if (uvField > 1.0) {
      if (int(uvField) % 2 == 1) {
        return 1.0 - (uvField - int(uvField));
      } else {
        return (uvField - int(uvField));
      }
    } else if (uvField < 0.0) {
      if (int(abs(uvField)) % 2 == 1) {
        return 1.0 - (abs(uvField) - int(abs(uvField)));
      } else {
        return abs(uvField) - int(abs(uvField));
      }
    } else {
      return uvField;
    }
  }
}

vec2 _computeUVByWrapData(vec2 wrapData, vec2 uv) {
  return vec2(_computeUVFieldByWrap(wrapData.x, uv.x),
              _computeUVFieldByWrap(wrapData.y, uv.y));
  // return uv;
}

bool _isFrontFace(vec3 rayDir, vec3 normal) {
  return dot(rayDir, normal) <= 0.0;
}

vec3 _revertForBackFace(vec3 normalRelatedData, bool isFrontFace) {
  return normalRelatedData * (float(isFrontFace) * 2.0 - 1.0);
}

void getVertices(in uint instanceIndex, in uint primitiveIndex, out Vertex v0,
                 out Vertex v1, out Vertex v2) {
  InstanceData instanceData = _getInstanceData(instanceIndex);

  uint geometryIndex = uint(instanceData.geometryIndex);

  PointIndexData pointIndexData = _getPointIndexData(geometryIndex);
  uint vertexIndex = _getVertexIndex(pointIndexData);
  uint faceIndex = _getFaceIndex(pointIndexData);

  // Indices of the triangle
  ivec3 ind = _getTriangleIndices(faceIndex, primitiveIndex);

  // Vertex of the triangle
  v0 = _getTriangleVertex(vertexIndex, ind.x);
  v1 = _getTriangleVertex(vertexIndex, ind.y);
  v2 = _getTriangleVertex(vertexIndex, ind.z);
}

vec2 getUV(in Vertex v0, in Vertex v1, in Vertex v2) {
  const vec2 u0 = v0.texCoord.xy, u1 = v1.texCoord.xy, u2 = v2.texCoord.xy;

  return _blerp(attribs.xy, u0.xy, u1.xy, u2.xy);
}

void getMaterialDiffuseAndTransmissionAndIOR(in BSDFMaterial mat, in vec2 uv,
                                             out vec3 materialDiffuse,
                                             out float materialTransmission,
                                             out float materialIOR) {
  float alphaCutoff = mat.specularColorAndAlphaCutoff.w;
  float alpha = 1.0;

  uint diffuseMapLayerIndex = uint(mat.diffuseMapLayerIndex);
  uint transmissionMapLayerIndex = uint(mat.transmissionMapLayerIndex);

  if (_hasMap(diffuseMapLayerIndex)) {
    vec4 diffuseMapData =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(_computeUVByWrapData(mat.diffuseMapWrapData, uv) *
                         mat.diffuseMapScale,
                     diffuseMapLayerIndex));

    materialDiffuse = convertSRGBToLinear(diffuseMapData.rgb) * mat.diffuse.rgb;

    alpha = diffuseMapData.a * mat.diffuse.a;
  } else {
    materialDiffuse = mat.diffuse.rgb;

    alpha = mat.diffuse.a;
  }

  if (_isUseAlphaAsCoverageInsteadOfTransmission(alphaCutoff)) {
    if (_isHandleAlphaCutoff(alphaCutoff)) {
      materialTransmission = alpha >= alphaCutoff ? 0.0 : 1.0;
    } else {
      materialTransmission = 1.0 - alpha;
    }

    materialIOR = 1.0;
  } else {
    if (_hasMap(transmissionMapLayerIndex)) {
      materialTransmission =
          texture(sampler2DArray(textureArray, textureSampler),
                  vec3(_computeUVByWrapData(mat.transmissionMapWrapData, uv) *
                           mat.transmissionMapScale,
                       transmissionMapLayerIndex))
              .r *
          mat.transmission;
    } else {
      materialTransmission = mat.transmission;
    }

    materialIOR = mat.ior;
  }
}

BSDFMaterial getMaterial(uint instanceIndex) {
  InstanceData instanceData = _getInstanceData(instanceIndex);

  uint materialIndex = uint(instanceData.materialIndex);

  return _getMaterial(materialIndex);
}

HitShadingData getHitShadingData(uint instanceIndex, uint primitiveIndex) {
  InstanceData instanceData = _getInstanceData(instanceIndex);

  Vertex v0;
  Vertex v1;
  Vertex v2;

  getVertices(instanceIndex, primitiveIndex, v0, v1, v2);

  const vec3 n0 = v0.normal.xyz, n1 = v1.normal.xyz, n2 = v2.normal.xyz;
  const vec3 t0 = v0.tangent.xyz, t1 = v1.tangent.xyz, t2 = v2.tangent.xyz;

  vec3 no = _blerp(attribs.xy, n0.xyz, n1.xyz, n2.xyz);
  const vec3 ta = _blerp(attribs.xy, t0.xyz, t1.xyz, t2.xyz);

  mat3 normalMatrix = _getNormalMatrix(instanceData);

  vec3 nw = normalize(normalMatrix * no);
  vec3 tw = normalize(normalMatrix * ta);
  vec3 bw = cross(nw, tw);

  BSDFMaterial mat = getMaterial(instanceIndex);

  if (bool(mat.isDoubleSide)) {
    bool isFrontFace = _isFrontFace(gl_WorldRayDirectionEXT, nw);

    nw = _revertForBackFace(nw, isFrontFace);
    tw = _revertForBackFace(tw, isFrontFace);
    bw = _revertForBackFace(bw, isFrontFace);
  }

  uint normalMapLayerIndex = uint(mat.normalMapLayerIndex);
  uint emissionMapLayerIndex = uint(mat.emissionMapLayerIndex);
  uint channelRoughnessMetallicMapLayerIndex =
      uint(mat.channelRoughnessMetallicMapLayerIndex);
  uint specularMapLayerIndex = uint(mat.specularMapLayerIndex);

  HitShadingData data;

  vec2 uv = getUV(v0, v1, v2);

  getMaterialDiffuseAndTransmissionAndIOR(mat, uv, data.materialDiffuse,
                                          data.materialTransmission,
                                          data.materialIOR);

  if (_hasMap(specularMapLayerIndex)) {
    vec4 specularMap =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(_computeUVByWrapData(mat.specularMapWrapData, uv) *
                         mat.specularMapScale,
                     specularMapLayerIndex));

    data.materialSpecularColor = convertSRGBToLinear(specularMap.rgb) *
                                 mat.specularColorAndAlphaCutoff.xyz;

    data.materialSpecular = specularMap.a * mat.specular;
  } else {
    data.materialSpecularColor = mat.specularColorAndAlphaCutoff.xyz;
    data.materialSpecular = mat.specular;
  }

  if (_hasMap(normalMapLayerIndex)) {
    data.worldNormal = normalize(
        mat3(tw, bw, nw) *
        normalize(
            (texture(sampler2DArray(textureArray, textureSampler),
                     vec3(_computeUVByWrapData(mat.normalMapWrapData, uv) *
                              mat.normalMapScale,
                          normalMapLayerIndex))
                 .rgb) *
                2.0 -
            1.0)
            .xyz);
  } else {
    data.worldNormal = nw;
  }

  if (_hasMap(emissionMapLayerIndex)) {
    vec4 emissionMapData =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(_computeUVByWrapData(mat.emissionMapWrapData, uv) *
                         mat.emissionMapScale,
                     emissionMapLayerIndex));

    data.materialEmission =
        convertSRGBToLinear(emissionMapData.rgb) * mat.emissionColor;
  } else {
    data.materialEmission = mat.emissionColor;
  }

  vec2 metallicRoughness;
  if (_hasMap(channelRoughnessMetallicMapLayerIndex)) {
    metallicRoughness =
        texture(sampler2DArray(textureArray, textureSampler),
                vec3(_computeUVByWrapData(
                         mat.channelRoughnessMetallicMapWrapData, uv) *
                         mat.channelRoughnessMetallicMapScale,
                     channelRoughnessMetallicMapLayerIndex))
            .bg;

    data.materialMetalness = metallicRoughness.r + mat.metalness;
    data.materialRoughness = metallicRoughness.g + mat.roughness;
  } else {
    data.materialMetalness = mat.metalness;
    data.materialRoughness = mat.roughness;
  }

  const vec3 p0 = v0.position.xyz, p1 = v1.position.xyz, p2 = v2.position.xyz;

  vec3 localPos = _blerp(attribs.xy, p0.xyz, p1.xyz, p2.xyz);

  data.worldPosition =
      vec3(_getModelMatrix(instanceData) * vec4(localPos, 1.0));

  data.V = getVFromRayDirection(gl_WorldRayDirectionEXT);

  return data;
}