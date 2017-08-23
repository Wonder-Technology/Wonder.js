import { WebGLVertexArrayObject } from "../../../../../../extend/interface";
import { ScissorRegionArrayCacheMap } from "../../../../../type/utilsType";

export abstract class DeferPointLightPassDataCommon {
    public static fullScreenQuadVertexArray: WebGLVertexArrayObject = null;
    public static fullScreenQuadIndicesCount: number = null;
    public static scissorRegionArrayCacheMap: ScissorRegionArrayCacheMap = null;
}
