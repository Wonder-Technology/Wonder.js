//@varDeclare
//varying vec3 v_normal;
//@end

@funcDeclare
vec3 getNormal();

@end

@funcDefine
//#if POINT_LIGHTS_COUNT > 0
//vec3 getPointLightDir(int index){
//    //workaround '[] : Index expression must be constant' error
//    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {
//        if(x == index){
//            return getPointLightDirByLightPos(u_pointLights[x].position);
//        }
//    }
//    /*!
//    solve error in window7 chrome/firefox:
//    not all control paths return a value.
//    failed to create d3d shaders
//    */
//    return vec3(0.0);
//}
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
//
//
//vec3 getViewDir(){
//    return normalize(u_cameraPos - v_worldPosition);
//}
//


vec3 getNormal(){
    vec3 viewDir = getViewDir();
    vec3 mixColor = baseColor.rgb;

    vec3 bump1Color=texture2D(u_bumpMap1Sampler,v_diffuseMap1TexCoord).xyz;
    vec3 bump2Color=texture2D(u_bumpMap2Sampler,v_diffuseMap2TexCoord).xyz;
    vec3 bump3Color=texture2D(u_bumpMap3Sampler,v_diffuseMap3TexCoord).xyz;
    bump1Color.rgb*=mixColor.r;
    bump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);
    vec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);
    map=map*255./127.-128./127.;

    mat3 TBN=cotangentFrame(v_normal,-viewDir,v_mixMapTexCoord);

    return normalize(TBN*map);
}
@end
