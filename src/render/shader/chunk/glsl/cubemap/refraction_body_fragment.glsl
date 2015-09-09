    gl_FragColor = textureCube(u_sampler0, refract(inDir, normalize(v_normal), u_refractionRatio));

