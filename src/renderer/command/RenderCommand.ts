import { Matrix4 } from "../../math/Matrix4";
import { EDrawMode } from "../enum/EDrawMode";

export class RenderCommand{
    public materialIndex:number = null;
    public shaderIndex:number = null;
    public geometryIndex:number = null;

    public mMatrix:Matrix4 = null;
    public vMatrix:Matrix4 = null;
    public pMatrix:Matrix4 = null;
    public drawMode:EDrawMode = null;
}