@varDeclare
varying vec2 v_mapCoord0;
@end

@body
    vec4 totalColor *= texture2D(u_sampler2D, v_mapCoord0);
@end

