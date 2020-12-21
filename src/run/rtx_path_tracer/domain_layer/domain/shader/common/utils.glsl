
// float saturateFloat(float v) {
//   if (v < 0.0) {
//     return 0.0;
//   }

//   if (v > 1.0) {
//     return 1.0;
//   }

//   return v;
// }

// vec2 saturateVec2(vec2 v) {
//   return vec2(saturateFloat(v.x), saturateFloat(v.y));
// }

float max(float f1, float f2, float f3) { return max(max(f1, f2), f3); }

uint getPixelIndex(vec2 uv, vec2 resolution) {
  const ivec2 bufferCoord = ivec2(floor(uv * resolution));

  return bufferCoord.y * uint(resolution.x) + bufferCoord.x;
}

vec2 gammaCorrection(vec2 colorInLinearSpace) {
  return pow(colorInLinearSpace, vec2(1.0 / 2.2));
}

vec3 gammaCorrection(vec3 colorInLinearSpace) {
  return pow(colorInLinearSpace, vec3(1.0 / 2.2));
}

vec3 convertSRGBToLinear(vec3 specificColorDefinedInShader) {
  return pow(specificColorDefinedInShader, vec3(2.2));
}

vec3 getWoFromRayDirection(vec3 rayDirection) { return -rayDirection; }

vec3 getRayDirectionFromWo(vec3 wo) { return -wo; }

bool isSpectrumBlack(vec3 s) { return s == vec3(0.0); }

float powerHeuristic(int nf, float fPdf, int ng, float gPdf) {
  float f = nf * fPdf;
  float g = ng * gPdf;

  return (f * f) / (f * f + g * g);
}