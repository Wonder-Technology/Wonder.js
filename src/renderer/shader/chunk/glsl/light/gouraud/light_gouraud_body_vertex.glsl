    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);

    vec3 worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));
    vec3 normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));




    vec3 norm = normalize(normal);
    vec3 viewDir = normalize(u_cameraPos - worldPosition);

    vec3 totalLight = vec3(0, 0, 0);

    calcTotalLight(totalLight, norm, viewDir, worldPosition);

    v_color = totalLight;
