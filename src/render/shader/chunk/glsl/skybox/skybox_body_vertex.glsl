    vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * a_position;

    gl_Position = pos.xyww;

    v_dir = vec3(a_position);

