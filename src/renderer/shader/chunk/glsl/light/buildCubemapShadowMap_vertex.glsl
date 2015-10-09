@varDeclare
	varying vec3 v_position;
@end
@body
gl_Position = u_pMatrix* u_vMatrix * u_mMatrix * vec4(a_position, 1.0);

v_position = a_position;

@end
