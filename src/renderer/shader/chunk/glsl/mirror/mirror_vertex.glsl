@varDeclare
		varying vec4 v_mirrorCoord;
@end

@body
mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

v_mirrorCoord = textureMatrix * gl_Position;
@end
