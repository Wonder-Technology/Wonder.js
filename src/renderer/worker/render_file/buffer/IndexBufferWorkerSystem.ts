import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../../../utils/buffer/indexBufferUtils";
import { getIndices } from "../geometry/GeometryWorkerSystem";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import { disposeBuffer as disposeBufferUtils } from "../../../utils/worker/render_file/buffer/bufferUtils";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryWorkerData, IndexBufferWorkerData);
}

export var disposeBuffer = (geometryIndex: number, IndexBufferWorkerData: any) => {
    disposeBufferUtils(geometryIndex, IndexBufferWorkerData.buffers, getGL, DeviceManagerWorkerData);
}

export var initData = initDataUtils;
