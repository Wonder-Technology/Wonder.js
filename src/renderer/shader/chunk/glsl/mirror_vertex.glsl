@varDeclare
		varying vec4 v_mirrorCoord;
@end

@body

//vec4 worldPosition = u_mMatrix * vec4( a_position, 1.0 );
gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);


mat4 textureMatrix = mat4(
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
);

			v_mirrorCoord = textureMatrix * gl_Position;

@end
