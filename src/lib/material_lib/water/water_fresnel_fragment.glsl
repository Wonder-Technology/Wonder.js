@varDeclare
varying vec3 v_position;
@end

@funcDefine
vec3 getLightEffectColor(vec2 projectedTexCoords){
	vec3 reflectionColor;
	vec3 refractionColor;

    vec3 inDir = normalize(v_position - u_cameraPos);

	float fresnelTerm = max(dot(inDir, v_normal), 0.0);
	fresnelTerm = clamp((1.0 - fresnelTerm) * u_levelData.fresnelLevel, 0., 1.);

    if(!isRenderListEmpty(u_isReflectionRenderListEmpty)){
        reflectionColor = texture2D(u_reflectionMapSampler, projectedTexCoords).rgb;
        reflectionColor = reflectionColor * fresnelTerm * u_levelData.reflectionLevel;
	}
	else{
        reflectionColor = vec3(0.0);
	}

    if(!isRenderListEmpty(u_isRefractionRenderListEmpty)){
        refractionColor = texture2D(u_refractionMapSampler, projectedTexCoords).rgb;
        refractionColor = (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel;
	}
	else{
        refractionColor = vec3(0.0);
	}

	return reflectionColor + refractionColor;
}
@end
