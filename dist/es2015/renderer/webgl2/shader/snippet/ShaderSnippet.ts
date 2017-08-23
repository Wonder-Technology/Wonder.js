export const webgl2_main_begin: string = "void main(void){\n";
export const webgl2_main_end: string = "}\n";

export const webgl2_setPos_mvp: string = "gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * mMatrix * vec4(a_position, 1.0);\n"
