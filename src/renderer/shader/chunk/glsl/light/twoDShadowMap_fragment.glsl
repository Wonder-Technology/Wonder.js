@varDeclare
varying vec4 v_positionFromLight;
@end

@funcDefine
// PCF
vec3 getShadowVisibilityByPCF(float currentDepth, vec2 shadowCoord, float bias){

    float shadow = 0.0;
    vec2 texelSize = vec2(1.0 / u_shadowMapSize[0], 1.0 / u_shadowMapSize[1]);

    for(int x = -1; x <= 1; ++x)
    {
        for(int y = -1; y <= 1; ++y)
        {
            float pcfDepth = unpackDepth(texture2D(u_twoDShadowMapSampler, shadowCoord + vec2(x, y) * texelSize));
            shadow += currentDepth - bias > pcfDepth  ? u_shadowDarkness : 1.0;
        }
    }
    shadow /= 9.0;

    return vec3(shadow);
}



vec3 getTwoDShadowVisibility(vec3 lightDir) {
    //project texture
    vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;

    #if defined(SHADOWMAP_TYPE_PCF_SOFT)
    // Percentage-close filtering
    // (9 pixel kernel)
    return getShadowVisibilityByPCF(shadowCoord.z, shadowCoord.xy, getShadowBias(lightDir));

    #else
    return vec3(shadowCoord.z > unpackDepth(texture2D(u_twoDShadowMapSampler, shadowCoord.xy)) + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);

    #endif
}
@end

