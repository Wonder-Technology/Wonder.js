import { sendAttributeData as sendAttributeDataUtils } from "../utils/worker/render_file/render/renderUtils";
import { getVertices, getNormals, getTexCoords } from "../../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../utils/worker/render_file/shader/location/locationUtils";
import { sendBuffer } from "../../shader/glslSender/GLSLSenderSystem";
import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { clear, getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { render as frontRender } from "./light/front/FrontRenderSystem";
import { DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { IMaterialConfig } from "../../data/material_config_interface";
import { IShaderLibGenerator } from "../../data/shaderLib_generator_interface";
import { render as basicRender } from "./basic/BasicRenderSystem";

export var render = curry((state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, {
    cameraData,
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap,
        gl = getGL(DeviceManagerDataFromSystem, state);

    clear(gl, DeviceManagerDataFromSystem);

    if(basicData.count > 0){
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }

    if(lightData.count > 0){
        frontRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData, cameraData);
    }
})

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);
