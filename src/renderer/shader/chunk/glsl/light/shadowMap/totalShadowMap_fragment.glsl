@funcDeclare
float getShadowBias(vec3 lightDir, float shadowBias);
float unpackDepth(vec4 rgbaDepth);
@end

@funcDefine
float getShadowBias(vec3 lightDir, float shadowBias){
    float bias = shadowBias;

    if(shadowBias == NULL){
        bias = 0.005;
    }


     /*!
     A shadow bias of 0.005 solves the issues of our scene by a large extent, but some surfaces that have a steep angle to the light source might still produce shadow acne. A more solid approach would be to change the amount of bias based on the surface angle towards the light: something we can solve with the dot product:
     */

     return max(bias * (1.0 - dot(normalize(getNormal()), lightDir)), bias);

    //return bias;
}

float unpackDepth(vec4 rgbaDepth) {
    /*! make sure that the visibility from the shadow map which is not builded is always be 1.0 */
    if(rgbaDepth == vec4(0.0)){
        return 100000.0;
    }

    const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
    return dot(rgbaDepth, bitShift);
}

vec3 getShadowVisibility() {
    vec3 shadowColor = vec3(1.0);
    vec3 twoDLightDir = vec3(0.0);
    vec3 cubemapLightDir = vec3(0.0);


    //to normalMap, the lightDir use the origin one instead of normalMap's lightDir here(the lightDir is used for computing shadowBias, the origin one is enough for it)

    #if TWOD_SHADOWMAP_COUNT > 0
	for( int i = 0; i < TWOD_SHADOWMAP_COUNT; i ++ ) {
        twoDLightDir = getDirectionLightDirByLightPos(u_twoDLightPos[i]);

	////if is opposite to direction of light rays, no shadow

        shadowColor *= getTwoDShadowVisibility(twoDLightDir, u_twoDShadowMapSampler[i], v_positionFromLight[i], u_twoDShadowBias[i], u_twoDShadowDarkness[i], u_twoDShadowSize[i]);
	}
	#endif


	#if CUBEMAP_SHADOWMAP_COUNT > 0
	for( int i = 0; i < CUBEMAP_SHADOWMAP_COUNT; i ++ ) {
        cubemapLightDir = getPointLightDirByLightPos(u_cubemapLightPos[i]);

	////if is opposite to direction of light rays, no shadow

        shadowColor *= getCubemapShadowVisibility(cubemapLightDir, u_cubemapShadowMapSampler[i], u_cubemapLightPos[i], u_farPlane[i], u_cubemapShadowBias[i], u_cubemapShadowDarkness[i]);
	}
	#endif

	return shadowColor;
}

@end

