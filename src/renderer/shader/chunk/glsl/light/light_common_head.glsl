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
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

vec3 calcPointLight(PointLight light, vec3 normal, vec3 viewDir, vec3 worldPosition)
{
    vec3 lightDir = normalize(light.position - worldPosition);

    // Attenuation
    float distance = length(light.position - worldPosition);

    float attenuation = 0.0;
    if(distance < light.range)
    {
        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
    }

    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 direction;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];

vec3 calcDirectionLight(DirectionLight light, vec3 normal, vec3 viewDir)
{
    vec3 lightDir = normalize(-light.direction);
    float attenuation = 1.0;

    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



void calcTotalLight(inout vec3 totalLight, vec3 norm, vec3 viewDir, vec3 worldPosition){
    #if POINT_LIGHTS_COUNT > 0
       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
            totalLight += calcPointLight(u_pointLights[i], norm, viewDir, worldPosition);
       }
    #endif

    #if DIRECTION_LIGHTS_COUNT > 0
       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
            totalLight += calcDirectionLight(u_directionLights[i], norm, viewDir);
       }
    #endif
}
