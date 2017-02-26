import { Material } from "./Material";
import { Shader } from "../renderer/shader/shader/Shader";
import { QuadCommand } from "../renderer/command/QuadCommand";
export declare class ShaderManager {
    static create(material: Material): ShaderManager;
    constructor(material: Material);
    readonly shader: Shader;
    private _material;
    private _mainShader;
    setShader(shader: Shader): void;
    init(): void;
    dispose(): void;
    update(quadCmd: QuadCommand): void;
}
