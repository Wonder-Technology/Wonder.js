import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { clear, getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { draw as frontDraw } from "../render/light/front/FrontRenderSystem";
import { DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { IMaterialConfig } from "../../data/material_config";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { draw as basicDraw } from "../render/basic/BasicRenderSystem";

export var draw = curry((state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, {
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
        frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData);
    }
})
