@funcDefine
vec3 flipNormal(vec3 normal){
    vec3 normalForRefraction = normal;

    normalForRefraction.y = -normalForRefraction.y;
    normalForRefraction.z = -normalForRefraction.z;

    return normalForRefraction;
}
@end
