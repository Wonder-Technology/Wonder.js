//todo dry
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

//todo remove?
/*
float VectorToDepthValue(vec3 Vec)
{
    vec3 AbsVec = abs(Vec);
    float LocalZcomp = max(AbsVec.x, max(AbsVec.y, AbsVec.z));

    const float f = 1000.0;
    const float n = 0.1;
    float NormZComp = (f+n) / (f-n) - (2.0*f*n)/(f-n)/LocalZcomp;
    return (NormZComp + 1.0) * 0.5;
}
*/

// PCF
vec3 getShadowVisibilityByPCF(float currentDepth, vec3 fragToLight, float bias){
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

    //float diskRadius = 0.05;
    //Another interesting trick we can apply here is that we can change the diskRadius based on how far the viewer is away from a fragment; this way we can increase the offset radius by the distance to the viewer, making the shadows softer when far away and sharper when close by.
    float viewDistance = length(u_cameraPos - v_worldPosition);
    float diskRadius = (1.0 + (viewDistance / u_farPlane)) / 25.0;

    //for(int i = 0; i < samples; ++i)
    for(int i = 0; i < 20; ++i)
    {
        float pcfDepth = unpackDepth(textureCube(u_cubemapShadowMapSampler, fragToLight + sampleOffsetDirections[i] * diskRadius));
        pcfDepth *= u_farPlane;   // Undo mapping [0;1]
        shadow += currentDepth - bias > pcfDepth  ? u_shadowDarkness : 1.0;
    }
    shadow /= float(samples);

    return vec3(shadow);
}


vec3 getShadowVisibility(vec3 lightDir) {
// Get vector between fragment position and light position
    vec3 fragToLight= v_worldPosition - u_lightPos;
    // Use the light to fragment vector to sample from the depth map
    float closestDepth = unpackDepth(textureCube(u_cubemapShadowMapSampler, fragToLight));
    //float closestDepth = textureCube(u_cubemapShadowMapSampler, fragToLight).r;

    // It is currently in linear range between [0,1]. Re-transform back to original value
    closestDepth *= u_farPlane;
    // Now get current linear depth as the length between the fragment and light position
    float currentDepth = length(fragToLight);
    //todo remove?
    //float currentDepth = VectorToDepthValue(fragToLight);



    #if defined(SHADOWMAP_TYPE_PCF_SOFT)
    return getShadowVisibilityByPCF(currentDepth, fragToLight, getShadowBias(lightDir));
    #else
    return vec3(currentDepth > closestDepth + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);
    #endif
}
@end

