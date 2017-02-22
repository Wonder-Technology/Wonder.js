import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { QuadCommand } from "../../../command/QuadCommand";
import { StandardBasicMaterial } from "../../../../material/StandardBasicMaterial";

@registerClass("EndBasicShaderLib")
export class EndBasicShaderLib extends EngineShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public type: string = "end_basic";

    public setShaderDefinition(cmd: QuadCommand, material: StandardBasicMaterial) {
        super.setShaderDefinition(cmd, material);

        if (material.alphaTest !== null) {
            this.fsSourceBody += `if (gl_FragColor.a < ${material.alphaTest}){
    discard;
}\n`;
        }
    }
}