@varDeclare
struct WaveData {
    float length;
    float height;
};
uniform WaveData u_waveData;

varying vec2 v_bumpTexCoord;
@end

@body
	vec2 bumpTexCoord = vec2(u_windMatrix * vec4(a_texCoord, 0.0, 1.0));
	v_bumpTexCoord = bumpTexCoord / u_waveData.length;
@end
