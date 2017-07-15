import { initData as initDeviceManagerWorkerDataSystem } from "../renderer/worker/both_file/device/DeviceManagerWorkerSystem";
import { initData as initProgramWorkerDataSystem } from "../renderer/worker/render_file/shader/program/ProgramWorkerSystem";
import { initData as initLightWorkerDataSystem } from "../renderer/worker/render_file/light/LightWorkerSystem";
import { initData as initDrawRenderCommandBufferWorkerDataSystem } from "../renderer/worker/render_file/draw/DrawRenderCommandBufferWorkerSystem";
import { initData as initGLSLSenderWorkerDataSystem } from "../renderer/worker/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initLocationWorkerDataSystem } from "../renderer/worker/render_file/shader/location/LocationWorkerSystem";
import {
    getDirectionLightPosition,
    getPointLightPosition
} from "../renderer/worker/render_file/shader/ShaderWorkerSystem";

export var initDeviceManagerWorkerData = initDeviceManagerWorkerDataSystem;

export var initProgramWorkerData = initProgramWorkerDataSystem;

export var initGLSLSenderWorkerData = initGLSLSenderWorkerDataSystem;

export var initLocationWorkerData = initLocationWorkerDataSystem;

export var initLightWorkerData = initLightWorkerDataSystem;

export var initDrawRenderCommandBufferWorkerData = initDrawRenderCommandBufferWorkerDataSystem;

export var getDirectionLightPositionInShaderWorker = getDirectionLightPosition;

export var getPointLightPositionInShaderWorker = getPointLightPosition;
