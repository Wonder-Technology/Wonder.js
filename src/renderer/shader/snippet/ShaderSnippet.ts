/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class ShaderSnippet {
        public static main_begin:string = "void main(void){\n";
        public static main_end:string = "}\n";

        public static setPos_mvp:string = "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;\n"
    }
}
