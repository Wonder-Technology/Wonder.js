@body
    totalColor *= textureCube(u_samplerCube0, reflect(inDir, normalize(getNormal())));
@end
