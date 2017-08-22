@funcDefine
vec3 getViewDir(vec3 worldPosition){
    return normalize(cameraUbo.cameraPos.xyz - worldPosition);
}
@end

