//todo move to common
@varDeclare
varying vec2 v_texCoord;
const vec2 MADD=vec2(0.5,0.5);
@end

@body
    v_texCoord=a_positionVec2*MADD+MADD;

    gl_Position=vec4(a_positionVec2, 0.0 ,1.0);
@end
