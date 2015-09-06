precision mediump float;

uniform samplerCube u_sampler0;

varying vec3 v_reflectDir;
varying vec3 v_refractDir;
varying float v_ratio;



void main(void){
    vec4 reflectColor = textureCube(u_sampler0, v_reflectDir);
    vec4 refractColor = textureCube(u_sampler0, v_refractDir);

    gl_FragColor = mix(reflectColor, refractColor, v_ratio);
}

