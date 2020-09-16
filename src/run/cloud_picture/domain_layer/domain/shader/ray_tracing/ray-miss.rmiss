#version 460
#extension GL_EXT_ray_tracing : enable
#pragma shader_stage(miss)

#include "shading_data.glsl"

#include "raycommon.glsl"

layout(location = 0) rayPayloadInEXT hitPayload prd;

void main() {
  prd.throughput = vec3(0);
  prd.radiance = vec3(0.15);
  prd.t = -1.0;
}
