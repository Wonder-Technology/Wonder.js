    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);



#ifdef POINT
    vec3 totalLight = calcPointLight(u_pointLight, norm, viewDir);
#endif
    //vec3 totalLight = calcDirectionLight(u_directionLight, norm, viewDir);



    gl_FragColor = vec4(totalLight, 1.0);

