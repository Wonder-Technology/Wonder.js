export const main_begin: string = "void main(void){\n";
export const main_end: string = "}\n";

// export const setPos_mvp: string = "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"
export const setPos_mvp: string = "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n"
