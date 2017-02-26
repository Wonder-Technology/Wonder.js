import { Shader } from "../shader/Shader";
import { Program } from "../../program/Program";
import { RenderCommand } from "../../command/RenderCommand";
import { Material } from "../../../material/Material";
export declare abstract class ShaderLib {
    shader: Shader;
    sendShaderVariables(program: Program, cmd: RenderCommand, material: Material): void;
    init(): void;
    dispose(): void;
}
