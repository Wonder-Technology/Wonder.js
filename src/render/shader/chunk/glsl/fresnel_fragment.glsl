precision mediump float;

uniform samplerCube u_sampler0;
uniform float u_refractionRatio;
uniform vec3 u_cameraPos;

varying vec3 v_normal;
varying vec3 v_position;

float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){
    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);
    float fresnelPower = 5.0;

    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);

    return ratio / 100.0;
}

void main(void){
    vec3 inDir = normalize(v_position - u_cameraPos);
    vec3 normal = normalize(v_normal);

    vec3 reflectDir = reflect(inDir, normal);
    vec3 refractDir = refract(inDir, normal, u_refractionRatio);

    vec4 reflectColor = textureCube(u_sampler0, reflectDir);
    vec4 refractColor = textureCube(u_sampler0, refractDir);

    gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));
}

