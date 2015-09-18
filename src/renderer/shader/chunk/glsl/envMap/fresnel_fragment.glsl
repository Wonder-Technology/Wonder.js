@funcDefine
float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){
    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);
    float fresnelPower = 5.0;

    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);

    return ratio / 100.0;
}
@end

@body
    vec3 normal = normalize(v_normal);

    vec3 reflectDir = reflect(inDir, normal);
    vec3 refractDir = refract(inDir, normal, u_refractionRatio);

    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);
    vec4 refractColor = textureCube(u_samplerCube0, refractDir);

	if(u_reflectivity != -1.0){
        gl_FragColor = mix(reflectColor, refractColor, u_reflectivity);
	}
	else{
        gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));
	}

@end
