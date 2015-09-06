precision mediump float;

uniform samplerCube u_sampler0;
varying vec3 v_texCoord;

void main(void){
    gl_FragColor = textureCube(u_sampler0, v_texCoord);
}

