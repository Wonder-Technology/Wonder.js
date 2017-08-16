@funcDefine
vec3 getPointLightDir(vec3 worldPosition){
    return getPointLightDirByLightPos(pointLightUbo.lightPosition.xyz, worldPosition);
//    return getPointLightDirByLightPos(vec3(10.0, 0.0, 0.0), worldPosition);
}

vec3 getViewDir(vec3 worldPosition){
    return normalize(cameraUbo.cameraPos.xyz - worldPosition);
}
@end

