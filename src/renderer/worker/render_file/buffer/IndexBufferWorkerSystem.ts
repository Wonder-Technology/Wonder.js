import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../../../utils/buffer/indexBufferUtils";
import { getIndices } from "../geometry/GeometryWorkerSystem";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryWorkerData, IndexBufferWorkerData);
}

export var initData = initDataUtils;
