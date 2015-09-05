attribute vec4 a_position;
uniform mat4 u_mMatrix;
uniform mat4 u_vMatrix;
uniform mat4 u_pMatrix;
varying vec3 v_texCoord;

void main(void){
    vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * a_position;
    gl_Position = pos.xyww;

    v_texCoord = vec3(a_position);
}

