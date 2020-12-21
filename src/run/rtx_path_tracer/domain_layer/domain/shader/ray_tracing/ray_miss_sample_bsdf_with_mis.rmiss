#version 460
#extension GL_EXT_ray_tracing : enable
#pragma shader_stage(miss)

layout(location = 2)
    rayPayloadInEXT SampleBSDFWithMISHitPayload sampleBSDFWithMISHitPayload;

void main() {
  sampleBSDFWithMISHitPayload.lightType = INFINITE_AREA;
  sampleBSDFWithMISHitPayload.lightIndex = 0;
}
