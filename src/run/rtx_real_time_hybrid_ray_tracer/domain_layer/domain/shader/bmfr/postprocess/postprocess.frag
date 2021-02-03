#version 450
#extension GL_EXT_nonuniform_qualifier : enable
#extension GL_EXT_scalar_block_layout : enable
#pragma shader_stage(fragment)

/* TODO fix: when move camera, the noise increase!

description
when move camera, the noise increase;
when stop moving camera, the noise decrease;

reason
because when move camera, postprocess pass has many noise!!!


solution
increase POSITION_LIMIT_SQUARED,NORMAL_LIMIT_SQUARED when move can decrease
noise, but cause more ghost!!!

so need other solutions!!!
*/

#define POSITION_LIMIT_SQUARED 0.01f
#define NORMAL_LIMIT_SQUARED 1.0f
#define BLEND_ALPHA 0.1f
#define PIXEL_OFFSET 0.5f

#include "../../common/utils.glsl"
#include "../utils.glsl"

layout(location = 0) in vec2 uv;
// layout(location = 0) out vec4 outColor;

// layout(binding = 0) uniform sampler sampler0;
// layout(binding = 1) uniform texture2D gPositionRoughnessTexture;
// layout(binding = 2) uniform texture2D gNormalMetalnessTexture;
// layout(binding = 3) uniform texture2D gMotionVectorDepthSpecularTexture;

layout(std140, set = 0, binding = 0) buffer CurNoisyPixelBuffer {
  vec4 pixels[];
}
curNoisyPixelBuffer;
layout(std140, set = 0, binding = 1) buffer PrevNoisyPixelBuffer {
  vec4 pixels[];
}
prevNoisyPixelBuffer;

layout(std140, set = 0, binding = 2) buffer PrevPositionBuffer {
  //   vec3 positions[];
  vec4 positions[];
}
prevPositionBuffer;

layout(std140, set = 0, binding = 3) buffer PrevNormalBuffer {
  //  vec3 normals[];
  vec4 normals[];
}
prevNormalBuffer;

// layout(scalar, set=0, binding = 4) buffer AcceptBoolBuffer {
//   uint acceptBools[];
// }
// acceptBoolBuffer;

// layout(scalar, set=0, binding = 5) buffer PrevFramePixelIndicesBuffer {
//   vec2 prevFramePixelIndices[];
// }
// prevFramePixelIndicesBuffer;

layout(set = 0, binding = 4) uniform ScreenDimension { vec2 resolution; }
screenDimension;

struct BMFRData {
  vec4 worldPosition;
  vec4 worldNormal;
  vec4 diffuse;
};
layout(std140, set = 0, binding = 5) buffer BMFRDataBuffer {
  BMFRData bmfrDataArr[];
}
bmfrDataBuffer;

layout(std140, set = 0, binding = 6) uniform CommonData {
  uint frameIndex;
  uint horizentalBlocksCount;
  uint pad_0;
  uint pad_1;
}
pushC;

vec2 convertUVToPixelIndices(vec2 uv, vec2 resolution) {
  return uv * resolution;
}

uint convertPixelIndicesToPixelIndex(ivec2 pixelIndices, vec2 resolution) {
  return convertBufferTwoDIndexToOneDIndex(pixelIndices.x, pixelIndices.y,
                                           uint(resolution.x));
}

