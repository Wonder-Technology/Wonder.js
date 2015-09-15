    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);

    vec3 totalLight = vec3(0, 0, 0);

#if MAX_POINT_LIGHTS > 0
   for(int i = 0; i < MAX_POINT_LIGHTS; i++){
        totalLight += calcPointLight(u_pointLights[i], norm, viewDir);
   }
#endif

#if MAX_DIRECTION_LIGHTS > 0
   for(int i = 0; i < MAX_DIRECTION_LIGHTS; i++){
        totalLight += calcDirectionLight(u_directionLights[i], norm, viewDir);
   }
#endif


    gl_FragColor = vec4(totalLight, 1.0);

