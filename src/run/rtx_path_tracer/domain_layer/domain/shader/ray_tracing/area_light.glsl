
vec3 getAreaLightL(vec3 lemit, vec3 worldNormal, vec3 w) {
  return dot(worldNormal, w) > 0 ? lemit : vec3(0.0);
}

vec3 getAreaLightLe(uint lightType, uint lightIndex, vec3 worldNormal, vec3 w) {
  vec3 lemit = vec3(0.0);

  switch (lightType) {
  case RECT:
    lemit = getRectLight(lightIndex).lemit;
    break;
  default:
    lemit = vec3(0.0);
    break;
  }

  return getAreaLightL(lemit, worldNormal, w);
}