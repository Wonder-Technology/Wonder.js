@varDeclare
varying vec2 v_bitmapCoord;
@end

@body
totalColor *= texture2D(u_bitmapSampler, v_bitmapCoord);
@end

