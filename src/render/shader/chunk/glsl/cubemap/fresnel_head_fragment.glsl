uniform float u_refractionRatio;

float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){
    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);
    float fresnelPower = 5.0;

    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);

    return ratio / 100.0;
}
