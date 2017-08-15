@funcDefine
vec3 getPointLightDir(vec3 worldPosition){
    return getPointLightDirByLightPos(u_lightPosition, worldPosition);
}

vec3 getViewDir(vec3 worldPosition){
    return normalize(u_cameraPos - worldPosition);
}
@end

