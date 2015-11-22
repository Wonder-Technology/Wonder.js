@body
    totalColor *= vec3(textureCube(u_samplerCube0, reflect(inDir, normalize(getNormal()))));
@end
