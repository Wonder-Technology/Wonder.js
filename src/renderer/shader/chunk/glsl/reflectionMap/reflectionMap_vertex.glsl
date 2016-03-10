@varDeclare
		varying vec4 v_reflectionMapCoord;
@end

@body
mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

v_reflectionMapCoord = textureMatrix * gl_Position;
@end
