@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
    totalColor *= textureCube(u_samplerCube0, refract(inDir, v_normal, u_refractionRatio));
}
@end

