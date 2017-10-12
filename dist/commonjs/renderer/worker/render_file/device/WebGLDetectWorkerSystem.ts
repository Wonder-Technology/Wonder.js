import { EWebGLVersion } from "../../../enum/EWebGLVersion";
import { isWebgl1 as isWebgl1Utils, isWebgl2 as isWebgl2Utils } from "../../../utils/worker/render_file/device/webglDetectUtils";

export const setVersion = (version: EWebGLVersion, WebGLDetectWorkerData: any) => {
    WebGLDetectWorkerData.version = version;
}

export const isWebgl1 = isWebgl1Utils;

export const isWebgl2 = isWebgl2Utils;
