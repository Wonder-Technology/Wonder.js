    vec4 color0 = texture2D(u_sampler2D0, v_texCoord);
    vec4 color1 = texture2D(u_sampler2D1, v_texCoord);

    if(u_combineMode == 0){
        gl_FragColor = mix(color0, color1, u_mixRatio);
    }
    else if(u_combineMode == 1){
        gl_FragColor = color0 * color1;
    }
    else if(u_combineMode == 2){
        gl_FragColor = color0 + color1;
    }

