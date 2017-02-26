import { Material } from "./Material";
import { Shader } from "../renderer/shader/shader/Shader";
export declare abstract class EngineMaterial extends Material {
    init(): void;
    protected addShaderLib(): void;
    protected createShader(): Shader;
    private _addTopShaderLib();
    private _addShaderLibToTop(lib);
    private _addEndShaderLib();
}
