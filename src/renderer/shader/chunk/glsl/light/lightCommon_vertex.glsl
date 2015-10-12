@varDeclare
varying vec3 v_worldPosition;
@end

@body
    v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));
@end

