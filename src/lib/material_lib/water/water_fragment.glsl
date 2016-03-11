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




//totalColor = vec4(1.0 - fresnelTerm);
//totalColor *= vec4(refractionColor, 1.0);
//totalColor *= vec4(mix(reflectionColor, refractionColor, fresnelTerm), 1.0);
//totalColor += vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);

//totalColor += vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);

totalColor += getLightEffectColor(projectedTexCoords);


//totalColor *= vec4(mix(reflectionColor, refractionColor, 0.5), 1.0);
@end
