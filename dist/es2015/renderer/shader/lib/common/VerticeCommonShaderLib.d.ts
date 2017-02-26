import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { EngineMaterial } from "../../../../material/EngineMaterial";
import { GLSLChunk } from "../../chunk/ShaderChunk";
export declare class VerticeCommonShaderLib extends EngineShaderLib {
    static create(): VerticeCommonShaderLib;
    vsChunk: GLSLChunk;
    fsChunk: GLSLChunk;
    sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial): void;
    setShaderDefinition(cmd: QuadCommand, material: EngineMaterial): void;
    private _sendAttributeVariables(program, cmd);
}
