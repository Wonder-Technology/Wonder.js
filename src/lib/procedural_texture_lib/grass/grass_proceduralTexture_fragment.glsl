@varDeclare
varying vec2 v_texCoord;

uniform vec3 u_herb1Color;
uniform vec3 u_herb2Color;
uniform vec3 u_herb3Color;
uniform vec3 u_groundColor;
@end

@body
	vec3 color = mix(u_groundColor, u_herb1Color, rand(v_texCoord.xy * 4.0));
	color = mix(color, u_herb2Color, rand(gl_FragCoord.xy * 8.0));
	color = mix(color, u_herb3Color, rand(gl_FragCoord.xy));
	color = mix(color, u_herb1Color, fbm(gl_FragCoord.xy * 16.0));

	gl_FragColor = vec4(color, 1.0);
@end

