import { Color } from "../structure/Color";
import { Geometry } from "../component/geometry/Geometry";
import { QuadCommand } from "../renderer/command/QuadCommand";
import { Shader } from "../renderer/shader/shader/Shader";
import { Program } from "../renderer/program/Program";
export declare abstract class Material {
    readonly program: Program;
    private _color;
    color: Color;
    readonly shader: Shader;
    geometry: Geometry;
    private _shaderManager;
    clone(): this;
    initWhenCreate(): void;
    init(): void;
    dispose(): void;
    updateShader(quadCmd: QuadCommand): void;
    protected abstract createShader(): Shader;
}
