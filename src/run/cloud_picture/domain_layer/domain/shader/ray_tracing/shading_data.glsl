
struct ShadingData {
  vec3 baseColor;
  vec3 emission;
  float metallic;
  float specular;
  float roughness;
  // specularLobeProb
  float csw;
};

ShadingData buildShadingData(vec3 materialDiffuse, vec3 materialEmission,
                             float materialMetalness, float materialRoughness,
                             float materialSpecular, float csw) {
  // TODO should pass from pbr material
  float metalnessIntensity = 1.0;
  // float roughnessIntensity = 0.1125;
  float roughnessIntensity = 1.0;

  ShadingData shading;

  shading.baseColor = materialDiffuse;
  shading.emission = materialEmission;
  shading.metallic =
      clamp(materialMetalness, 0.001, 0.999) * metalnessIntensity;
  shading.specular = materialSpecular;
  shading.roughness =
      clamp(materialRoughness, 0.001, 0.999) * roughnessIntensity;
  shading.csw = csw;

  return shading;
}