
varying vec3 v_worldPosition;
varying vec3 v_normal;

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)
{
    float dotResultBetweenNormAndLight = dot(normal, lightDir);
    // Diffuse shading
    float diff = max(dotResultBetweenNormAndLight, 0.0);

    // Specular shading
    float spec = 0.0;
    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光
    if(dotResultBetweenNormAndLight < 0.0){
        spec = 0.0;
    }
    else{
        vec3 reflectDir = reflect(-lightDir, normal);
        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);
    }

    // Combine results
    vec3 ambientColor = u_ambient;
    vec3 diffuseColor = diff * color * u_diffuse * intensity;
    vec3 specularColor = spec * u_specular * intensity;

    return  ambientColor + attenuation * (diffuseColor + specularColor);
    //return vec3(distance/ 256.0, ambientColor, 0.0);
}





#ifdef POINT
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLight;

vec3 calcPointLight(PointLight light, vec3 normal, vec3 viewDir)
{
    vec3 lightDir = normalize(light.position - v_worldPosition);

    // Attenuation
    float distance = length(light.position - v_worldPosition);

    float attenuation = 0.0;
    if(distance < light.range)
    {
        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
    }

    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



//struct DirectionLight {
//    vec3 direction;
//
//    float intensity;
//
//    vec3 color;
//};
//uniform DirectionLight u_directionLight;


// Calculates the color when using a directional light.
//vec3 calcDirectionLight(DirectionLight light, vec3 normal, vec3 viewDir)
//{
//    vec3 lightDir = normalize(-light.direction);
//    float attenuation = 1.0;
//
//    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
//}

