@varDeclare
struct WaveData {
    float length;
    float height;
};
uniform WaveData u_waveData;

varying vec2 v_bumpTexCoord;
varying vec4 v_reflectionMapCoord;
@end


@body
	vec3 bumpNormal = 2.0 * texture2D(u_bumpMapSampler, v_bumpTexCoord).rgb - 1.0;
	vec2 perturbation = u_waveData.height * bumpNormal.rg;

//	vec2 texCoords = (v_reflectionMapCoord.xy/v_reflectionMapCoord.w) / 2.0 + 0.5;
//	vec2 texCoords;
//
//	texCoords.x = v_reflectionMapCoord.x / v_reflectionMapCoord.w / 2.0 + 0.5;
//	texCoords.y = v_reflectionMapCoord.y / v_reflectionMapCoord.w / 2.0 + 0.5;


//	vec2 projectedReflectionTexCoords = clamp(v_reflectionMapCoord.xy / v_reflectionMapCoord.w + perturbation, 0.0, 1.0);
	vec2 projectedReflectionTexCoords = v_reflectionMapCoord.xy / v_reflectionMapCoord.w + perturbation;

	vec3 reflectionColor = texture2D(u_reflectionMapSampler, projectedReflectionTexCoords).rgb;

totalColor *= vec4(reflectionColor, 1.0);
@end
