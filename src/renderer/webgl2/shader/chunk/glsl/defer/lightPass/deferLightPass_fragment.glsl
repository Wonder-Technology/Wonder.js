@varDeclare
//todo move to light ubo
//uniform vec3 u_lightPosition;
//uniform vec3 u_lightColor;
//uniform float u_lightIntensity;
//uniform float u_lightConstant;
//uniform float u_lightLinera;
//uniform float u_lightQuadratic;
////uniform float u_lightRange;
//
//uniform float u_lightRadius;




//uniform int u_lightModel;
//uniform vec3 u_cameraPos;



    in vec2 v_texcoord;
@end


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


//todo optimize specular color
vec3 getSpecularColor(vec3 diffuseColor)
{
return diffuseColor;
}

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir, vec3 materialDiffuse, float specularStrength, float shininess)
{
        vec3 materialLight = getMaterialLight();

        vec3 materialSpecular = getSpecularColor(materialDiffuse);

        vec3 materialEmission = getMaterialEmission();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;

        //todo pass ambient data: u_ambient
//        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse;
        vec3 ambientColor = vec3(0.0);

        float lightModel = lightUbo.lightModel.x;

        if(lightModel == 3.0){
            return emissionColor + ambientColor;
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

        return emissionColor + ambientColor + attenuation * (diffuseColor + specularColor);
}



        vec3 calcPointLight(vec3 lightDir, vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        vec4 lightData = pointLightUbo.lightData;

//        mat3 normalMatrix = cameraUbo.normalMatrix;

//        if(normalMatrix[0][3] == 0.0){
//            return vec3(0.5);
//        }

        if(distance >= lightData.w){
            return vec3(0.0);
        }

        attenuation = 1.0 / (lightData.x + lightData.y * distance + lightData.z * (distance * distance));

        lightDir = normalize(lightDir);

        vec4 lightColorData = pointLightUbo.lightColorData;

        return calcLight(lightDir, lightColorData.xyz, lightColorData.w, attenuation, normal, viewDir, diffuseColor, specularStrength, shininess);
}

vec4 calcTotalLight(vec3 normal, vec3 position, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess){
    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);

                totalLight += vec4(calcPointLight(getPointLightDir(position), normal, viewDir, diffuseColor, specularStrength, shininess), 0.0);

//    #if DIRECTION_LIGHTS_COUNT > 0
//                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
//                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);
//        }
//    #endif

        return totalLight;
}
@end


@body
            vec4 positionData = texture(u_positionBuffer,
v_texcoord);

            vec3 position = positionData.xyz;
            float shininess = positionData.w;


            vec3 normal = normalize(texture(u_normalBuffer, v_texcoord).rgb);
            vec4 colorData = texture(u_colorBuffer, v_texcoord);

            vec3 diffuseColor = colorData.xyz;
            float specularStrength  = colorData.w;



vec3 viewDir = normalize(getViewDir(position));

vec4 totalColor = calcTotalLight(normal, position, viewDir, diffuseColor, specularStrength, shininess);
@end


