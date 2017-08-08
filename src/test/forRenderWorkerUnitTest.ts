import { initData as initDeviceManagerWorkerDataSystem } from "../renderer/worker/both_file/device/DeviceManagerWorkerSystem";
import { initData as initProgramWorkerDataSystem } from "../renderer/worker/render_file/shader/program/ProgramWorkerSystem";
import { initData as initDrawRenderCommandBufferWorkerDataSystem } from "../renderer/worker/render_file/draw/DrawRenderCommandBufferWorkerSystem";
import { initData as initGLSLSenderWorkerDataSystem } from "../renderer/worker/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initLocationWorkerDataSystem } from "../renderer/worker/render_file/shader/location/LocationWorkerSystem";
import {
    getDirectionLightPosition,
    getPointLightPosition, initData as initShaderWorkerDataSystem
} from "../renderer/worker/render_file/shader/ShaderWorkerSystem";
import { update } from "../renderer/worker/render_file/texture/TextureWorkerSystem";

export var initDeviceManagerWorkerData = initDeviceManagerWorkerDataSystem;

export var initProgramWorkerData = initProgramWorkerDataSystem;

export var initGLSLSenderWorkerData = initGLSLSenderWorkerDataSystem;

export var initLocationWorkerData = initLocationWorkerDataSystem;

export var initShaderWorkerData = initShaderWorkerDataSystem;

export var initLightWorkerData = () => {
    //todo fix webgl1/webgl2 separate in render worker->unit test
}

export var initDrawRenderCommandBufferWorkerData = initDrawRenderCommandBufferWorkerDataSystem;

export var getDirectionLightPositionInShaderWorker = getDirectionLightPosition;

export var getPointLightPositionInShaderWorker = getPointLightPosition;

export var updateTextureWorker = update;