// TODO refactor: extract first frameIndex shader
void main() {
  uint frameIndex = pushC.frameIndex;

  uint pixelIndex = computePixelArrayIndex(uv, screenDimension.resolution);

  // vec3 worldPosition =
  //     texture(sampler2D(gPositionRoughnessTexture, sampler0), uv).xyz;
  // vec3 worldNormal =
  //     texture(sampler2D(gNormalMetalnessTexture, sampler0), uv).xyz;
  BMFRData bmfrData = bmfrDataBuffer.bmfrDataArr[pixelIndex];
  vec3 worldPosition = bmfrData.worldPosition.xyz;
  vec3 worldNormal = bmfrData.worldNormal.xyz;

  vec3 currentColor = curNoisyPixelBuffer.pixels[pixelIndex].rgb;

  // Default previous frameIndex pixel is the same pixel
  vec2 prevFramePixelIndicesFloat =
      convertUVToPixelIndices(uv, screenDimension.resolution);

  // // Change this to non zero if previous frameIndex is not discarded
  // completely uint storeAccept = 0x00;

  // blendAlpha 1.f means that only current frameIndex color is used
  // The value is changed if sample from previous frameIndex can be used
  float blendAlpha = 1.0;
  vec3 previousColor = vec3(0.0, 0.0, 0.0);

  float sampleSpp = 0.0;
  float totalWeight = 0.0;

  if (frameIndex > 0) {
    // TODO set motionVector in .rchit and get it here!
    ////   TODO getClosestMotionVector?
    // vec2 motionVector =
    //     texture(sampler2D(gMotionVectorDepthSpecularTexture, sampler0),
    //     uv).xy;
    vec2 motionVector = vec2(0.0);

    float positionLimitSquared = POSITION_LIMIT_SQUARED;
    float normalLimitSquared = NORMAL_LIMIT_SQUARED;

    /* TODO optimize: reduce noise when move camera/gameObject and avoid ghost
    too!

    solution:
    1.change limit when move
    2.add more check
    e.g.
     所以我们在做Sample
     Reprojection的时候需要check当前帧的纹理颜色，世界坐标位置，法线，模型索引，屏幕空间深度等，去尽可能的丢弃无效的历史样本。
         float positionLimitSquared = POSITION_LIMIT_SQUARED;
         float normalLimitSquared = NORMAL_LIMIT_SQUARED;
         float lenMotionVector = length(motionVector);
         const float b1 = 0.01;
         const float b2 = 1.00;
         const float velocityScale = 100.0 * 60.0;
         float positionLimitSquared =
             mix(b1, b2, saturateFloat(lenMotionVector * velocityScale));
             */

    vec2 prevFrameUnJitteredUV = uv - motionVector;

    if (prevFrameUnJitteredUV.x > 1.0 || prevFrameUnJitteredUV.x < 0.0 ||
        prevFrameUnJitteredUV.y > 1.0 || prevFrameUnJitteredUV.y < 0.0) {
      // change spp to 1
      curNoisyPixelBuffer.pixels[pixelIndex] = vec4(currentColor, 1.0);
      // acceptBoolBuffer.acceptBools[pixelIndex] = 0;

      // outColor = vec4(currentColor, 1.0);

      return;
    }

    prevFramePixelIndicesFloat = convertUVToPixelIndices(
        prevFrameUnJitteredUV, screenDimension.resolution);

    prevFramePixelIndicesFloat -= vec2(PIXEL_OFFSET, PIXEL_OFFSET);

    ivec2 prevFramePixelIndicesInt = ivec2(prevFramePixelIndicesFloat);

    // These are needed for the bilinear sampling
    ivec2 offsets[4] = {
        ivec2(0, 0),
        ivec2(1, 0),
        ivec2(0, 1),
        ivec2(1, 1),
    };

    vec2 prevPixelFract =
        prevFramePixelIndicesFloat - vec2(prevFramePixelIndicesInt);

    vec2 oneMinusPrevPixelFract = 1.0 - prevPixelFract;
    float weights[4];

    weights[0] = oneMinusPrevPixelFract.x * oneMinusPrevPixelFract.y;
    weights[1] = prevPixelFract.x * oneMinusPrevPixelFract.y;
    weights[2] = oneMinusPrevPixelFract.x * prevPixelFract.y;
    weights[3] = prevPixelFract.x * prevPixelFract.y;
    totalWeight = 0.0;

    // Bilinear sampling
    for (int i = 0; i < 4; ++i) {
      ivec2 sampleLocation = prevFramePixelIndicesInt + offsets[i];

      uint samplePixelIndex = convertPixelIndicesToPixelIndex(
          sampleLocation, screenDimension.resolution);

      // Check if previous frameIndex color can be used based on its screen
      // location
      if (sampleLocation.x >= 0 && sampleLocation.y >= 0 &&
          sampleLocation.x < screenDimension.resolution.x &&
          sampleLocation.y < screenDimension.resolution.y) {
        vec3 prevWorldPosition =
            vec3(prevPositionBuffer.positions[samplePixelIndex]);

        // Compute world distance squared
        vec3 positionDifference = prevWorldPosition - worldPosition;
        float positionDistanceSquared =
            dot(positionDifference, positionDifference);

        // World position distance discard
        if (positionDistanceSquared < positionLimitSquared) {

          vec3 prevWorldNormal =
              vec3(prevNormalBuffer.normals[samplePixelIndex]);

          // Distance of the normals
          // NOTE: could use some other distance metric (e.g. angle), but we use
          // hard experimentally found threshold -> means that the metric
          // doesn't matter.
          vec3 normalDifference = prevWorldNormal - worldNormal;
          float normalDistanceSquared = dot(normalDifference, normalDifference);

          // Normal distance discard
          if (normalDistanceSquared < normalLimitSquared) {
            // Pixel passes all tests so store it to accept bools
            // storeAccept |= 1 << i;
            vec4 prevData = prevNoisyPixelBuffer.pixels[samplePixelIndex];

            sampleSpp += weights[i] * prevData.w;

            previousColor += weights[i] * prevData.xyz;
            totalWeight += weights[i];
          }
        }
      }
    }

    if (totalWeight > 0.0) {

      previousColor /= totalWeight;
      sampleSpp /= totalWeight;
      // Blend_alpha is dymically decided so that the result is average of all
      // samples until the cap defined by BLEND_ALPHA is reached
      blendAlpha = 1.0 / (sampleSpp + 1.f);
      blendAlpha = max(blendAlpha, BLEND_ALPHA);
    }
  }

  float newSpp = 1.0;
  if (blendAlpha < 1.0) {
    newSpp += sampleSpp;
  }

  vec3 newColor = mix(previousColor, currentColor, blendAlpha);

  curNoisyPixelBuffer.pixels[pixelIndex] = vec4(newColor, newSpp);
  // acceptBoolBuffer.acceptBools[pixelIndex] = storeAccept;
  // prevFramePixelIndicesBuffer.prevFramePixelIndices[pixelIndex] =
  //     prevFramePixelIndicesFloat;

  prevNoisyPixelBuffer.pixels[pixelIndex] = vec4(newColor, newSpp);
  prevPositionBuffer.positions[pixelIndex] = vec4(worldPosition, 0.0);
  prevNormalBuffer.normals[pixelIndex] = vec4(worldNormal, 0.0);

  // outColor = vec4(newColor, 1.0);
}