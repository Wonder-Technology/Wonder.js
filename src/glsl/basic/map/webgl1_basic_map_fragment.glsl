@varDeclare
varying vec2 v_mapCoord0;
@end

@body
    vec4 totalColor = vec4(texture2D(u_mapSampler, v_mapCoord0).rgb * u_color, 1.0);
@end

