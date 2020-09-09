
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

uint getPixelIndex(vec2 uv, vec2 resolution) {
  const ivec2 bufferCoord = ivec2(floor(uv * resolution));

  return bufferCoord.y * uint(resolution.x) + bufferCoord.x;
}
