@varDeclare
varying vec3 v_normal;
varying vec3 v_position;
@end


@body
    v_normal = normalize( normalMatrix * a_normal);
    v_position = vec3(mMatrix * vec4(a_position, 1.0));
@end
