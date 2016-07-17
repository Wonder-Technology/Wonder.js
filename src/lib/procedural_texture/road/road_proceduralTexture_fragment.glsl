@varDeclare
varying vec2 v_texCoord;
@end

@body
	float ratioy = mod(gl_FragCoord.y * 100.0 , fbm(v_texCoord * 2.0));
	vec3 color = u_roadColor * ratioy;

	gl_FragColor = vec4(color, 1.0);
@end

