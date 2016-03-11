@varDeclare
struct WaveData {
    float length;
    float height;
};
uniform WaveData u_waveData;

varying vec2 v_bumpTexCoord;
varying vec4 v_reflectionAndRefractionMapCoord;
varying vec3 v_position;
@end

@body
    v_position = a_position;

	vec2 bumpTexCoord = vec2(u_windMatrix * vec4(a_texCoord, 0.0, 1.0));
	v_bumpTexCoord = bumpTexCoord / u_waveData.length;

mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

v_reflectionAndRefractionMapCoord = textureMatrix * gl_Position;
@end
