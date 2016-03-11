@funcDefine
vec4 getLightEffectColor(vec2 projectedTexCoords){
	return vec4(texture2D(u_refractionMapSampler, projectedTexCoords).rgb * u_levelData.refractionLevel, 1.0);
}
@end
