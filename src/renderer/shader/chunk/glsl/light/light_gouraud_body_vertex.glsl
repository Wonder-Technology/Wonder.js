    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;

    vec3 worldPosition = vec3(u_mMatrix * a_position);
    vec3 normal = vec3(u_normalMatrix * a_normal);




    vec3 norm = normalize(normal);
    vec3 viewDir = normalize(u_cameraPos - worldPosition);

    vec3 totalLight = vec3(0, 0, 0);

#if POINT_LIGHTS_COUNT > 0
   for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
        totalLight += calcPointLight(u_pointLights[i], norm, viewDir, worldPosition);
   }
#endif

#if DIRECTION_LIGHTS_COUNT > 0
   for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
        totalLight += calcDirectionLight(u_directionLights[i], norm, viewDir);
   }
#endif

    v_color = totalLight;
