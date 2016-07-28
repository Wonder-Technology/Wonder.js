@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
    totalColor *= textureCube(u_samplerCube0, refract(inDir, flipNormal(normal), u_refractionRatio));
}
@end

