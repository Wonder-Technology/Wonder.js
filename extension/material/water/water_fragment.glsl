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

varying vec4 v_reflectionAndRefractionMapCoord;
@end


@body
	vec2 projectedTexCoords = v_reflectionAndRefractionMapCoord.xy / v_reflectionAndRefractionMapCoord.w + perturbation;




//totalColor = vec4(1.0 - fresnelTerm);
//totalColor *= vec4(refractionColor, 1.0);
//totalColor *= vec4(mix(reflectionColor, refractionColor, fresnelTerm), 1.0);
//totalColor += vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);

//totalColor += vec4(reflectionColor * fresnelTerm * u_levelData.reflectionLevel + (1.0 - fresnelTerm) * refractionColor * u_levelData.refractionLevel, 1.0);

totalColor += vec4(getLightEffectColor(projectedTexCoords), 1.0);


//totalColor *= vec4(mix(reflectionColor, refractionColor, 0.5), 1.0);
@end
