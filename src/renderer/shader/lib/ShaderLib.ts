import { Shader } from "../shader/Shader";
import { virtual } from "../../../definition/typescript/decorator/virtual";
import { Program } from "../../program/Program";
import { RenderCommand } from "../../command/RenderCommand";
import { Material } from "../../../material/Material";

export abstract class ShaderLib {
    public shader: Shader = null;

    @virtual
    public sendShaderVariables(program: Program, cmd: RenderCommand, material: Material) {
    }

    @virtual
    public init() {
    }

    @virtual
    public dispose() {
    }
}