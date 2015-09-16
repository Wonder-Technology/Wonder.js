    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);

    vec3 totalLight = vec3(0, 0, 0);

    calcTotalLight(totalLight, norm, viewDir, v_worldPosition);


    gl_FragColor = vec4(totalLight, 1.0);

