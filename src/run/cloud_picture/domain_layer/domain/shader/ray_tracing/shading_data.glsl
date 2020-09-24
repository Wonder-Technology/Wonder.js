
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
  float roughnessIntensity = 0.1125;

  ShadingData shading;

  shading.baseColor = materialDiffuse;
  shading.emission = materialEmission;
  shading.metallic =
      clamp(materialMetalness * metalnessIntensity, 0.001, 0.999);
  shading.specular = materialSpecular;
  shading.roughness =
      clamp(materialRoughness * metalnessIntensity, 0.001, 0.999);
  shading.csw = csw;

  return shading;
}