import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { EngineMaterial } from "../../../../material/EngineMaterial";
import { GLSLChunk, end_basic_fragment } from "../../chunk/ShaderChunk";

@registerClass("EndShaderLib")
export class EndShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public vsChunk: GLSLChunk = null;
    public fsChunk: GLSLChunk = end_basic_fragment;

    public sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial) {
        // program.sendAllBufferData(cmd.vaoManager);
        program.sendAllBufferData();
    }
}