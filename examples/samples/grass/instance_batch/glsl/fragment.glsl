precision highp float;

//todo enable fog

	uniform sampler2D u_sampler2D;
//	uniform vec3 fogColor;
//	uniform float fogNear;
//	uniform float fogFar;
//	uniform vec3 grassFogColor;
//	uniform float grassFogFar;

//	varying vec3 vPosition;
	varying vec4 v_color;
	varying vec2 v_texCoord;

	void main() {
		vec4 color = vec4(v_color) * texture2D(u_sampler2D, vec2(v_texCoord.s, v_texCoord.t));
//		vec4 color = texture2D(u_sampler2D, vec2(v_texCoord.s, v_texCoord.t));
//vec4 color = vec4(1.0,0.0,1.0,1.0);


//		float depth = gl_FragCoord.z / gl_FragCoord.w;
//		// apply 'grass fog' first
//		float fogFactor = smoothstep(fogNear, grassFogFar, depth);
//		color.rgb = mix(color.rgb, grassFogColor, fogFactor);
//		// then apply atmosphere fog
//		fogFactor = smoothstep(fogNear, fogFar, depth);
//		color.rgb = mix(color.rgb, fogColor, fogFactor);
		// output
		gl_FragColor = color;
	}