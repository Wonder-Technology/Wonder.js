@varDeclare
varying vec2 v_mapCoord;
@end


@body
    vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;
    v_mapCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;
@end
