attribute vec4 a_position;
uniform mat4 mvpMatrix;
attribute vec4 a_color;
varying vec4 v_color;

void main(void){
    gl_Position = mvpMatrix * a_position;
    v_color = a_color;
}

