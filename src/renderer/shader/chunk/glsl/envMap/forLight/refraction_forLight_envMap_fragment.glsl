@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
    totalColor *= textureCube(u_samplerCube0, refract(inDir, getNormal(), u_refractionRatio));
}
@end

