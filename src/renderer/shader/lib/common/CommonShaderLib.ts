import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { Program } from "../../../program/Program";
import { QuadCommand } from "../../../command/QuadCommand";
import { EngineMaterial } from "../../../../material/EngineMaterial";
import { common_vertex, common_fragment, GLSLChunk, common_define, common_function } from "../../chunk/ShaderChunk";

@registerClass("CommonShaderLib")
export class CommonShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public vsChunk: GLSLChunk = common_vertex;
    public fsChunk: GLSLChunk = common_fragment;

    public sendShaderVariables(program: Program, cmd: QuadCommand, material: EngineMaterial) {
        this.sendUniformData(program, "u_vMatrix", cmd.vMatrix);
        this.sendUniformData(program, "u_pMatrix", cmd.pMatrix);
        this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
    }

    public setShaderDefinition(cmd: QuadCommand, material: EngineMaterial) {
        super.setShaderDefinition(cmd, material);

        //todo use VariableLib.xxx?
        // this.addUniformVariable(["u_vMatrix", "u_pMatrix"]);
        this.addUniformVariable(["u_vMatrix", "u_pMatrix", "u_mMatrix"]);

        this.vsSourceDefine = common_define.define + common_vertex.define;
        this.vsSourceFuncDefine = common_function.funcDefine + common_vertex.funcDefine;

        this.fsSourceDefine = common_define.define + common_fragment.define;
        this.fsSourceFuncDefine = common_function.funcDefine + common_fragment.funcDefine;
    }
}