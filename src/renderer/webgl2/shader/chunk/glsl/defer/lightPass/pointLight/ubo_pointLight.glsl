@varDeclare
layout(std140) uniform PointLightUbo {
vec4 lightPosition;
/*! vec4(colorVec3, intensity) */
vec4 lightColorData;
/*! vec4(constant, linear, quadratic, radius) */
vec4 lightData;
} pointLightUbo;
@end

