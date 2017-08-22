@funcDefine
vec3 getPointLightDir(vec3 worldPosition){
    return getPointLightDirByLightPos(pointLightUbo.lightPosition.xyz, worldPosition);
}
@end

