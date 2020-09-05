#version 460
#extension GL_EXT_ray_tracing : enable
#pragma shader_stage(miss)

layout(location = 1) rayPayloadInEXT bool isShadowed;

void main() { isShadowed = false; }