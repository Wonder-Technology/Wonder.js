@varDeclare
varying vec2 v_texCoord;
const vec3 TILE_SIZE = vec3(1.1, 1.0, 1.1);
//const vec3 TILE_PCT = vec3(0.98, 1.0, 0.98);
@end

@funcDefine
vec3 marble_color(float x)
{
	vec3 col;
	x = 0.5*(x + 1.);
	x = sqrt(x);
	x = sqrt(x);
	x = sqrt(x);
	col = vec3(.2 + .75*x);
	col.b *= 0.95;
	return col;
}
@end

@body
	vec3 color;
	float brickW = 1.0 / u_tilesHeightNumber;
	float brickH = 1.0 / u_tilesWidthNumber;
	float jointWPercentage = 0.01;
	float jointHPercentage = 0.01;
	float yi = v_texCoord.y / brickH;
	float nyi = round(yi);
	float xi = v_texCoord.x / brickW;

	if (mod(floor(yi), 2.0) == 0.0){
		xi = xi - 0.5;
	}

	float nxi = round(xi);
	vec2 brickv_texCoord = vec2((xi - floor(xi)) / brickH, (yi - floor(yi)) / brickW);

	if (yi < nyi + jointHPercentage && yi > nyi - jointHPercentage){
		color = mix(u_jointColor, vec3(0.37, 0.25, 0.25), (yi - nyi) / jointHPercentage + 0.2);
	}
	else if (xi < nxi + jointWPercentage && xi > nxi - jointWPercentage){
		color = mix(u_jointColor, vec3(0.44, 0.44, 0.44), (xi - nxi) / jointWPercentage + 0.2);
	}
	else {
		float t = 6.28 * brickv_texCoord.x / (TILE_SIZE.x + noise(vec2(v_texCoord)*6.0));
		t += u_amplitude * turbulence(brickv_texCoord.xy);
		t = sin(t);
		color = marble_color(t);
	}

	gl_FragColor = vec4(color, 0.0);
@end

