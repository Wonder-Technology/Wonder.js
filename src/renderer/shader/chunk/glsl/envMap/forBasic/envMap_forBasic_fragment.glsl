@varDeclare
varying vec3 v_normal;
varying vec3 v_position;
@end


@body
    vec3 inDir = normalize(v_position - u_cameraPos);
@end
