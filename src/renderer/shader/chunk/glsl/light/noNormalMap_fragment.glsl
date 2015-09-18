@varDeclare
varying vec3 v_normal;
varying vec3 v_worldPosition;
@end

@funcDefine
#if POINT_LIGHTS_COUNT > 0
vec3 getPointLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {
        if(x == index){
            return u_pointLights[x].position - v_worldPosition;
        }
    }
}
#endif

#if DIRECTION_LIGHTS_COUNT > 0
vec3 getDirectionLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {
        if(x == index){
            return u_directionLights[x].direction;
        }
    }
}
#endif


vec3 getViewDir(){
    return normalize(u_cameraPos - v_worldPosition);
}
vec3 getNormal(){
    return v_normal;
}

@end
