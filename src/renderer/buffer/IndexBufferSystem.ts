import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../utils/buffer/indexBufferUtils";
import { getIndices } from "../../component/geometry/GeometrySystem";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, GeometryData: any, IndexBufferData: any) => {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryData, IndexBufferData);
}

export var initData = initDataUtils;
