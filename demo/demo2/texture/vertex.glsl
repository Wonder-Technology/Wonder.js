attribute vec4 a_position;
uniform mat4 u_mvpMatrix;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
uniform vec4 u_repeatRegion;

void main(void){
    gl_Position = u_mvpMatrix * a_position;
    v_texCoord = a_texCoord * u_repeatRegion.zw + u_repeatRegion.xy;
}

