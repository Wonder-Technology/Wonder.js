@varDeclare
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
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
    vec3 direction;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
@end


@funcDeclare
vec3 getDirectionLightDir(vec3 lightPos);
vec3 getDirectionLightDirByDirection(vec3 direction);
vec3 getPointLightDir(vec3 lightPos);
@end

@funcDefine
vec3 getDirectionLightDir(vec3 lightPos){
//todo
    return lightPos - vec3(0.0);
    //return vec3(0.0) - lightPos;
}
vec3 getDirectionLightDirByDirection(vec3 direction){
    return direction;
}
vec3 getPointLightDir(vec3 lightPos){
    return lightPos - v_worldPosition;
}
@end
