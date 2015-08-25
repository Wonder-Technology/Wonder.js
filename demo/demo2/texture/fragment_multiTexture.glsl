precision mediump float;

uniform sampler2D u_sampler0;
uniform sampler2D u_sampler1;
varying vec2 v_texCoord;

void main(void){
    vec4 color0 = texture2D(u_sampler0, v_texCoord);
    vec4 color1 = texture2D(u_sampler1, v_texCoord);
    //gl_FragColor = color0 * color1;
    /*!
    The final output color is now the combination of two texture lookups. GLSL's built-in mix function takes two values as input and linearly interpolates between them based on its third argument. If the third value is 0.0 it returns the first input; if it's 1.0 it returns the second input value. A value of 0.2 will return 80% of the first input color and 20% of the second input color, resulting in a mixture of both our textures.
    */
    gl_FragColor = mix(color0, color1, 0.2);
}

