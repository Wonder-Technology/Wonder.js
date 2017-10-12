import {
    initData as initDeviceManagerWorkerDataSystem
} from "../renderer/worker/both_file/device/DeviceManagerWorkerSystem";
import { initData as initProgramWorkerDataSystem } from "../renderer/worker/render_file/shader/program/ProgramWorkerSystem";
import { initData as initDrawRenderCommandBufferWorkerDataSystem } from "../renderer/worker/render_file/draw/DrawRenderCommandBufferWorkerSystem";
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
import { initData as initWebGL1LocationWorkerDataSystem } from "../renderer/worker/webgl1/render_file/shader/location/LocationWorkerSystem";
import { initData as initWebGL2LocationWorkerDataSystem } from "../renderer/worker/webgl2/render_file/shader/location/LocationWorkerSystem";
import { initData as initWebGL1ShaderWorkerDataSystem } from "../renderer/worker/webgl1/render_file/shader/ShaderWorkerSystem";
import { initData as initWebGL2ShaderWorkerDataSystem } from "../renderer/worker/webgl2/render_file/shader/ShaderWorkerSystem";
import { initDataWhenInitGL as initWorkerDataWhenInitGLSystem } from "../renderer/worker/render_file/RenderWorkerSystem";
import { Map } from "immutable";
import { initData } from "../core/DirectorSystem";

export const initDeviceManagerWorkerData = initDeviceManagerWorkerDataSystem;

export const initProgramWorkerData = initProgramWorkerDataSystem;

export const initWebGL1GLSLSenderWorkerData = initWebGL1GLSLSenderWorkerDataSystem;

export const initWebGL2GLSLSenderWorkerData = initWebGL2GLSLSenderWorkerDataSystem;

export const initWebGL1LocationWorkerData = initWebGL1LocationWorkerDataSystem;

export const initWebGL2LocationWorkerData = initWebGL2LocationWorkerDataSystem;

export const initWebGL1ShaderWorkerData = initWebGL1ShaderWorkerDataSystem;

export const initWebGL2ShaderWorkerData = initWebGL2ShaderWorkerDataSystem;

export const initWebGL1LightWorkerData = initWebGL1LightWorkerDataSystem;

export const initWebGL2LightWorkerData = initWebGL2LightWorkerDataSystem;

export const initDrawRenderCommandBufferWorkerData = initDrawRenderCommandBufferWorkerDataSystem;

export const initArrayBufferWorkerData = initArrayBufferWorkerDataSystem;

export const initIndexBufferWorkerData = initIndexBufferWorkerDataSystem;

export const initVaoWorkerData = initVaoWorkerDataSystem;

export const initWorkerDataWhenInitGL = initWorkerDataWhenInitGLSystem;

export const getDirectionLightPositionInShaderWorker = getDirectionLightPosition;

export const getPointLightPositionInShaderWorker = getPointLightPosition;

export const updateTextureWorker = update;
