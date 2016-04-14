@funcDefine
float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){
    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);
    float fresnelPower = 5.0;

    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);

    return ratio / 100.0;
}
vec4 getEnvMapTotalColor(vec3 inDir, vec3 normal){
    vec3 reflectDir = reflect(inDir, normal);
    vec3 refractDir = refract(inDir, normal, u_refractionRatio);

    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);
    vec4 refractColor = textureCube(u_samplerCube0, refractDir);

    vec4 totalColor = vec4(0.0);

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
if(!isRenderListEmpty(u_isRenderListEmpty)){
    totalColor *= getEnvMapTotalColor(inDir, normalize(v_normal));
}
@end
