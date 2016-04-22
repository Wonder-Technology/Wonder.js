@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
//    totalColor *= textureCube(u_samplerCube0, refract(inDir, flipNormalWhenRefraction(normal), u_refractionRatio));
    totalColor *= textureCube(u_samplerCube0, refract(inDir, normal, u_refractionRatio));
}
@end

