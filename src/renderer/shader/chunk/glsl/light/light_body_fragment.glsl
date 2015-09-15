    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);

vec3 totalLight = vec3(0, 0, 0);

#if MAX_POINT_LIGHTS > 0

   for(int i = 0; i < MAX_POINT_LIGHTS; i++){
        totalLight += calcPointLight(u_pointLights[i], norm, viewDir);
   }
#endif

    //vec3 totalLight = calcDirectionLight(u_directionLight, norm, viewDir);



    gl_FragColor = vec4(totalLight, 1.0);

