    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);
    vec3 totalLight = calcDirectionLight(u_directionLight, norm, viewDir);

    gl_FragColor = vec4(totalLight, 1.0);

