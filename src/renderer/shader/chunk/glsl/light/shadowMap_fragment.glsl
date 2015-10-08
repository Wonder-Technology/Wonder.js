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



vec3 getShadowVisibility(vec3 lightDir) {
    //project texture
    vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;
    vec4 rgbaDepth = texture2D(u_shadowMapSampler, shadowCoord.xy);

    return vec3(shadowCoord.z > unpackDepth(rgbaDepth) + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);
    //return vec3(shadowCoord.z > 0.0 ? u_shadowDarkness : 1.0);
}
@end

