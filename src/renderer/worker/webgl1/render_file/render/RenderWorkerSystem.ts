import { render as frontRender } from "./light/front/FrontRenderWorkerSystem";
import { getNormals, getTexCoords, getVertices } from "../../../render_file/geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../../../../webgl1/utils/shader/location/locationUtils";
import { sendBuffer } from "../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { sendAttributeData as sendAttributeDataUtils } from "../../../../webgl1/utils/render/renderUtils";
import { Map } from "immutable";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { render as basicRender } from "./basic/BasicRenderWorkerSystem";
import { clear } from "../../../both_file/device/DeviceManagerWorkerSystem";

//todo refactor
export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, {
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap;

    clear(gl, DeviceManagerDataFromSystem);

    if(basicData.count > 0){
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData);
    }

    if(lightData.count > 0){
        frontRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, lightData);
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);


