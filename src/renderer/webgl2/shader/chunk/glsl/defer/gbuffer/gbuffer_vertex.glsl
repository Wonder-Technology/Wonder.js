@varDeclare
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
layout(location=2) in vec2 a_texCoord;
//layout(location=2) in vec4 aUV;
//
//layout(location=1) in float a_normal;
//
//layout(std140, column_major) uniform Matrices {
//    mat4 u_mMarix;
////    mat4 uMVP;
//};
//
//uniform
//
//out vec3 v_position;
//out vec3 v_normal;
//out vec2 v_texCoord;
//out vec4 vUV;
@end

//nonormal
//setWorldPosition

@body
//    v_position = u_mMarix * a_position;
//    v_normal = u_mMarix * vec4(a_normal, 0.0);
//    vUV = aUV;
//    v_texCoord = a_texCoord;
//    gl_Position = uMVP * a_position;

//    gl_Position = u_vpMatrix * vec4(v_position, 1.0);
//todo use u_vpMatrix
    gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);
//    gl_Position = u_vpMatrix * vec4(v_worldPosition, 1.0);
@end
