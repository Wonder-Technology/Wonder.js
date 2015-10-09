@varDeclare
varying vec3 v_worldPosition;
@end

@body
    vec3 norm = normalize(getNormal());
    vec3 viewDir = normalize(getViewDir());

    vec3 totalLight = vec3(0, 0, 0);

    calcTotalLight(totalLight, norm, viewDir);






    //vec3 fragToLight= v_position - u_lightPos;





    //vec3 color = vec3(textureCube(u_cubemapShadowMapSampler, VectorToDepthValue(fragToLight)));
    //vec3 color = vec3(textureCube(u_cubemapShadowMapSampler, fragToLight));
    //vec3 fragToLight;
    //fragToLight = vec3(-1.99, -1.99, -2);
    //fragToLight = vec3(-1.99, 1.99, -2);
    //fragToLight = vec3(1.99, -1.99, -2);
    //fragToLight = vec3(1.99, 1.99, -2);
    //vec3 color = vec3(textureCube(u_cubemapShadowMapSampler, fragToLight));

    //gl_FragColor = vec4(color, 1.0);
    //gl_FragColor = vec4((v_position.xy + 10.0)/20.0, v_position.z/2.0, 1.0);
    //gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);




    gl_FragColor = vec4(totalLight, 1.0);

@end
