@varDeclare
varying vec3 v_dir;
@end


@body
    gl_FragColor = textureCube(u_samplerCube0, v_dir);
@end
