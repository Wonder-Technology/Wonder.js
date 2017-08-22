@varDeclare
layout(std140) uniform DirectionLightUbo {
vec4 lightPosition;
/*! vec4(colorVec3, intensity) */
vec4 lightColorData;
} directionLightUbo;
@end

