import { EWebGLVersion } from "../../../enum/EWebGLVersion";
import { isWebgl1 as isWebgl1Utils, isWebgl2 as isWebgl2Utils } from "../../../utils/worker/render_file/device/webglDetectUtils";

export var setVersion = (version: EWebGLVersion, WebGLDetectWorkerData: any) => {
    WebGLDetectWorkerData.version = version;
}

export var isWebgl1 = isWebgl1Utils;

export var isWebgl2 = isWebgl2Utils;
