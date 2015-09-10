    vec4 color0 = texture2D(u_sampler2D0, v_texCoord);
    vec4 color1 = texture2D(u_sampler2D1, v_texCoord);
    gl_FragColor = mix(color0, color1, 0.2);

