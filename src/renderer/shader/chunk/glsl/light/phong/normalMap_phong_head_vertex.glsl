	varying vec2 v_normalMapTexCoord;
	//varying vec3 v_tangentLightPos;
	//varying vec3 v_tangentCameraPos;
	//varying vec3 v_tangentPos;

	varying vec3 v_viewDir;
	varying vec3 v_normal;




#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];


varying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];

#endif



#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 direction;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];

varying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];

#endif



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
