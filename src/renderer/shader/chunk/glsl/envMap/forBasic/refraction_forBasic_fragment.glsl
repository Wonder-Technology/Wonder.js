@body
    totalColor *= textureCube(u_samplerCube0, refract(inDir, normalize(v_normal), u_refractionRatio))
@end

