
    mat3 TBN = computeTBN();

    //v_tangentLightPos = TBN * light.position;
    //v_tangentCameraPos  = TBN * u_cameraPos;
    //v_tangentPos  = TBN * v_position;


    vec3 tangentPosition = TBN * vec3(u_mMatrix * vec4(a_position, 1.0));

    v_normalMapTexCoord = a_texCoord;

    v_normal = a_normal;

    v_viewDir = normalize(TBN * u_cameraPos - tangentPosition);


#if POINT_LIGHTS_COUNT > 0
       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
            //not normalize for computing distance
            v_pointLightDir[i] = TBN * u_pointLights[i].position - tangentPosition;
       }
#endif

#if DIRECTION_LIGHTS_COUNT > 0
       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
            v_directionLightDir[i] = normalize(- TBN * u_directionLights[i].direction);
       }
#endif
