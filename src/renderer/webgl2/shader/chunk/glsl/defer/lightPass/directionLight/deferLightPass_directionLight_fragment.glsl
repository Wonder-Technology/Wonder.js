@funcDefine
vec3 calcLight(vec3 lightDir, vec3 color, float intensity, vec3 normal, vec3 viewDir, vec3 materialDiffuse, float specularStrength, float shininess)
{
        vec3 materialLight = getMaterialLight();

        vec3 materialSpecular = getSpecularColor(materialDiffuse);

        vec3 materialEmission = getMaterialEmission();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;

//        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse;
//        vec3 ambientColor = vec3(0.0);

        float lightModel = lightUbo.lightModel.x;

        if(lightModel == 3.0){
//            return emissionColor + ambientColor;
            return emissionColor;
        }

        vec3 diffuseColor = color * materialDiffuse * diff * intensity;

        float spec = 0.0;

        if(lightModel == 2.0){
                spec = getPhongShininess(shininess, normal, lightDir, viewDir, diff);
        }
        else if(lightModel == 1.0){
                spec = getBlinnShininess(shininess, normal, lightDir, viewDir, diff);
        }

        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;

//        return emissionColor + ambientColor + attenuation * (diffuseColor + specularColor);
        return emissionColor + diffuseColor + specularColor;
}



        vec3 calcDirectionLight(vec3 lightDir, vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        lightDir = normalize(lightDir);

        vec4 lightColorData = directionLightUbo.lightColorData;

        return calcLight(lightDir, lightColorData.xyz, lightColorData.w, normal, viewDir, diffuseColor, specularStrength, shininess);
}

vec4 calcTotalLight(vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess){
    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);

                totalLight += vec4(calcDirectionLight(getDirectionLightDir(), normal, viewDir, diffuseColor, specularStrength, shininess), 0.0);

        return totalLight;
}
@end


@body
vec4 totalColor = calcTotalLight(normal, viewDir, diffuseColor, specularStrength, shininess);
@end


