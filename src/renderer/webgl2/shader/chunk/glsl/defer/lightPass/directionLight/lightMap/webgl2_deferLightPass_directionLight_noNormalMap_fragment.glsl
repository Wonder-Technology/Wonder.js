@funcDefine
vec3 getDirectionLightDir(){
    return getDirectionLightDirByLightPos(directionLightUbo.lightPosition.xyz);
}
@end

