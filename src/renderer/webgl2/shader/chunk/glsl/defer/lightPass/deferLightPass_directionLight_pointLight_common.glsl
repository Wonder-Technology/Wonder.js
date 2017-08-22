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

@end

@body
            vec4 positionData = texture(u_positionBuffer,
v_texcoord);

            vec3 position = positionData.xyz;
            float shininess = positionData.w;


            vec3 normal = normalize(texture(u_normalBuffer, v_texcoord).rgb);

            float specularStrength  = colorData.w;



vec3 viewDir = normalize(getViewDir(position));
@end
