import { EngineShader } from "./EngineShader";
import { QuadCommand } from "../../command/QuadCommand";
import { Material } from "../../../material/Material";
export declare class CommonShader extends EngineShader {
    static create(): CommonShader;
    update(cmd: QuadCommand, material: Material): void;
}
