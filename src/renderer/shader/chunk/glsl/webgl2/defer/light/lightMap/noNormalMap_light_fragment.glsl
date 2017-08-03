@varDeclare
varying vec3 v_normal;
@end

@funcDefine
//#if POINT_LIGHTS_COUNT > 0
//vec3 getPointLightDir(int index){
vec3 getPointLightDir(vec3 worldPosition){
    //workaround '[] : Index expression must be constant' error
//    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {
//        if(x == index){
//            return getPointLightDirByLightPos(u_pointLights[x].position);
            return getPointLightDirByLightPos(u_lightPosition, worldPosition);
//        }
//    }
    /*!
    solve error in window7 chrome/firefox:
    not all control paths return a value.
    failed to create d3d shaders
    */
//    return vec3(0.0);
}
//#endif
//
//#if DIRECTION_LIGHTS_COUNT > 0
//vec3 getDirectionLightDir(int index){
//    //workaround '[] : Index expression must be constant' error
//    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {
//        if(x == index){
//            return getDirectionLightDirByLightPos(u_directionLights[x].position);
//        }
//    }
//
//    /*!
//    solve error in window7 chrome/firefox:
//    not all control paths return a value.
//    failed to create d3d shaders
//    */
//    return vec3(0.0);
//}
//#endif


vec3 getViewDir(worldPosition){
    return normalize(u_cameraPos - worldPosition);
}
@end

