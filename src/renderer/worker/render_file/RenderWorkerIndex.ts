import { onerrorHandler, onmessageHandler } from "./RenderWorkerSystem";

onerror = (msg: string, fileName: string, lineno: number) => {
    onerrorHandler(msg, fileName, lineno);
};

onmessage = (e) => {
    onmessageHandler(e);
};

/*!
export for unit test
 */
export { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
export { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
export { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
export { DataBufferConfig } from "../../../config/DataBufferConfig";
export { GeometryWorkerData } from "./geometry/GeometryWorkerData";
export { ProgramWorkerData } from "./shader/program/ProgramWorkerData";
export { GLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerData";
export { LocationWorkerData } from "./shader/location/LocationWorkerData";
export { ShaderWorkerData } from "./shader/ShaderWorkerData";
export { AmbientLightWorkerData } from "./light/AmbientLightWorkerData";
export { DirectionLightWorkerData } from "./light/DirectionLightWorkerData";
export { DrawRenderCommandBufferWorkerData } from "./draw/DrawRenderCommandBufferWorkerData";
export { ERenderWorkerState } from "../both_file/ERenderWorkerState";
export { InitConfigWorkerData } from "./config/InitConfigWorkerData";
export { TextureWorkerData } from "./texture/TextureWorkerData";
export { LightMaterialWorkerData } from "./material/LightMaterialWorkerData";
export { WebGLDetectWorkerData } from "./device/WebGLDetectWorkerData";
export { WebGL1PointLightWorkerData } from "../webgl1/render_file/light/PointLightWorkerData";
export { WebGL2PointLightWorkerData } from "../webgl2/render_file/light/PointLightWorkerData";
export { GPUDetectWorkerData } from "./device/GPUDetectWorkerData";
