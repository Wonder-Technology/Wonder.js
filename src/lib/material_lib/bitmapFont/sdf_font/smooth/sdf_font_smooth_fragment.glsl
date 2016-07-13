@varDeclare
varying vec2 v_bitmapCoord;
@end

@body
//gl_FragColor = texture2D(u_sampler2D0, v_bitmapCoord);
//
//gl_FragColor.a = sdfSmoothStep(u_opacity * gl_FragColor.a);
////gl_FragColor.a = 0.0;
//
//if (gl_FragColor.a < u_alphaTest){
//    discard;
//}
//totalColor.rgb = v_color;

vec4 texColor = texture2D(u_sampler2D0, v_bitmapCoord);


//totalColor.rgb = v_color * texColor.rgb;
//totalColor.rgb = v_color;

float alpha = sdfSmoothStep(texColor.a);

//totalColor.a = u_opacity * alpha;
totalColor = vec4(v_color, alpha);
//totalColor = vec4(texColor.a);
//totalColor = vec4(sdfSmoothStep(0.8));
//totalColor = vec4(0.6,0.5,0.6, alpha);
//totalColor = texColor;
//totalColor = vec4(alpha);


//gl_FragColor.a = 0.0;

//todo move to end glsl(u_alphaTest is static!)
if (totalColor.a < u_alphaTest){
    discard;
}


//gl_FragColor = totalColor;
@end

