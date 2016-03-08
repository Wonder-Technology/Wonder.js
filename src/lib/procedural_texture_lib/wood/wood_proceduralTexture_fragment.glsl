@varDeclare
varying vec2 v_texCoord;

uniform float u_ampScale;
uniform vec3 u_woodColor;
@end

@body
	float ratioy = mod(v_texCoord.x * u_ampScale, 2.0 + fbm(v_texCoord * 0.8));
	vec3 wood = u_woodColor * ratioy;

	gl_FragColor = vec4(wood, 1.0);
@end

