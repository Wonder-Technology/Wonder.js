@varDeclare
varying vec2 v_mapCoord1;
@end


@body
    vec2 sourceTexCoord1 = a_texCoord * u_map1SourceRegion.zw + u_map1SourceRegion.xy;

    v_mapCoord1 = sourceTexCoord1 * u_map1RepeatRegion.zw + u_map1RepeatRegion.xy;
@end

