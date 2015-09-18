@varDeclare
varying vec3 v_dir;
@end


@body
    vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * vec4(a_position, 1.0);

    gl_Position = pos.xyww;

    v_dir = a_position;
@end

