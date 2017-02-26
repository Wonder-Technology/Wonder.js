import { EngineShaderLib } from "../EngineShaderLib";
import { QuadCommand } from "../../../command/QuadCommand";
import { StandardBasicMaterial } from "../../../../material/StandardBasicMaterial";
import { GLSLChunk } from "../../chunk/ShaderChunk";
export declare class EndBasicShaderLib extends EngineShaderLib {
    static create(): EndBasicShaderLib;
    vsChunk: GLSLChunk;
    fsChunk: GLSLChunk;
    setShaderDefinition(cmd: QuadCommand, material: StandardBasicMaterial): void;
}
