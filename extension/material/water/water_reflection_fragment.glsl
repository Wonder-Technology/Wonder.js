@funcDefine
vec3 getLightEffectColor(vec2 projectedTexCoords){
    if(!isRenderListEmpty(u_isReflectionRenderListEmpty)){
        return texture2D(u_reflectionMapSampler, projectedTexCoords).rgb * u_levelData.reflectionLevel;
    }

    return vec3(0.0);
}
@end
