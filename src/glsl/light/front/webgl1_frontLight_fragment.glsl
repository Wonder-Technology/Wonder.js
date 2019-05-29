@funcDefine
float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 halfAngle = normalize(lightDir + viewDir);

        float blinnTerm = dot(normal, halfAngle);

        blinnTerm = clamp(blinnTerm, 0.0, 1.0);
        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;
        blinnTerm = pow(blinnTerm, shininess);

        return blinnTerm;
}

// float getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
//         vec3 reflectDir = reflect(-lightDir, normal);
//         float phongTerm = dot(viewDir, reflectDir);

//         phongTerm = clamp(phongTerm, 0.0, 1.0);
//         phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;
//         phongTerm = pow(phongTerm, shininess);

//         return phongTerm;
// }

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir, vec3 materialDiffuse)
{
        vec3 materialSpecular = u_specular;
        vec3 materialEmission = getMaterialEmission();

        float specularStrength = getSpecularStrength();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;



        // if(u_lightModel == 3){
        //     return emissionColor + ambientColor;
        // }

        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;

        float spec = 0.0;

        // if(u_lightModel == 2){
        //         spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);
        // }
        // else if(u_lightModel == 1){
        //         spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);
        // }

        spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);


        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;

       return vec3(emissionColor + attenuation * (diffuseColor.rgb + specularColor));
}




#if POINT_LIGHTS_COUNT > 0
        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir, vec3 materialDiffuse)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        if(distance < light.range)
        {
            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
        }

        lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir, materialDiffuse);
}
#endif



#if DIRECTION_LIGHTS_COUNT > 0
        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir, vec3 materialDiffuse)
{
        float attenuation = 1.0;

        // lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir, materialDiffuse);
}
#endif



vec4 calcTotalLight(vec3 norm, vec3 viewDir){
    vec3 totalLight = vec3(0.0, 0.0, 0.0);

    vec4 materialDiffuse = getMaterialDiffuse();

    float alpha = materialDiffuse.a;
    vec3 materialDiffuseRGB = materialDiffuse.rgb;


    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )
        return vec4(u_ambient * materialDiffuseRGB, alpha);
    #endif


    #if POINT_LIGHTS_COUNT > 0
                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
                totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir, materialDiffuseRGB);
        }
    #endif

    #if DIRECTION_LIGHTS_COUNT > 0
                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir, materialDiffuseRGB);
        }
    #endif

        totalLight += u_ambient * materialDiffuseRGB;

        return vec4(totalLight, alpha);
}
@end


@body
vec3 normal = normalize(getNormal());

// #ifdef BOTH_SIdE
// normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));
// #endif

vec3 viewDir = normalize(getViewDir());

vec4 totalColor = calcTotalLight(normal, viewDir);

// totalColor.a *= u_opacity;

totalColor.rgb = totalColor.rgb * getShadowVisibility();
@end

