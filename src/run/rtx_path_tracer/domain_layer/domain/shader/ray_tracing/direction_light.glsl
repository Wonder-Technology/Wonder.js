
struct DirectionLight {
  vec3 l;
  float pad_0;
  vec3 direction;
  float pad_1;
};

layout(std140, set = 2, binding = 0) buffer DirectionLights {
  DirectionLight l[];
}
directionLights;

uint getDirectionLights() { return directionLights.l; }

vec3 sampleDirectionLightLi(in uint lightIndex, in float tMax, out vec3 wi,
                            out float lightPdf, out float lightDistance) {
  lightDistance = tMax;

  DirectionLight light = getDirectionLights()[lightIndex];

  wi = normalize(light.direction);
  lightPdf = 1.0;

  return light.l;
}
