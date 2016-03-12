@varDeclare
varying vec3 v_position;
@end

@funcDefine
vec4 getLightEffectColor(vec2 projectedTexCoords){
	vec3 reflectionColor = texture2D(u_reflectionMapSampler, projectedTexCoords).rgb;

	vec3 refractionColor = texture2D(u_refractionMapSampler, projectedTexCoords).rgb;

    vec3 inDir = normalize(v_position - u_cameraPos);

	float fresnelTerm = max(dot(inDir, v_normal), 0.0);
	fresnelTerm = clamp((1.0 - fresnelTerm) * u_levelData.fresnelLevel, 0., 1.);

	return vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);
}
@end
