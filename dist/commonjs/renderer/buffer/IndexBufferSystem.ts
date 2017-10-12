import { initData as initDataUtils } from "../utils/buffer/indexBufferUtils";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { disposeBuffer as disposeBufferUtils } from "../utils/worker/render_file/buffer/bufferUtils";

export const initData = initDataUtils;

export const disposeBuffer = (geometryIndex: number, IndexBufferData: any) => {
    disposeBufferUtils(geometryIndex, IndexBufferData.buffers, getGL, DeviceManagerData);
}
