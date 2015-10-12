@varDeclare
varying vec4 v_positionFromLight[ TWOD_SHADOWMAP_COUNT ];

	uniform sampler2D u_twoDShadowMapSampler[ TWOD_SHADOWMAP_COUNT ];
	uniform float u_twoDShadowDarkness[ TWOD_SHADOWMAP_COUNT ];
	uniform float u_twoDShadowBias[ TWOD_SHADOWMAP_COUNT ];
	uniform vec2 u_twoDShadowSize[ TWOD_SHADOWMAP_COUNT ];
	uniform vec3 u_twoDLightPos[ TWOD_SHADOWMAP_COUNT ];
@end

@funcDefine
// PCF
float getTwoDShadowVisibilityByPCF(float currentDepth, vec2 shadowCoord, sampler2D twoDShadowMapSampler, float shadowBias, float shadowDarkness, vec2 shadowMapSize){

    float shadow = 0.0;
    vec2 texelSize = vec2(1.0 / shadowMapSize[0], 1.0 / shadowMapSize[1]);

    for(int x = -1; x <= 1; ++x)
    {
        for(int y = -1; y <= 1; ++y)
        {
            float pcfDepth = unpackDepth(texture2D(twoDShadowMapSampler, shadowCoord + vec2(x, y) * texelSize));
            shadow += currentDepth - shadowBias > pcfDepth  ? shadowDarkness : 1.0;
        }
    }
    shadow /= 9.0;

    return shadow;
}



float getTwoDShadowVisibility(vec3 lightDir, sampler2D twoDShadowMapSampler, vec4 v_positionFromLight, float shadowBias, float shadowDarkness, vec2 shadowSize) {
    //project texture
    vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;
    //vec3 shadowCoord = vec3(0.5, 0.5, 0.5);

    #if defined(SHADOWMAP_TYPE_PCF_SOFT)
    // Percentage-close filtering
    // (9 pixel kernel)
    return getTwoDShadowVisibilityByPCF(shadowCoord.z, shadowCoord.xy, twoDShadowMapSampler, getShadowBias(lightDir, shadowBias), shadowDarkness, shadowSize);

    #else
    return shadowCoord.z > unpackDepth(texture2D(twoDShadowMapSampler, shadowCoord.xy)) + getShadowBias(lightDir, shadowBias) ? shadowDarkness : 1.0;
    #endif
}
@end

