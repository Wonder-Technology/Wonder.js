@varDeclare
varying vec2 v_texCoord;

uniform vec4 u_skyColor;
uniform vec4 u_cloudColor;
@end

@body
	gl_FragColor = mix(u_skyColor, u_cloudColor, fbm(v_texCoord * 12.0));
@end

