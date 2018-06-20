@varDeclare
varying vec2 v_mapCoord0;
@end

@body
    totalColor = vec4(totalColor.rgb * texture2D(u_mapSampler, v_mapCoord0).rgb * u_color, totalColor.a);
@end

