import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { EngineShader } from "./EngineShader";
import { QuadCommand } from "../../command/QuadCommand";
import { Material } from "../../../material/Material";
import { EngineShaderLib } from "../lib/EngineShaderLib";

@registerClass("CommonShader")
export class CommonShader extends EngineShader {
    public static create() {
        var obj = new this();

        return obj;
    }

    public update(cmd: QuadCommand, material: Material) {
        var program = null;

        this.judgeRefreshShader(cmd, material);

        program = this.program;

        program.use();

        this.libs.forEach((lib: EngineShaderLib) => {
            lib.sendShaderVariables(program, cmd, material);
        });

        // this.mapManager.bindAndUpdate();
        // this.mapManager.sendData(program);
    }
}