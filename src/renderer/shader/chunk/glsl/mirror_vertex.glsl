@varDeclare
		varying vec4 v_mirrorCoord;
@end

@body

gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);
			vec4 worldPosition = u_mMatrix * vec4( a_position, 1.0 );
			v_mirrorCoord = u_textureMatrix * worldPosition;

@end
