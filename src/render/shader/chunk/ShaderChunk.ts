/// <reference path="../../../definitions.d.ts"/>
module dy.render{
export class ShaderChunk{public static basic_fragment:string = "precision mediump float;\nvarying vec4 v_color;\nvoid main(void){\n    gl_FragColor = v_color;\n}\n\n";
public static basic_vertex:string = "uniform mat4 u_mMatrix;\nuniform mat4 u_vMatrix;\nuniform mat4 u_pMatrix;\nvarying vec4 v_color;\n\nvoid main(void){\n    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;\n    v_color = a_color;\n}\n\n";
}
}