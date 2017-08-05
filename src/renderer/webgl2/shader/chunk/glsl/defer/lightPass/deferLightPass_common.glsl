@funcDeclare
//vec3 getDirectionLightDirByLightPos(vec3 lightPos);
//vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
@end

@funcDefine
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
@end
