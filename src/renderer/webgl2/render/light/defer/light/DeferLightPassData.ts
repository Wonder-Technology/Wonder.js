import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { ScissorRegionArrayCacheMap } from "../../../../type/utilsType";

export class DeferLightPassData{
    public static fullScreenQuadVertexArray:WebGLVertexArrayObject = null;
    public static fullScreenQuadIndicesCount:number = null;
    public static scissorRegionArrayCacheMap:ScissorRegionArrayCacheMap = null;
}

