export const webgl1_main_begin: string = "void main(void){\n";
export const webgl1_main_end: string = "}\n";

export const webgl1_setPos_mvp: string = "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"
