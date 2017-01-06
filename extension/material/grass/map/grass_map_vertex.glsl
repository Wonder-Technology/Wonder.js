@varDeclare
varying vec2 v_grassTexCoord;
varying float v_quadIndex;
@end

@body
v_grassTexCoord = a_texCoord;
v_quadIndex = a_quadIndex;
@end
