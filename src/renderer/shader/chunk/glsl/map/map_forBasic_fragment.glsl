@varDeclare
varying vec2 v_mapCoord0;
@end

@body
    totalColor *= vec4(texture2D(u_sampler2D0, v_mapCoord0).xyz, 1.0);
@end
