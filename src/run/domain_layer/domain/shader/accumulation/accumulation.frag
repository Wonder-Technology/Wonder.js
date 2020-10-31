#version 450
#pragma shader_stage(fragment)

#include "../common/utils.glsl"

layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 outColor;

layout(std140, set = 0, binding = 0) buffer PixelBuffer { vec4 pixels[]; }
pixelBuffer;

layout(std140, set = 0, binding = 1) buffer AccumulationPixelBuffer {
  vec4 pixels[];
}
accumulationPixelBuffer;

layout(set = 0, binding = 2) uniform ScreenDimension { vec2 resolution; }
screenDimension;

layout(std140, set = 0, binding = 3) uniform CommonData {
  uint sampleCount;
  uint totalSampleCount;
  uint pad_0;
  uint pad_1;
}
pushC;

void main() {
  uint pixelIndex = getPixelIndex(uv, screenDimension.resolution);

  vec4 accumulationColor = accumulationPixelBuffer.pixels[pixelIndex] +
                           pixelBuffer.pixels[pixelIndex];

  accumulationPixelBuffer.pixels[pixelIndex] = accumulationColor;

  vec4 finalColor = accumulationColor / pushC.totalSampleCount;

  finalColor = vec4(gammaCorrection(vec3(finalColor)), finalColor.w);

  outColor = finalColor;
}