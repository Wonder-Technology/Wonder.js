@varDeclare
	varying vec3 v_position;
@end

@body
    //v_position= a_position;
    //todo use v_worldPosition
    v_position = vec3(u_mMatrix * vec4(a_position, 1.0));
@end
