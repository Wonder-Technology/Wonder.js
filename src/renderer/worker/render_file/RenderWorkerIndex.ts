import { onerrorHandler, onmessageHandler } from "./RenderWorkerSystem";

onerror = (msg: string, fileName: string, lineno: number) => {
    onerrorHandler(msg, fileName, lineno);
}

onmessage = (e) => {
    onmessageHandler(e);
};

/*!
export for unit test
 */
export { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
export { GPUDetector } from "../../device/GPUDetector";
export { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
export { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
export { DataBufferConfig } from "../../../config/DataBufferConfig";
export { GeometryWorkerData } from "./geometry/GeometryWorkerData";
export { ProgramWorkerData } from "./shader/program/ProgramWorkerData";
export { ERenderWorkerState } from "../both_file/ERenderWorkerState";

