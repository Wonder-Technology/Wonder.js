#version 460
#extension GL_EXT_ray_tracing : enable
#extension GL_EXT_nonuniform_qualifier : enable
#extension GL_GOOGLE_include_directive : enable
#extension GL_EXT_scalar_block_layout : enable
#pragma shader_stage(closest)

#include "../common/define_debug.glsl"

#include "define.glsl"

#include "../common/utils.glsl"

#include "get_surfaceInteraction_data.glsl"

#include "shading_data.glsl"

#include "random.glsl"
#include "raycommon.glsl"

#include "point_light.glsl"

#include "direction_light.glsl"

#include "rect_light.glsl"

#include "area_light.glsl"

#include "light.glsl"

#include "bsdf.glsl"

layout(location = 1) rayPayloadEXT bool isShadowed;

layout(location = 2)
    rayPayloadEXT SampleBSDFWithMISHitPayload sampleBSDFWithMISHitPayload;

#include "shadow_ray.glsl"

#include "ggx_direct.glsl"

#include "ggx_indirect.glsl"

layout(location = 0) rayPayloadInEXT HitPayload path;

layout(set = 0, binding = 0) uniform accelerationStructureEXT topLevelAS;

void _fixMaterialData(inout SurfaceInteraction data) {
  if (data.materialMetalness == 0.0 && data.materialRoughness == 0.0) {
    data.materialMetalness = 0.001;
    data.materialRoughness == 0.002;
  } else {
    data.materialMetalness = clamp(data.materialMetalness, 0.001, 0.999);
    data.materialRoughness = clamp(data.materialRoughness, 0.001, 0.999);
  }
}

vec3 _getLe(SurfaceInteraction data, vec3 wo) {
  if (data.materialLightTypeOfAreaLight == NONE) {
    return data.materialEmission;
  }

  return getAreaLightLe(data.materialLightTypeOfAreaLight,
                        data.materialLightIndexOfAreaLight, data.worldNormal,
                        wo);
}

void main() {
  const float tMin = EPSILON;

  float t = gl_HitTEXT;

  path.t = t;

  vec3 radiance = vec3(0.0);
  vec3 throughput = path.throughput;

  uint seed = path.seed;

  SurfaceInteraction data =
      getSurfaceInteractionData(gl_InstanceID, gl_PrimitiveID);

  vec3 wo = getWoFromRayDirection(gl_WorldRayDirectionEXT);

  if (path.bounceIndex == 0 || path.isSpecularBounce) {
    radiance += _getLe(data, wo) * throughput;
  }

  if (isEmittedInstance(data.materialEmission,
                        data.materialLightTypeOfAreaLight)) {
    path.radiance = radiance;
    path.isTerminate = true;

    return;
  }

  _fixMaterialData(data);

  float outsideIOR = 1.0;

  ShadingData shading = buildShadingData(
      data.materialDiffuse, data.materialSpecularColor, data.materialEmission,
      data.materialMetalness, data.materialRoughness, data.materialSpecular,
      data.materialTransmission, data.materialIOR, outsideIOR,
      computeSpecularLobeProb(data.materialDiffuse, data.materialSpecular,
                              data.materialMetalness),
      computeBSDFSpecularLobeProb(getRayDirectionFromWo(wo), data.worldNormal,
                                  outsideIOR, data.materialIOR),
      isFromOutside(getRayDirectionFromWo(wo), data.worldNormal));

  radiance +=
      computeDirectLight(seed, EPSILON, tMin, path.tMax, data.worldPosition,
                         data.worldNormal, wo, shading, topLevelAS) *
      throughput;

  bool isBRDFDir;
  vec3 wi = sample_(seed, wo, data.worldNormal, EPSILON, shading, isBRDFDir);

  float NdotWi;
  float pdf;
  vec3 f = computeIndirectLight(seed, EPSILON, wo, wi, data.worldNormal,
                                shading, isBRDFDir, throughput, t, NdotWi, pdf);

  if (isSpectrumBlack(f) || pdf == 0.0) {
    path.radiance = radiance;
    path.seed = seed;
    path.isTerminate = true;
    return;
  }

  throughput *= f * NdotWi / pdf;

  vec3 bias =
      0.001 * (shading.isFromOutside ? data.worldNormal : -data.worldNormal);
  if (isBRDFDir) {
    path.bias = bias;
  } else {
    path.bias = -bias;
  }

  path.radiance = radiance;
  path.scatterDirection = wi;
  path.throughput = throughput;
  path.seed = seed;
}