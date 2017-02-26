import { EngineMaterial } from "./EngineMaterial";
export declare abstract class StandardBasicMaterial extends EngineMaterial {
    opacity: number;
    alphaTest: number;
    protected addExtendShaderLib(): void;
    protected addShaderLib(): void;
}
