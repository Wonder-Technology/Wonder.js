attribute vec4 a_position;
uniform mat4 u_mMatrix;
uniform mat4 u_vMatrix;
uniform mat4 u_pMatrix;
attribute float a_data1; //for test
attribute vec3 a_data2; //for test

void main(void){
    float a1 = a_data1;
    vec3 a2 = a_data2;

    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;
}

