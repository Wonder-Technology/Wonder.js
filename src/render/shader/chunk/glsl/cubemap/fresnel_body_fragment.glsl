    vec3 normal = normalize(v_normal);

    vec3 reflectDir = reflect(inDir, normal);
    vec3 refractDir = refract(inDir, normal, u_refractionRatio);

    vec4 reflectColor = textureCube(u_sampler0, reflectDir);
    vec4 refractColor = textureCube(u_sampler0, refractDir);

    gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));

