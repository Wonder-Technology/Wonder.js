import { EDrawMode } from "../enum/EDrawMode";
export declare class RenderCommand {
    materialIndex: number;
    shaderIndex: number;
    geometryIndex: number;
    mMatrix: Float32Array;
    vMatrix: Float32Array;
    pMatrix: Float32Array;
    drawMode: EDrawMode;
}
