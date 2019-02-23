@varDeclare
varying vec2 v_mapCoord0;
@end

@body
    vec4 texelColor = texture2D(u_mapSampler, v_mapCoord0);

    vec4 totalColor = vec4(texelColor.rgb * u_color, texelColor.a * u_alpha);
@end

