@funcDeclare
vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
@end

@funcDefine
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
@end
