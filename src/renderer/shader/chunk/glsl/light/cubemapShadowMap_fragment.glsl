@varDeclare
	varying vec3 v_position;
@end

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



vec3 getShadowVisibility(vec3 lightDir) {
// Get vector between fragment position and light position
    vec3 fragToLight= v_position - u_lightPos;
    // Use the light to fragment vector to sample from the depth map
    float closestDepth = unpackDepth(textureCube(u_cubemapShadowMapSampler, fragToLight));

    // It is currently in linear range between [0,1]. Re-transform back to original value
    closestDepth *= far_plane;
    // Now get current linear depth as the length between the fragment and light position
    float currentDepth = length(fragToLight);
    // Now test for shadows
    float bias = 0.05;

    return currentDepth > closestDepth + getShadowBias(lightDir) ? u_shadowDarkness : 1.0;
}
@end

