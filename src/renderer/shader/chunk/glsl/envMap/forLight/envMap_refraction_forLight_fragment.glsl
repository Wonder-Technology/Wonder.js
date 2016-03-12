@body
    totalColor *= textureCube(u_samplerCube0, refract(inDir, getNormal(), u_refractionRatio));
@end

