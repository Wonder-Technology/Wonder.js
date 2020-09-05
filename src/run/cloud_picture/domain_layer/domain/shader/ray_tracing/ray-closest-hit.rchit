#version 460
#extension GL_EXT_ray_tracing : enable
#extension GL_EXT_nonuniform_qualifier : enable
#extension GL_GOOGLE_include_directive : enable
#pragma shader_stage(closest)

#include "define.glsl"

#include "get_hit_shading_data.glsl"
#include "shading_data.glsl"

#include "random.glsl"
#include "raycommon.glsl"

#include "light.glsl"

#include "disney.glsl"

layout(location = 1) rayPayloadEXT bool isShadowed;

#include "shadow_ray.glsl"

#include "ggx_direct.glsl"


layout(location = 0) rayPayloadInEXT hitPayload prd;


#include "ggx_indirect.glsl"

layout(set = 0, binding = 0) uniform accelerationStructureEXT topLevelAS;



void main() {
  const float tMin = EPSILON;

  float t = gl_HitTEXT;

  vec3 radiance = vec3(0.0);
  vec3 throughput = prd.throughput;

  vec3 seed = prd.seed;

  HitShadingData data = getHitShadingData(gl_InstanceID, gl_PrimitiveID);

  ShadingData shading =
      buildShadingData(data.materialDiffuse, data.materialMetalness,
                       data.materialRoughness, data.materialSpecular, 
                       computeSpecularLobeProb(data.materialDiffuse, data.materialSpecular, data.materialMetalness)
                       );

  prd.radiance += computeDirectLight(
      tMin, data.worldPosition,
      data.worldNormal, data.V, shading, topLevelAS) * throughput;



const vec3 bsdfDir = disneySample(seed, data.V, data.worldNormal, EPSILON, shading);

computeIndirectLight( data.V,
                          bsdfDir,
data.worldNormal,
                           shading,
                          throughput,
                          t
                          );


  prd.radiance = radiance;
  prd.t = t;
  prd.scatterDirection = bsdfDir;
  prd.throughput = throughput;
  prd.seed = seed;
}