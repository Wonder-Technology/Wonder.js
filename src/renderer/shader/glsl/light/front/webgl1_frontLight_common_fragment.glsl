@varDeclare
varying vec3 v_worldPosition;

// #if POINT_LIGHTS_COUNT > 0
// struct PointLight {
//     vec3 position;
//     vec3 color;
//     float intensity;

//     float range;
//     float constant;
//     float linear;
//     float quadratic;
// };
// uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

// #endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
@end

@funcDeclare
#import "webgl1_frontLight_common"
@end

@funcDefine
#import "webgl1_frontLight_common"
@end