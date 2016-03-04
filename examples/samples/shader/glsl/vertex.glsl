precision highp float;

attribute vec3 a_position;
attribute vec3 a_color;
attribute vec2 a_texCoord;

uniform mat4 u_mvpMatrix;

varying vec3 v_color;
varying vec2 v_texCoord;


void main(void) {
    v_color = a_color;
    v_texCoord = a_texCoord;

    gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
}

