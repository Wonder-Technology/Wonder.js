@varDeclare
varying vec3 v_normal;

@end


@body
    v_normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));
@end
