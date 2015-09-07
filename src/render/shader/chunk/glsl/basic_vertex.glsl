uniform mat4 u_mMatrix;
uniform mat4 u_vMatrix;
uniform mat4 u_pMatrix;

varying vec4 v_color;

void main(void){
    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;
    v_color = a_color;
}

