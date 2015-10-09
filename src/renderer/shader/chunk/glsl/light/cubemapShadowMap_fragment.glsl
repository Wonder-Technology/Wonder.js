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

    return vec3(currentDepth > closestDepth + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);
}
@end

