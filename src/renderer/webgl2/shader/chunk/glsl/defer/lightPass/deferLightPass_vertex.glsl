@varDeclare
//todo refactor: define by shadersourcebuilder(add location)
layout(location=0) in vec3 a_position;
layout(location=1) in vec2 a_texCoord;


    out vec2 v_texcoord;
@end


@body

        v_texcoord = a_texCoord * 0.5 + vec2(0.5);

    gl_Position = vec4(a_position, 1.0);
@end