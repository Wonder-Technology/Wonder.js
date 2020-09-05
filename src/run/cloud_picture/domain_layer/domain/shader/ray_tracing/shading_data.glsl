
struct ShadingData {
  vec3 baseColor;
  float metallic;
  float specular;
  float roughness;
  //specularLobeProb
  float csw;
};

ShadingData buildShadingData(vec3 materialDiffuse, float materialMetalness,
                  float materialRoughness, float materialSpecular, float csw) {
  // TODO should pass from pbr material
  float metalnessIntensity = 1.0;
  float roughnessIntensity = 0.1125;

  ShadingData shading;

  shading.baseColor = materialDiffuse;
  shading.metallic = materialMetalness * metalnessIntensity;
  shading.specular = materialSpecular;
  shading.roughness = materialRoughness * roughnessIntensity;
  shading.csw = csw;

  return shading;
}