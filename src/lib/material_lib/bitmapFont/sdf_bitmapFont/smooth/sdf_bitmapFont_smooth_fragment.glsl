@varDeclare
varying vec2 v_bitmapCoord;
@end

@body
gl_FragColor.a *= sdfSmoothStep(texture2D(u_bitmapSampler, v_bitmapCoord).a);

//todo move to end glsl(u_alphaTest is static!)
if (gl_FragColor.a < u_alphaTest){
    discard;
}
@end

