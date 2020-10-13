
struct ShadingData {
  vec3 baseColor;
  vec3 specularColor;
  vec3 emission;
  float metallic;
  float specular;
  float roughness;
  float transmission;
  float ior;
  float outsideIOR;
  float specularLobeProb;
  // bool isConsiderBRDF;
  float bsdfSpecularLobeProb;
  // bool isConsiderBSDFAndSpecular;
  bool isFromOutside;
};

ShadingData buildShadingData(vec3 materialDiffuse, vec3 materialSpecularColor,
                             vec3 materialEmission, float materialMetalness,
                             float materialRoughness, float materialSpecular,
                             float materialTransmission, float materialIOR,

                             float outsideIOR, float specularLobeProb,
                             float bsdfSpecularLobeProb, bool isFromOutside) {
  // TODO should pass from pbr material
  float metalnessIntensity = 1.0;
  // float roughnessIntensity = 0.1125;
  float roughnessIntensity = 1.0;

  ShadingData shading;

  shading.baseColor = materialDiffuse;
  shading.specularColor = materialSpecularColor;
  shading.emission = materialEmission;
  shading.metallic =
      clamp(materialMetalness, 0.001, 0.999) * metalnessIntensity;
  shading.specular = materialSpecular;
  shading.roughness =
      clamp(materialRoughness, 0.001, 0.999) * roughnessIntensity;
  shading.transmission = materialTransmission;

  shading.outsideIOR = outsideIOR;
  shading.ior = materialIOR;

  shading.specularLobeProb = specularLobeProb;
  shading.bsdfSpecularLobeProb = bsdfSpecularLobeProb;

  shading.isFromOutside = isFromOutside;

  return shading;
}