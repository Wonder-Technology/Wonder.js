@varDeclare
varying vec4 v_positionFromLight;
@end

@funcDefine
float getShadowBias(vec3 lightDir){
    if(u_shadowBias != NULL){
        return u_shadowBias;
    }

    /*!
     //todo need verify

     A shadow bias of 0.005 solves the issues of our scene by a large extent, but some surfaces that have a steep angle to the light source might still produce shadow acne. A more solid approach would be to change the amount of bias based on the surface angle towards the light: something we can solve with the dot product:

     return max(0.005 * (1.0 - dot(normalize(getNormal()), lightDir)), 0.001);
     */

    return 0.001;
}

float unpackDepth(vec4 rgbaDepth) {
    const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
    return dot(rgbaDepth, bitShift);
}


// PCF
vec3 getShadowVisibilityByPCF(float currentDepth, vec2 shadowCoord, float bias){

    float shadow = 0.0;
    vec2 texelSize = vec2(1.0 / u_shadowMapSize[0], 1.0 / u_shadowMapSize[1]);

    for(int x = -1; x <= 1; ++x)
    {
        for(int y = -1; y <= 1; ++y)
        {
            float pcfDepth = unpackDepth(texture2D(u_shadowMapSampler, shadowCoord + vec2(x, y) * texelSize));
            shadow += currentDepth - bias > pcfDepth  ? u_shadowDarkness : 1.0;
        }
    }
    shadow /= 9.0;

    return vec3(shadow);
}



vec3 getShadowVisibility(vec3 lightDir) {
    //project texture
    vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;

    #if defined(SHADOWMAP_TYPE_PCF_SOFT)
    // Percentage-close filtering
    // (9 pixel kernel)
    return getShadowVisibilityByPCF(shadowCoord.z, shadowCoord.xy, getShadowBias(lightDir));

    #else
    return vec3(shadowCoord.z > unpackDepth(texture2D(u_shadowMapSampler, shadowCoord.xy)) + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);

    #endif
}
@end

