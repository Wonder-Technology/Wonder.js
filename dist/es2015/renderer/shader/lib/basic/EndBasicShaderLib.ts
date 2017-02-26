import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { QuadCommand } from "../../../command/QuadCommand";
import { StandardBasicMaterial } from "../../../../material/StandardBasicMaterial";
import { GLSLChunk, end_basic_fragment } from "../../chunk/ShaderChunk";

@registerClass("EndBasicShaderLib")
export class EndBasicShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public vsChunk: GLSLChunk = null;
    public fsChunk: GLSLChunk = end_basic_fragment;

    public setShaderDefinition(cmd: QuadCommand, material: StandardBasicMaterial) {
        super.setShaderDefinition(cmd, material);

        if (material.alphaTest !== null) {
            this.fsSourceBody += `if (gl_FragColor.a < ${material.alphaTest}){
    discard;
}\n`;
        }
    }
}