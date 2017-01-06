@varDeclare
varying vec2 v_texCoord;
@end

@body
	float brickW = 1.0 / u_tilesWidthNumber;
	float brickH = 1.0 / u_tilesWidthNumber;
	float jointWPercentage = 0.01;
	float jointHPercentage = 0.05;
	vec3 color = u_brickColor;
	float yi = v_texCoord.y / brickH;
	float nyi = round(yi);
	float xi = v_texCoord.x / brickW;

	if (mod(floor(yi), 2.0) == 0.0){
		xi = xi - 0.5;
	}

	float nxi = round(xi);
	vec2 brickv_texCoord = vec2((xi - floor(xi)) / brickH, (yi - floor(yi)) /  brickW);

	if (yi < nyi + jointHPercentage && yi > nyi - jointHPercentage){
		color = mix(u_jointColor, vec3(0.37, 0.25, 0.25), (yi - nyi) / jointHPercentage + 0.2);
	}
	else if (xi < nxi + jointWPercentage && xi > nxi - jointWPercentage){
		color = mix(u_jointColor, vec3(0.44, 0.44, 0.44), (xi - nxi) / jointWPercentage + 0.2);
	}
	else {
		float u_brickColorSwitch = mod(floor(yi) + floor(xi), 3.0);

		if (u_brickColorSwitch == 0.0)
			color = mix(color, vec3(0.33, 0.33, 0.33), 0.3);
		else if (u_brickColorSwitch == 2.0)
			color = mix(color, vec3(0.11, 0.11, 0.11), 0.3);
	}

	gl_FragColor = vec4(color, 1.0);
@end

