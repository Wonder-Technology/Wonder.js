@varDeclare
struct WaveData {
    float length;
    float height;
};
uniform WaveData u_waveData;

varying vec4 v_reflectionAndRefractionMapCoord;
@end

@body
mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

v_reflectionAndRefractionMapCoord = textureMatrix * gl_Position;
@end
