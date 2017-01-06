@funcDefine
vec3 getDirectionLightDir(vec3 lightPos){
    return normalize(lightPos - vec3(0.0));
}
@end

