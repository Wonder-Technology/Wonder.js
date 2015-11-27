@varDeclare
varying vec3 v_basicEnvMap_dir;
@end

@body
    totalColor *= textureCube(u_samplerCube0, v_basicEnvMap_dir);
@end
