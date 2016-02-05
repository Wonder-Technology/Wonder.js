@funcDefine
float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 halfAngle = normalize(lightDir + viewDir);

        float blinnTerm = dot(normal, halfAngle);

        blinnTerm = clamp(blinnTerm, 0.0, 1.0);
        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;
        blinnTerm = pow(blinnTerm, shininess);

        return blinnTerm;
}

float getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 reflectDir = reflect(-lightDir, normal);
        float phongTerm = dot(viewDir, reflectDir);

        phongTerm = clamp(phongTerm, 0.0, 1.0);
        phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;
        phongTerm = pow(phongTerm, shininess);

        return phongTerm;
}

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)
{
        vec3 materialDiffuse = getMaterialDiffuse();
        vec3 materialSpecular = getMaterialSpecular();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);


        vec3 ambientColor = u_ambient * materialDiffuse;


        if(u_lightModel == 3){
            return ambientColor;
        }

        vec3 diffuseColor = diff * color * materialDiffuse * intensity;


        float spec = 0.0;

        if(u_lightModel == 2){
                spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);
        }
        else if(u_lightModel == 1){
                spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);
        }

        vec3 specularColor = spec * materialSpecular * intensity;

        return ambientColor + attenuation * (diffuseColor + specularColor);
}





#if POINT_LIGHTS_COUNT > 0
        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        if(light.range == NULL || distance < light.range)
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



vec3 calcTotalLight(vec3 norm, vec3 viewDir){
        vec3 totalLight = vec3(0.0);

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

        return totalLight;
}
@end


@body
vec3 normal = normalize(getNormal());

#ifdef BOTH_SIDE
normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));
#endif

vec3 viewDir = normalize(getViewDir());

vec4 totalColor = vec4(calcTotalLight(normal, viewDir), 1.0);

totalColor *= vec4(getShadowVisibility(), 1.0);
@end

