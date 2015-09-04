attribute vec4 a_position;
uniform mat4 u_mMatrix;
uniform mat4 u_vMatrix;
uniform mat4 u_pMatrix;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
uniform vec4 u_sourceRegion;
uniform vec4 u_repeatRegion;

void main(void){
    //gl_Position = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * a_position;
    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;

    vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;
    v_texCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;
}

