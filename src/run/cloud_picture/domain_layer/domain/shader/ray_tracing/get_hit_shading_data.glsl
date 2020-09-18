
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
  vec4 normal;
  // TODO perf: pack texCoord to position,normal
  //   vec4 texCoord;
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

vec3 _getMaterialDiffuse(PBRMaterial mat) { return vec3(mat.diffuse); }

float _getMaterialMetalness(PBRMaterial mat) { return mat.metalness; }

float _getMaterialRoughness(PBRMaterial mat) { return mat.roughness; }

float _getMaterialSpecular(PBRMaterial mat) { return mat.specular; }

ivec3 _getTriangleIndices(uint faceIndex, uint primitiveIndex) {
  return ivec3(indices.i[faceIndex + 3 * primitiveIndex + 0],
               indices.i[faceIndex + 3 * primitiveIndex + 1],
               indices.i[faceIndex + 3 * primitiveIndex + 2]);
}

Vertex _getTriangleVertex(uint vertexIndex, uint index) {
  return vertices.v[vertexIndex + index];
}

struct HitShadingData {
  vec3 worldPosition;
  vec3 worldNormal;
  vec3 V;
  vec3 materialDiffuse;
  // vec3 materialSpecularColor;
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

  const vec3 barycentrics =
      vec3(1.0 - attribs.x - attribs.y, attribs.x, attribs.y);

  // Computing the normal at hit position
  vec3 localNormal = vec3(v0.normal) * barycentrics.x +
                     vec3(v1.normal) * barycentrics.y +
                     vec3(v2.normal) * barycentrics.z;

  // Computing the coordinates of the hit position
  vec3 localPos = vec3(v0.position) * barycentrics.x +
                  vec3(v1.position) * barycentrics.y +
                  vec3(v2.position) * barycentrics.z;

  PBRMaterial mat = _getMaterial(materialIndex);

  HitShadingData data;
  data.worldPosition =
      vec3(_getModelMatrix(instanceData) * vec4(localPos, 1.0));
  data.worldNormal = normalize(_getNormalMatrix(instanceData) * localNormal);

  // data.V = normalize(uCamera.cameraPosition.xyz - data.worldPosition);
  data.V = -gl_WorldRayDirectionEXT;

  data.materialDiffuse = _getMaterialDiffuse(mat);
  data.materialMetalness = _getMaterialMetalness(mat);
  data.materialRoughness = _getMaterialRoughness(mat);
  data.materialSpecular = _getMaterialSpecular(mat);

  return data;
}
