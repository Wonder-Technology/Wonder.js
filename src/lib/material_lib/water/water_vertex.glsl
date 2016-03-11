@varDeclare
struct WaveData {
    float length;
    float height;
};
uniform WaveData u_waveData;

varying vec4 v_reflectionAndRefractionMapCoord;
varying vec3 v_position;
@end

@body
    v_position = a_position;

mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

v_reflectionAndRefractionMapCoord = textureMatrix * gl_Position;
@end
