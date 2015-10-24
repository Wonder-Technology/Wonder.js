@varDeclare
varying vec3 v_normal;

@end


@body
    //v_normal = normalize( vec3(u_normalMatrix * vec4(a_normal, 1.0)));
    v_normal = normalize( u_normalMatrix * a_normal);
@end
