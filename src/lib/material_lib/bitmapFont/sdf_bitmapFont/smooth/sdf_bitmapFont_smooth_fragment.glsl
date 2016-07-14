@varDeclare
varying vec2 v_bitmapCoord;
@end

@body
gl_FragColor.a *= sdfSmoothStep(texture2D(u_bitmapSampler, v_bitmapCoord).a);
@end

