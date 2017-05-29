import { Matrix4 } from "../../math/Matrix4";
import { EDrawMode } from "../enum/EDrawMode";

export class RenderCommand {
    public materialIndex: number = null;
    public shaderIndex: number = null;
    public geometryIndex: number = null;

    public mMatrix: Float32Array = null;
    public vMatrix: Float32Array = null;
    public pMatrix: Float32Array = null;
    public drawMode: EDrawMode = null;
}