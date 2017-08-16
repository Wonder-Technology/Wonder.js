import { getNormals, getTexCoords, getVertices } from "../../../render_file/geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../../../../webgl1/utils/worker/render_file/shader/location/locationUtils";
import { sendBuffer } from "../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { sendAttributeData as sendAttributeDataUtils } from "../../../../webgl1/utils/worker/render_file/render/renderUtils";
import { Map } from "immutable";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { render as basicRender } from "./basic/BasicRenderWorkerSystem";
import { clear } from "../../../both_file/device/DeviceManagerWorkerSystem";
import { render as deferRender } from "../defer/DeferShadingWorkerSystem";

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, {
    cameraData,
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap;

    clear(gl, DeviceManagerDataFromSystem);

    if(basicData.count > 0){
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }

    if(lightData.count > 0){
        deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, lightData, cameraData);
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);


