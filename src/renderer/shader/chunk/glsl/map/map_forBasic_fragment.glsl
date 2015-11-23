@varDeclare
varying vec2 v_mapCoord;
@end

@body
    totalColor *= vec3(texture2D(u_sampler2D0, v_mapCoord));
@end
