@funcDefine
vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)
{
    vec3 materialDiffuse = getMaterialDiffuse();
    vec3 materialSpecular = getMaterialSpecular();

    float dotResultBetweenNormAndLight = dot(normal, lightDir);
    float diff = max(dotResultBetweenNormAndLight, 0.0);

    float spec = 0.0;
    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光
    if(dotResultBetweenNormAndLight < 0.0){
        spec = 0.0;
    }
    else{
        vec3 reflectDir = reflect(-lightDir, normal);
        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);
    }

    vec3 ambientColor = u_ambient * materialDiffuse;

    vec3 diffuseColor = diff * color * materialDiffuse * intensity;

    vec3 specularColor = spec * materialSpecular * intensity;

    return  ambientColor + attenuation * (diffuseColor + specularColor);
}





#if POINT_LIGHTS_COUNT > 0
vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)
{
    //lightDir is not normalize computing distance
    float distance = length(lightDir);

    float attenuation = 0.0;
    if(distance < light.range)
    {
        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
    }

    lightDir = normalize(lightDir);

    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



#if DIRECTION_LIGHTS_COUNT > 0
vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)
{
    float attenuation = 1.0;

    lightDir = normalize(lightDir);

    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



void calcTotalLight(inout vec3 totalLight, vec3 norm, vec3 viewDir){
    #if POINT_LIGHTS_COUNT > 0
       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
            totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);
       }
    #endif

    #if DIRECTION_LIGHTS_COUNT > 0
       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
            totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);
       }
    #endif
}
@end


@body
    vec3 norm = normalize(getNormal());
    vec3 viewDir = normalize(getViewDir());

    vec3 totalLight = vec3(0, 0, 0);

    calcTotalLight(totalLight, norm, viewDir);

    totalLight = getShadowVisibility() * totalLight;

    gl_FragColor = vec4(totalLight, 1.0);
@end
