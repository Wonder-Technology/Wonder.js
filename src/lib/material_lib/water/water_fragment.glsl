@varDeclare
struct WaveData {
    float length;
    float height;
};
uniform WaveData u_waveData;

struct LevelData {
    float fresnelLevel;
    float reflectionLevel;
    float refractionLevel;
};
uniform LevelData u_levelData;

varying vec2 v_bumpTexCoord;
varying vec4 v_reflectionAndRefractionMapCoord;
varying vec3 v_position;
@end


@body
    // fetch bump texture, unpack from [0..1] to [-1..1]
	vec3 bumpNormal = 2.0 * texture2D(u_bumpMapSampler, v_bumpTexCoord).rgb - 1.0;
	vec2 perturbation = u_waveData.height * bumpNormal.rg;

//	vec2 texCoords = (v_reflectionMapCoord.xy/v_reflectionMapCoord.w) / 2.0 + 0.5;
//	vec2 texCoords;
//
//	texCoords.x = v_reflectionMapCoord.x / v_reflectionMapCoord.w / 2.0 + 0.5;
//	texCoords.y = v_reflectionMapCoord.y / v_reflectionMapCoord.w / 2.0 + 0.5;


//	vec2 projectedReflectionTexCoords = clamp(v_reflectionMapCoord.xy / v_reflectionMapCoord.w + perturbation, 0.0, 1.0);
	vec2 projectedTexCoords = v_reflectionAndRefractionMapCoord.xy / v_reflectionAndRefractionMapCoord.w + perturbation;

	vec3 reflectionColor = texture2D(u_reflectionMapSampler, projectedTexCoords).rgb;

	vec3 refractionColor = texture2D(u_refractionMapSampler, projectedTexCoords).rgb;

	//todo refactor with fresnel glsl(extract common function?)

    vec3 inDir = normalize(v_position - u_cameraPos);

	float fresnelTerm = max(dot(inDir, v_normal), 0.0);
	fresnelTerm = clamp((1.0 - fresnelTerm) * u_levelData.fresnelLevel, 0., 1.);



//totalColor = vec4(1.0 - fresnelTerm);
//totalColor *= vec4(refractionColor, 1.0);
//totalColor *= vec4(mix(reflectionColor, refractionColor, fresnelTerm), 1.0);
//totalColor += vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);

totalColor += vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);


//totalColor *= vec4(mix(reflectionColor, refractionColor, 0.5), 1.0);
@end
