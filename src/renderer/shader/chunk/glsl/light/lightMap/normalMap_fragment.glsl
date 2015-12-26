@varDeclare
varying vec2 v_normalMapTexCoord;
varying vec3 v_viewDir;

#if POINT_LIGHTS_COUNT > 0
varying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];
#endif

#if DIRECTION_LIGHTS_COUNT > 0
varying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];
#endif

@end

@funcDeclare
vec3 getNormal();

vec3 getLightDir(vec3 lightPos);

@end


@funcDefine
#if POINT_LIGHTS_COUNT > 0
vec3 getPointLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {
        if(x == index){
            return v_pointLightDir[x];
        }
    }
    /*!
    solve error in window7 chrome/firefox:
    not all control paths return a value.
    failed to create d3d shaders
    */
    return vec3(0.0);
}
#endif

#if DIRECTION_LIGHTS_COUNT > 0

vec3 getDirectionLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {
        if(x == index){
            return v_directionLightDir[x];
        }
    }

    /*!
    solve error in window7 chrome/firefox:
    not all control paths return a value.
    failed to create d3d shaders
    */
    return vec3(0.0);
}
#endif


vec3 getViewDir(){
    return v_viewDir;
}
vec3 getNormal(){
        // Obtain normal from normal map in range [0,1]
        vec3 normal = texture2D(u_normalMapSampler, v_normalMapTexCoord).rgb;

        // Transform normal vector to range [-1,1]
        return normalize(normal * 2.0 - 1.0);  // this normal is in tangent space
}
@end
