@varDeclare
varying vec3 v_normal;
varying vec3 v_position;
@end


@body
    v_normal = normalize( u_normalMatrix * a_normal);
    v_position = vec3(u_mMatrix * vec4(a_position, 1.0));
@end
