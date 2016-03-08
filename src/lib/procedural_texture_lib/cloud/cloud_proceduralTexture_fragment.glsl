@varDeclare
varying vec2 v_texCoord;
@end

@body
	gl_FragColor = mix(u_skyColor, u_cloudColor, fbm(v_texCoord * 12.0));
@end

