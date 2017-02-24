import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { BasicMaterial } from "../../../../material/BasicMaterial";
import { setPos_mvp } from "../../snippet/ShaderSnippet";
import { GLSLChunk } from "../../chunk/ShaderChunk";

@registerClass("BasicShaderLib")
export class BasicShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public vsChunk: GLSLChunk = null;
    public fsChunk: GLSLChunk = null;

    public sendShaderVariables(program: Program, cmd: QuadCommand, material: BasicMaterial) {
        this.sendUniformData(program, "u_opacity", material.opacity);
    }

    public setShaderDefinition(cmd: QuadCommand, material: BasicMaterial) {
        super.setShaderDefinition(cmd, material);

        this.addUniformVariable(["u_opacity"]);

        this.vsSourceBody = setPos_mvp;
    }
}