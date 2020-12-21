
layout(set = 2, binding = 3) uniform sampler envMapSampler;
layout(set = 2, binding = 4) uniform texture2D envMap;
layout(set = 2, binding = 5) uniform sampler envMapDistributionSampler;
layout(set = 2, binding = 6) uniform texture2D envMapDistribution;

vec2 cartesianToEquirect(vec3 v) {
  float phi = mod(atan(-v.z, -v.x), TWO_PI);
  float theta = acos(v.y);
  return vec2(phi * INV2_PI, theta * INV2_PI);
}

vec3 getInfiniteAreaLightLe(vec3 rayDirection) {
  // vec3 w = normalize(WorldToLight(rayDirection));
  vec3 w = normalize(rayDirection);

  return texture(sampler2D(envMap, envMapSampler), cartesianToEquirect(w)).rgb;
}