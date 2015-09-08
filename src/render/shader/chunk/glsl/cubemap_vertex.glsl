uniform mat4 u_mMatrix;
uniform mat4 u_vMatrix;
uniform mat4 u_pMatrix;
uniform mat4 u_normalMatrix;

varying vec3 v_normal;
varying vec3 v_position;

void main(void){
    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;
    v_normal = vec3(u_normalMatrix * a_normal);
    v_position = vec3(u_mMatrix * a_position);
}

