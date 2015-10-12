@varDeclare
	uniform samplerCube u_cubemapShadowMapSampler[ CUBEMAP_SHADOWMAP_COUNT ];
	uniform float u_cubemapShadowDarkness[ CUBEMAP_SHADOWMAP_COUNT ];
	uniform float u_cubemapShadowBias[ CUBEMAP_SHADOWMAP_COUNT ];
	uniform float u_farPlane[ CUBEMAP_SHADOWMAP_COUNT ];
	uniform vec3 u_cubemapLightPos[ CUBEMAP_SHADOWMAP_COUNT ];
@end


@funcDefine
// PCF
float getCubemapShadowVisibilityByPCF(float currentDepth, vec3 fragToLight, samplerCube cubemapShadowMapSampler, float shadowBias, float farPlane, float shadowDarkness){
    //only support in opengl es 3.0+
    //vec3 sampleOffsetDirections[20] = vec3[]
    //(
       //vec3( 1,  1,  1), vec3( 1, -1,  1), vec3(-1, -1,  1), vec3(-1,  1,  1),
       //vec3( 1,  1, -1), vec3( 1, -1, -1), vec3(-1, -1, -1), vec3(-1,  1, -1),
       //vec3( 1,  1,  0), vec3( 1, -1,  0), vec3(-1, -1,  0), vec3(-1,  1,  0),
       //vec3( 1,  0,  1), vec3(-1,  0,  1), vec3( 1,  0, -1), vec3(-1,  0, -1),
       //vec3( 0,  1,  1), vec3( 0, -1,  1), vec3( 0, -1, -1), vec3( 0,  1, -1)
    //);

    vec3 sampleOffsetDirections[20];

    sampleOffsetDirections[0] = vec3( 1,  1,  1);
    sampleOffsetDirections[1] = vec3( 1,  -1,  1);
    sampleOffsetDirections[2] = vec3( -1,  -1,  1);
    sampleOffsetDirections[3] = vec3( -1,  1,  1);

    sampleOffsetDirections[4] = vec3( 1,  1,  -1);
    sampleOffsetDirections[5] = vec3( 1,  -1,  -1);
    sampleOffsetDirections[6] = vec3( -1,  -1,  -1);
    sampleOffsetDirections[7] = vec3( -1,  1,  -1);

    sampleOffsetDirections[8] = vec3( 1,  1,  0);
    sampleOffsetDirections[9] = vec3( 1,  -1,  0);
    sampleOffsetDirections[10] = vec3( -1,  -1,  0);
    sampleOffsetDirections[11] = vec3( -1,  1,  0);

    sampleOffsetDirections[12] = vec3( 1,  0,  1);
    sampleOffsetDirections[13] = vec3( -1,  0,  1);
    sampleOffsetDirections[14] = vec3( 1,  0,  -1);
    sampleOffsetDirections[15] = vec3( -1,  0,  -1);

    sampleOffsetDirections[16] = vec3( 0,  1,  1);
    sampleOffsetDirections[17] = vec3( 0,  -1,  1);
    sampleOffsetDirections[18] = vec3( 0,  -1,  -1);
    sampleOffsetDirections[19] = vec3( 0,  1,  -1);

    float shadow = 0.0;
    int samples = 20;

    //float diskRadius = 0.00000;
    //Another interesting trick we can apply here is that we can change the diskRadius based on how far the viewer is away from a fragment; this way we can increase the offset radius by the distance to the viewer, making the shadows softer when far away and sharper when close by.
    float viewDistance = length(u_cameraPos - v_worldPosition);
    float diskRadius = (1.0 + (viewDistance / farPlane)) / 25.0;

    //for(int i = 0; i < samples; ++i)
    for(int i = 0; i < 20; ++i)
    {
        float pcfDepth = unpackDepth(textureCube(cubemapShadowMapSampler, fragToLight + sampleOffsetDirections[i] * diskRadius));
        pcfDepth *= farPlane;   // Undo mapping [0;1]
        shadow += currentDepth - shadowBias > pcfDepth  ? shadowDarkness : 1.0;
    }
    shadow /= float(samples);

    return shadow;
}


float getCubemapShadowVisibility(vec3 lightDir, samplerCube cubemapShadowMapSampler, vec3 lightPos, float farPlane, float shadowBias, float  shadowDarkness) {
// Get vector between fragment position and light position
    vec3 fragToLight= v_worldPosition - lightPos;
    // Use the light to fragment vector to sample from the depth map
    // Now get current linear depth as the length between the fragment and light position
    float currentDepth = length(fragToLight);

    #if defined(SHADOWMAP_TYPE_PCF_SOFT)
    return getCubemapShadowVisibilityByPCF(currentDepth, fragToLight, cubemapShadowMapSampler, getShadowBias(lightDir, shadowBias), farPlane, shadowDarkness);
    #endif

    float closestDepth = unpackDepth(textureCube(cubemapShadowMapSampler, fragToLight));

    // It is currently in linear range between [0,1]. Re-transform back to original value
    closestDepth *= farPlane;


    return float(currentDepth > closestDepth + getShadowBias(lightDir, shadowBias) ? shadowDarkness : 1.0);
}
@end

