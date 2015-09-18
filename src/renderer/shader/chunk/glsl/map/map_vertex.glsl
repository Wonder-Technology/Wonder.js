@varDeclare
varying vec2 v_texCoord;
@end


@body
    vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;
    v_texCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;
@end
