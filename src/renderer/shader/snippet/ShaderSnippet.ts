export const main_begin: string = "void main(void){\n";
export const main_end: string = "}\n";

export const setPos_mvp: string = "gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * mMatrix * vec4(a_position, 1.0);\n"
