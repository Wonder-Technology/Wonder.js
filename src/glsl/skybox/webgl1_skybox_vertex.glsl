@varDeclare
varying vec3 v_texCoord;
@end


@body
v_texCoord = a_position;

vec4 pos = u_pMatrix * u_skyboxVMatrix * vec4(a_position, 1.0);
gl_Position = pos.xyww;
@end