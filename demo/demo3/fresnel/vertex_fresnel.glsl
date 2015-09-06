attribute vec4 a_position;
attribute vec4 a_normal;
uniform mat4 u_mMatrix;
uniform mat4 u_vMatrix;
uniform mat4 u_pMatrix;
uniform mat4 u_normalMatrix;

uniform vec3 u_cameraPos;
uniform float u_refractionRatio;

varying vec3 v_reflectDir;
varying vec3 v_refractDir;
varying float v_ratio;



float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRation){
    float f = pow(1.0 - refractionRation, 2.0) / pow(1.0 + refractionRation, 2.0);
    float fresnelPower = 5.0;

    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);

    return ratio / 100.0;
}


void main(void){
    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;

    vec3 worldPosition = vec3(u_mMatrix * a_position);
    vec3 inDir = normalize(worldPosition - u_cameraPos);
    vec3 normal = normalize(vec3(u_normalMatrix * a_normal));

    v_reflectDir = reflect(inDir, normal);
    v_refractDir = refract(inDir, normal, u_refractionRatio);
    v_ratio = computeFresnelRatio(inDir, normal, u_refractionRatio);
}
