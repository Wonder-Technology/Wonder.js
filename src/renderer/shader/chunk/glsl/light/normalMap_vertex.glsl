@varDeclare
	varying vec2 v_normalMapTexCoord;
	varying vec3 v_viewDir;



#if POINT_LIGHTS_COUNT > 0
varying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];
#endif

#if DIRECTION_LIGHTS_COUNT > 0
varying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];
#endif

@end





@funcDefine
        mat3 computeTBN(){
            //vec3 T = normalize(normalMatrix * tangent);
            //vec3 B = normalize(normalMatrix * bitangent);
            //vec3 N = normalize(normalMatrix * normal);

            vec3 T = normalize(vec3(u_normalMatrix * vec4(a_tangent, 1.0)));
            vec3 N = normalize(vec3(u_normalMatrix * vec4(a_normal, 1.0)));
            // re-orthogonalize T with respect to N
            T = normalize(T - dot(T, N) * N);
            // then retrieve perpendicular vector B with the cross product of T and N
            vec3 B = cross(T, N);


            return transpose(mat3(T, B, N));
        }
@end


@body
    mat3 TBN = computeTBN();

    //v_tangentLightPos = TBN * light.position;
    //v_tangentCameraPos  = TBN * u_cameraPos;
    //v_tangentPos  = TBN * v_position;


    vec3 tangentPosition = TBN * vec3(u_mMatrix * vec4(a_position, 1.0));

    v_normalMapTexCoord = a_texCoord;

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

@end
