    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);

    vec3 totalLight = vec3(0, 0, 0);

#if POINT_LIGHTS_COUNT > 0
   for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
        totalLight += calcPointLight(u_pointLights[i], norm, viewDir);
   }
#endif

#if DIRECTION_LIGHTS_COUNT > 0
   for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
        totalLight += calcDirectionLight(u_directionLights[i], norm, viewDir);
   }
#endif


    gl_FragColor = vec4(totalLight, 1.0);

