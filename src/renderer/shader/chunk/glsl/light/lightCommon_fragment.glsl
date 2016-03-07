@varDeclare
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec4 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 position;

    float intensity;

    vec4 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
@end


