@varDeclare
varying vec2 v_texCoord;

struct FireColor {
    vec3 c1;
    vec3 c2;
    vec3 c3;
    vec3 c4;
    vec3 c5;
    vec3 c6;
};
uniform FireColor u_fireColor;
@end

@body
	vec2 p = v_texCoord * 8.0;
	float q = fbm(p - u_time * 0.1);
	vec2 r = vec2(fbm(p + q + u_time * u_speed.x - p.x - p.y), fbm(p + q - u_time * u_speed.y));
	vec3 c = mix(u_fireColor.c1, u_fireColor.c2, fbm(p + r)) + mix(u_fireColor.c3, u_fireColor.c4, r.x) - mix(u_fireColor.c5, u_fireColor.c6, r.y);
	vec3 color = c * cos(u_shift * v_texCoord.y);
	float luminance = dot(color.rgb, vec3(0.3, 0.59, 0.11));

	gl_FragColor = vec4(color, luminance * u_alphaThreshold + (1.0 - u_alphaThreshold));
@end

