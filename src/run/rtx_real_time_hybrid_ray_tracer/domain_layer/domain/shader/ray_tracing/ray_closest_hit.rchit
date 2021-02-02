#version 460
#extension GL_EXT_ray_tracing : enable
#extension GL_EXT_nonuniform_qualifier : enable
#extension GL_GOOGLE_include_directive : enable
#extension GL_EXT_scalar_block_layout : enable
#pragma shader_stage(closest)

#include "define.glsl"

#include "../common/utils.glsl"

#include "get_hit_shading_data.glsl"

#include "shading_data.glsl"

#include "random.glsl"
#include "raycommon.glsl"

#include "light.glsl"

#include "bsdf.glsl"

layout(location = 1) rayPayloadEXT bool isShadowed;

#include "shadow_ray.glsl"

#include "ggx_direct.glsl"

#include "ggx_indirect.glsl"

layout(location = 0) rayPayloadInEXT hitPayload prd;

layout(set = 0, binding = 0) uniform accelerationStructureEXT topLevelAS;

struct BMFRData {
  vec4 worldPosition;
  vec4 worldNormal;
  vec4 diffuse;
};
layout(std140, set = 0, binding = 10) buffer BMFRDataBuffer {
  BMFRData bmfrDataArr[];
}
bmfrDataBuffer;

void _fixMaterialData(inout HitShadingData data) {
  if (data.materialMetalness == 0.0 && data.materialRoughness == 0.0) {
    data.materialMetalness = 0.001;
    data.materialRoughness == 0.002;
  } else {
    data.materialMetalness = clamp(data.materialMetalness, 0.001, 0.999);
    data.materialRoughness = clamp(data.materialRoughness, 0.001, 0.999);
  }
}

void main() {
  const float tMin = EPSILON;

  float t = gl_HitTEXT;

  vec3 radiance = vec3(0.0);
  vec3 throughput = prd.throughput;

  uint seed = prd.seed;

  HitShadingData data = getHitShadingData(gl_InstanceID, gl_PrimitiveID);

  _fixMaterialData(data);

  BMFRData bmfrData;
  bmfrData.worldPosition = vec4(data.worldPosition, 0.0);
  bmfrData.worldNormal = vec4(data.worldNormal, 0.0);
  bmfrData.diffuse = vec4(data.materialDiffuse, 0.0);
  const ivec2 ipos = ivec2(gl_LaunchIDEXT.xy);
  const ivec2 resolution = ivec2(gl_LaunchSizeEXT.xy);
  bmfrDataBuffer
      .bmfrDataArr[computePixelArrayIndexFromTwoDPixelIndex(ipos, resolution)] =
      bmfrData;

  float outsideIOR = 1.0;

  ShadingData shading = buildShadingData(
      data.materialDiffuse, data.materialSpecularColor, data.materialEmission,
      data.materialMetalness, data.materialRoughness, data.materialSpecular,
      data.materialTransmission, data.materialIOR, outsideIOR,
      computeSpecularLobeProb(data.materialDiffuse, data.materialSpecular,
                              data.materialMetalness),
      computeBSDFSpecularLobeProb(getRayDirectionFromV(data.V),
                                  data.worldNormal, outsideIOR,
                                  data.materialIOR),
      isFromOutside(getRayDirectionFromV(data.V), data.worldNormal));

  radiance += shading.emission * throughput;

  radiance +=
      computeDirectLight(seed, EPSILON, tMin, data.worldPosition,
                         data.worldNormal, data.V, shading, topLevelAS) *
      throughput;

  bool isBRDFDir;
  vec3 bsdfDir =
      sample_(seed, data.V, data.worldNormal, EPSILON, shading, isBRDFDir);

  computeIndirectLight(seed, EPSILON, data.V, bsdfDir, data.worldNormal,
                       shading, isBRDFDir, throughput, t);

  vec3 bias =
      0.001 * (shading.isFromOutside ? data.worldNormal : -data.worldNormal);
  if (isBRDFDir) {
    prd.bias = bias;
  } else {
    prd.bias = -bias;
  }

  prd.radiance = radiance;
  prd.t = t;
  prd.scatterDirection = bsdfDir;
  prd.throughput = throughput;
  prd.seed = seed;
}