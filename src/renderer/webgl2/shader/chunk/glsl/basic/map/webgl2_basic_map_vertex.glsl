@varDeclare
//todo remove define
layout(location=1) in vec2 a_texCoord;

out vec2 v_mapCoord0;
@end


@body
//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;
//
//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;

    v_mapCoord0 = a_texCoord;
@end

