@varDeclare
varying vec2 v_texCoord;
@end

@body
    gl_FragColor = texture2D(u_sampler2D0, v_texCoord);
@end
