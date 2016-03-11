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
	vec2 bumpTexCoord = vec2(u_windMatrix * vec4(a_texCoord, 0.0, 1.0));
	v_bumpTexCoord = bumpTexCoord / u_waveData.length;

mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

v_reflectionMapCoord = textureMatrix * gl_Position;
@end
