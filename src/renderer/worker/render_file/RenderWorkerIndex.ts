import { onerrorHandler, onmessageHandler } from "./RenderWorkerSystem";
import { initData as initProgramWorkerData } from "./shader/program/ProgramWorkerSystem";
import { initData as initLocationWorkerData } from "./shader/location/LocationWorkerSystem";
import { initData as initGLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initArrayBufferData } from "./buffer/ArrayBufferWorkerSystem";
import { initData as initIndexBufferData } from "./buffer/IndexBufferWorkerSystem";
import { initData as initDrawRenderCommandWorkerData } from "./draw/DrawRenderCommandWorkerSystem";
import { ProgramWorkerData } from "./shader/program/ProgramWorkerData";
import { LocationWorkerData } from "./shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerData";
import { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
import { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
import { DrawRenderCommandWorkerData } from "./draw/DrawRenderCommandWorkerData";

onerror = (msg: string, fileName: string, lineno: number) => {
    onerrorHandler(msg, fileName, lineno);
}

onmessage = (e) => {
    onmessageHandler(e);
};


//todo do when init to accelerate
initProgramWorkerData(ProgramWorkerData);

initLocationWorkerData(LocationWorkerData);

initGLSLSenderWorkerData(GLSLSenderWorkerData);

initArrayBufferData(ArrayBufferWorkerData);

initIndexBufferData(IndexBufferWorkerData);

initDrawRenderCommandWorkerData(DrawRenderCommandWorkerData);

/*!
export for unit test
 */
export { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
export { GPUDetector } from "../../device/GPUDetector";
