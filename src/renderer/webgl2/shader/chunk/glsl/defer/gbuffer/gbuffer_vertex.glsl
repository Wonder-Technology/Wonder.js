@varDeclare
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
layout(location=2) in vec2 a_texCoord;
@end

@body
//todo use u_vpMatrix
    gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);
//    gl_Position = u_vpMatrix * vec4(v_worldPosition, 1.0);
@end
