import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../utils/buffer/indexBufferUtils";
import { getIndices } from "../../component/geometry/GeometrySystem";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { disposeBuffer as disposeBufferUtils } from "../utils/worker/render_file/buffer/bufferUtils";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, GeometryData: any, IndexBufferData: any) => {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryData, IndexBufferData);
}

export var initData = initDataUtils;

export var disposeBuffer = (geometryIndex: number, IndexBufferData: any) => {
    disposeBufferUtils(geometryIndex, IndexBufferData.buffers, getGL, DeviceManagerData);
}
