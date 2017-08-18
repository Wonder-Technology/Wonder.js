import { GetArrayBufferDataFuncMap } from "../../../../../../definition/type/geometryType";
import { getOrCreateBuffer } from "../../../../../utils/buffer/arrayBufferUtils";
import { Log } from "../../../../../../utils/Log";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { clear } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindFrameUboData, init as initUbo } from "../ubo/uboManagerUtils";
import { Map } from "immutable";
import { hasExtensionColorBufferFloat } from "../device/gpuDetectUtils";
import { init as initDefer } from "./light/defer/deferShadingUtils";

export var init = (gl:any, render_config:IRenderConfig, DataBufferConfig:any, GBufferDataFromSystem:any, DeferLightPassDataFromSystem: any, ShaderDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem:any) => {
    if(!hasExtensionColorBufferFloat(GPUDetectDataFromSystem)){
        Log.warn("defer shading need support extensionColorBufferFloat extension");
    }
    else{
        initDefer(gl, DataBufferConfig, GBufferDataFromSystem, DeferLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    initUbo(gl, render_config, GLSLSenderDataFromSystem);
}

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, basicRender:Function, deferRender:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, {
    cameraData,
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem,
            GLSLSenderDataFromSystem
        } = drawDataMap;

    clear(gl, DeviceManagerDataFromSystem);

    bindFrameUboData(gl, render_config, cameraData, GLSLSenderDataFromSystem);

    if(basicData.count > 0){
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }

    if(lightData.count > 0){
        deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, lightData, cameraData);
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex],
        attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex],
        lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;

    for (let sendData of sendDataArr) {
        let bufferName = sendData.buffer,
            buffer = _getOrCreateArrayBuffer(gl, geometryIndex, bufferName, getArrayBufferDataFuncMap, GeometryDataFromSystem, ArrayBufferDataFromSystem),
            pos: number = null;

        if (lastBindedArrayBuffer === buffer) {
            continue;
        }

        pos = getAttribLocation(gl, program, sendData.name, attributeLocationMap);

        if (isAttributeLocationNotExist(pos)) {
            continue;
        }

        lastBindedArrayBuffer = buffer;

        sendBuffer(gl, sendData.type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferDataFromSystem);
    }

    ProgramDataFromSystem.lastBindedArrayBuffer = lastBindedArrayBuffer;
}

var _getOrCreateArrayBuffer = (gl: WebGLRenderingContext, geometryIndex: number, bufferName: string, {
    getVertices,
    getNormals,
    getTexCoords
}, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var buffer: WebGLBuffer = null;

    switch (bufferName) {
        case "vertex":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffer, getVertices, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "normal":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "texCoord":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID(`bufferName:${bufferName}`));
            break;
    }

    return buffer;
}
