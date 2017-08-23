import { WebGLVertexArrayObject } from "../../../../../../extend/interface";
import { ScissorRegionArrayCacheMap } from "../../../../../type/utilsType";
export declare abstract class DeferPointLightPassDataCommon {
    static fullScreenQuadVertexArray: WebGLVertexArrayObject;
    static fullScreenQuadIndicesCount: number;
    static scissorRegionArrayCacheMap: ScissorRegionArrayCacheMap;
}
