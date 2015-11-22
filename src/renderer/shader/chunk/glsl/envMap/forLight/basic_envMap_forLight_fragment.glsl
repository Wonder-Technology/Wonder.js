@varDeclare
varying vec3 v_basicEnvMap_dir;
@end

@body
    totalColor *= vec3(textureCube(u_samplerCube0, v_basicEnvMap_dir));
@end
