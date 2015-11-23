@funcDefine
float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){
    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);
    float fresnelPower = 5.0;

    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);

    return ratio / 100.0;
}

vec3 getEnvMapTotalColor(vec3 inDir){
    vec3 normal = normalize(getNormal());

    vec3 reflectDir = reflect(inDir, normal);
    vec3 refractDir = refract(inDir, normal, u_refractionRatio);

    vec3 reflectColor = vec3(textureCube(u_samplerCube0, reflectDir));
    vec3 refractColor = vec3(textureCube(u_samplerCube0, refractDir));

    vec3 totalColor = vec3(0, 0, 0);

	if(u_reflectivity != NULL){
        totalColor = mix(reflectColor, refractColor, u_reflectivity);
	}
	else{
        totalColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));
	}

	return totalColor;
}
@end

@body
	totalColor *= getEnvMapTotalColor(inDir);
@end
