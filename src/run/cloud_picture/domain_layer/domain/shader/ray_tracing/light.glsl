
struct DirectionLight {
  float intensity;
  float pad_0;
  float pad_1;
  float pad_2;
  vec4 direction;
};

layout(std140, set = 2, binding = 0) buffer DirectionLights {
  DirectionLight l[];
}
lights;

void getLightData(in uint lightIndex, out float lightIntensity,
                  out float lightDistance, out vec3 lightDir) {
  DirectionLight data = lights.l[lightIndex];

  lightIntensity = data.intensity;
  lightDistance = 100000.0;

  // lightDir = normalize(vec3(data.position) - vec3(0.0));
  lightDir = normalize(vec3(data.direction));
}

bool isLightVisibleFromTheSurface(vec3 worldNormal, vec3 lightDir) {
  return dot(worldNormal, lightDir) > 0;
}