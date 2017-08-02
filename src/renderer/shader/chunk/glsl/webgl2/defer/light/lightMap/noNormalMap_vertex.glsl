@varDeclare
varying vec3 v_normal;

@end


@body
    v_normal = normalize(normalMatrix * a_normal);
@end
