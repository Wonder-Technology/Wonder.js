@varDeclare
varying vec3 v_dir;
@end

@body
    totalColor *= textureCube(u_samplerCube0, v_dir);
@end
