@funcDefine
vec3 getLightEffectColor(vec2 projectedTexCoords){
    if(!isRenderListEmpty(u_isRefractionRenderListEmpty)){
        return texture2D(u_refractionMapSampler, projectedTexCoords).rgb * u_levelData.refractionLevel;
    }

    return vec3(0.0);
}
@end
