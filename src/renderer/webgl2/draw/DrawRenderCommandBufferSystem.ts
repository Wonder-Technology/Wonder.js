import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { clear, getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
// import { draw as frontDraw } from "../render/light/front/FrontRenderSystem";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { IMaterialConfig } from "../../data/material_config";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { draw as basicDraw } from "../render/basic/BasicRenderSystem";
import { draw as deferDraw, init as deferInit} from "../render/light/defer/DeferShadingSystem";
import { hasExtensionColorBufferFloat } from "../device/GPUDetectorSystem";
import { Log } from "../../../utils/Log";

export var init = (gl:any, DataBufferConfig:any, GBufferData:any, DeferLightPassData: any, ShaderData: any, ProgramData: any, LocationData: any, GLSLSenderData: any, GPUDetectData:any) => {
    if(!hasExtensionColorBufferFloat(GPUDetectData)){
        Log.error(true, "defer shading need support extensionColorBufferFloat extension");
    }
    else{
        deferInit(gl, DataBufferConfig, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
    }
}

export var draw = curry((state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, {
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap,
        gl = getGL(DeviceManagerDataFromSystem, state);

    clear(gl, DeviceManagerDataFromSystem);

    if(basicData.count > 0){
        basicDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData);
    }

    if(lightData.count > 0){
        deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData);
    }
})
