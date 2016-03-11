@funcDefine
vec4 getLightEffectColor(vec2 projectedTexCoords){
	return vec4(texture2D(u_reflectionMapSampler, projectedTexCoords).rgb * u_levelData.reflectionLevel, 1.0);
}
@end
