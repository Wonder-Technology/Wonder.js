@varDeclare
varying vec3 v_position;
@end


@body
v_position = a_position;

gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
@end