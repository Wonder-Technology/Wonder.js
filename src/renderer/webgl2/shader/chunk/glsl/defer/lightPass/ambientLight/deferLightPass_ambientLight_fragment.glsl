@funcDefine
vec3 calcLight(vec3 materialDiffuse)
{
    vec3 materialLight = getMaterialLight();

    return (ambientLightUbo.lightColorData.xyz + materialLight) * materialDiffuse;
}

vec3 calcAmbientLight(vec3 diffuseColor)
{
    return calcLight(diffuseColor);
}

vec4 calcTotalLight(vec3 diffuseColor){
    return vec4(calcAmbientLight(diffuseColor), 1.0);
}
@end


@body
vec4 totalColor = calcTotalLight(diffuseColor);
@end


