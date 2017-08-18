import {
    init as initUtils, render as renderUtils,
    sendAttributeData as sendAttributeDataUtils
} from "../utils/worker/render_file/render/renderUtils";
import { getVertices, getNormals, getTexCoords } from "../../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../utils/shader/location/locationUtils";
import { sendBuffer } from "../../shader/glslSender/GLSLSenderSystem";
import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { IMaterialConfig } from "../../data/material_config_interface";
import { IShaderLibGenerator } from "../../data/shaderLib_generator_interface";
import { render as basicRender } from "./basic/BasicRenderSystem";
import { render as deferRender, init as deferInit} from "./light/defer/DeferShadingSystem";
import { hasExtensionColorBufferFloat } from "../device/GPUDetectorSystem";
import { Log } from "../../../utils/Log";
import { init as initUbo } from "../utils/worker/render_file/ubo/uboManagerUtils";
import { RenderCommandBufferForDrawData } from "../../utils/worker/render_file/type/dataType";

// export var init = (gl:any, render_config:IRenderConfig, DataBufferConfig:any, GBufferData:any, DeferLightPassData: any, ShaderData: any, ProgramData: any, LocationData: any, GLSLSenderData: any, GPUDetectData:any) => {
//     if(!hasExtensionColorBufferFloat(GPUDetectData)){
//         Log.warn("defer shading need support extensionColorBufferFloat extension");
//     }
//     else{
//         deferInit(gl, DataBufferConfig, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
//     }
//
//     initUbo(gl, render_config, GLSLSenderData);
// }
export var init = initUtils;

export var render = curry((state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, renderCommandBufferForDrawData:RenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap,
        gl = getGL(DeviceManagerDataFromSystem, state);
    //
    // clear(gl, DeviceManagerDataFromSystem);
    //
    // bindFrameUboData(gl, render_config, cameraData, GLSLSenderDataFromSystem);
    //
    // if(basicData.count > 0){
    //     basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    // }
    //
    // if(lightData.count > 0){
    //     deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData, cameraData);
    // }

    renderUtils(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender(ThreeDTransformData, GameObjectData), drawDataMap, deferDrawDataMap, initShaderDataMap, renderCommandBufferForDrawData);
})

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);


