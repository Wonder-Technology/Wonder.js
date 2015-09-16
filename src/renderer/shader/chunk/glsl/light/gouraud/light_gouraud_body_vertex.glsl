    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;

    vec3 worldPosition = vec3(u_mMatrix * a_position);
    vec3 normal = vec3(u_normalMatrix * a_normal);




    vec3 norm = normalize(normal);
    vec3 viewDir = normalize(u_cameraPos - worldPosition);

    vec3 totalLight = vec3(0, 0, 0);

    calcTotalLight(totalLight, norm, viewDir, worldPosition);

    v_color = totalLight;
