import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { EngineMaterial } from "../../../../material/EngineMaterial";
import { ArrayBuffer } from "../../../buffer/ArrayBuffer";
import { EBufferDataType } from "../../../buffer/EBufferDataType";

@registerClass("VerticeCommonShaderLib")
export class VerticeCommonShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public type: string = "vertice_common";

    public sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial) {
        this._sendAttributeVariables(program, cmd);
    }

    public setShaderDefinition(cmd: QuadCommand, material: EngineMaterial) {
        super.setShaderDefinition(cmd, material);

        this.addAttributeVariable(["a_position"]);
    }

    private _sendAttributeVariables(program: Program, cmd: QuadCommand) {
        var verticeBuffer = <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.VERTICE);

        if (!verticeBuffer) {
            return;
        }

        this.sendAttributeBuffer(program, "a_position", verticeBuffer);
    }
}