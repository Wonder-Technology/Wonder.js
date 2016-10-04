@varDeclare
//	uniform vec3 fogColor;
//	uniform float fogNear;
//	uniform float fogFar;
//	uniform vec3 grassFogColor;
//	uniform float grassFogFar;

varying vec4 v_color;
varying vec2 v_texCoord;
@end

@body
		vec4 color = v_color * texture2D(u_grassMapSampler, vec2(v_texCoord.s, v_texCoord.t));


//		float depth = gl_FragCoord.z / gl_FragCoord.w;
//		// apply 'grass fog' first
//		float fogFactor = smoothstep(fogNear, grassFogFar, depth);
//		color.rgb = mix(color.rgb, grassFogColor, fogFactor);
//		// then apply atmosphere fog
//		fogFactor = smoothstep(fogNear, fogFar, depth);
//		color.rgb = mix(color.rgb, fogColor, fogFactor);
		// output
		gl_FragColor = color;
@end
