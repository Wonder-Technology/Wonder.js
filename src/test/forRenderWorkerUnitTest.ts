import { initData as initDeviceManagerWorkerDataSystem } from "../renderer/worker/both_file/device/DeviceManagerWorkerSystem";
import { initData as initProgramWorkerDataSystem } from "../renderer/worker/render_file/shader/program/ProgramWorkerSystem";
import { initData as initDrawRenderCommandBufferWorkerDataSystem } from "../renderer/worker/render_file/draw/DrawRenderCommandBufferWorkerSystem";
// import { initData as initGLSLSenderWorkerDataSystem } from "../renderer/worker/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initLocationWorkerDataSystem } from "../renderer/worker/render_file/shader/location/LocationWorkerSystem";
import {
   initData as initShaderWorkerDataSystem
} from "../renderer/worker/render_file/shader/ShaderWorkerSystem";
import { update } from "../renderer/worker/render_file/texture/TextureWorkerSystem";
import { initData as initWebGL1LightWorkerDataSystem } from "../renderer/worker/webgl1/render_file/light/LightWorkerSystem";
import { initData as initWebGL2LightWorkerDataSystem } from "../renderer/worker/webgl2/render_file/light/LightWorkerSystem";
import {
   getDirectionLightPosition,
   getPointLightPosition
} from "../renderer/worker/render_file/render/RenderWorkerSystem";
import { initData as initWebGL1GLSLSenderWorkerDataSystem } from "../renderer/worker/webgl1/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initWebGL2GLSLSenderWorkerDataSystem } from "../renderer/worker/webgl2/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initArrayBufferWorkerDataSystem } from "../renderer/worker/render_file/buffer/ArrayBufferWorkerSystem";
import { initData as initIndexBufferWorkerDataSystem } from "../renderer/worker/render_file/buffer/IndexBufferWorkerSystem";
import { initData as initVaoWorkerDataSystem } from "../renderer/worker/render_file/vao/VaoWorkerSystem";

export var initDeviceManagerWorkerData = initDeviceManagerWorkerDataSystem;

export var initProgramWorkerData = initProgramWorkerDataSystem;

export var initWebGL1GLSLSenderWorkerData = initWebGL1GLSLSenderWorkerDataSystem;

export var initWebGL2GLSLSenderWorkerData = initWebGL2GLSLSenderWorkerDataSystem;

export var initLocationWorkerData = initLocationWorkerDataSystem;

export var initShaderWorkerData = initShaderWorkerDataSystem;

export var initWebGL1LightWorkerData = initWebGL1LightWorkerDataSystem;

export var initWebGL2LightWorkerData = initWebGL2LightWorkerDataSystem;

export var initDrawRenderCommandBufferWorkerData = initDrawRenderCommandBufferWorkerDataSystem;

export var initArrayBufferWorkerData = initArrayBufferWorkerDataSystem;

export var initIndexBufferWorkerData = initIndexBufferWorkerDataSystem;

export var initVaoWorkerData = initVaoWorkerDataSystem;

export var getDirectionLightPositionInShaderWorker = getDirectionLightPosition;

export var getPointLightPositionInShaderWorker = getPointLightPosition;

export var updateTextureWorker = update;
