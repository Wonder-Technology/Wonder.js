

struct RectLight {
  vec3 lemit;
  float area;

  float width;
  float height;
};

layout(std140, set = 2, binding = 2) buffer RectLights { RectLight l[]; }
rectLights;

RectLight getRectLight(uint lightIndex) { return rectLights.l[lightIndex]; }

uint getRectLights() { return rectLights.l; }

vec3 sampleRectLightLi(uint lightIndex, , vec3 wi, float lightPdf) {}