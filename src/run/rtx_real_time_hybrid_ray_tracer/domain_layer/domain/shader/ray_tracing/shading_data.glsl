
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
  float bsdfSpecularLobeProb;
  bool isFromOutside;
};

ShadingData buildShadingData(vec3 materialDiffuse, vec3 materialSpecularColor,
                             vec3 materialEmission, float materialMetalness,
                             float materialRoughness, float materialSpecular,
                             float materialTransmission, float materialIOR,

                             float outsideIOR, float specularLobeProb,
                             float bsdfSpecularLobeProb, bool isFromOutside) {
  ShadingData shading;

  shading.baseColor = materialDiffuse;
  shading.specularColor = materialSpecularColor;

  shading.emission = materialEmission;
  shading.specular = materialSpecular;

  shading.metallic = materialMetalness;
  shading.roughness = materialRoughness;

  shading.outsideIOR = outsideIOR;
  shading.ior = materialIOR;

  shading.transmission = materialTransmission;

  shading.specularLobeProb = specularLobeProb;
  shading.bsdfSpecularLobeProb = bsdfSpecularLobeProb;

  shading.isFromOutside = isFromOutside;

  return shading;
}