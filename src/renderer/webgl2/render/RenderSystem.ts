import { sendAttributeData as sendAttributeDataUtils } from "../utils/render/renderUtils";
import { getVertices, getNormals, getTexCoords } from "../../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../utils/shader/location/locationUtils";
import { sendBuffer } from "../../shader/glslSender/GLSLSenderSystem";
import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { clear, getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
// import { draw as frontDraw } from "../render/light/front/FrontRenderSystem";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { IMaterialConfig } from "../../data/material_config";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { render as basicRender } from "./basic/BasicRenderSystem";
import { render as deferRender, init as deferInit} from "./light/defer/DeferShadingSystem";
import { hasExtensionColorBufferFloat } from "../device/GPUDetectorSystem";
import { Log } from "../../../utils/Log";

export var init = (gl:any, DataBufferConfig:any, GBufferData:any, DeferLightPassData: any, ShaderData: any, ProgramData: any, LocationData: any, GLSLSenderData: any, GPUDetectData:any) => {
    if(!hasExtensionColorBufferFloat(GPUDetectData)){
        Log.warn("defer shading need support extensionColorBufferFloat extension");
    }
    else{
        deferInit(gl, DataBufferConfig, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
    }
}

export var render = curry((state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, {
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap,
        gl = getGL(DeviceManagerDataFromSystem, state);

    clear(gl, DeviceManagerDataFromSystem);

    if(basicData.count > 0){
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData);
    }

    if(lightData.count > 0){
        deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData);
    }
})

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);


