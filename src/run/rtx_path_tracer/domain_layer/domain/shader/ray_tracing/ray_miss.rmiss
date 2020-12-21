#version 460
#extension GL_EXT_ray_tracing : enable
#pragma shader_stage(miss)

#include "define.glsl"

#include "shading_data.glsl"

#include "raycommon.glsl"

#include "infinite_area_light.glsl"

layout(location = 0) rayPayloadInEXT HitPayload path;

void main() {
  path.t = -1.0;
  path.isTerminate = true;

  if (path.bounceIndex == 0 || path.isSpecularBounce) {
    path.radiance =
        getInfiniteAreaLightLe(gl_WorldRayDirectionEXT) * path.throughput;
    path.throughput = vec3(0.0);
  } else {
    path.throughput = vec3(0.0);
    path.radiance = vec3(0.0);
  }
}
