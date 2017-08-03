import { init as initGBuffer } from "./gbuffer/GBufferSystem";
import { draw as deferDraw } from "./draw/DeferDrawRenderCommandBufferSystem";
import { DrawDataMap, InitShaderDataMap } from "../type/utilsType";
import curry from "wonder-lodash/curry";
import { RenderCommandBufferForDrawData } from "../type/dataType";
import { getGL } from "../device/DeviceManagerSystem";
import { init as initDeferLightPass } from "./light/DeferLightPassSystem";

export var init = (gl:any, GBufferData:any, DeferLightPassData:any) => {
    // create gbuffer shader, program
    // create light pass shader, program


    initGBuffer(gl, GBufferData);
    initDeferLightPass(gl, DeferLightPassData);
}

export var draw = curry((state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    deferDraw(getGL(drawDataMap.DeviceManagerDataFromSystem, state), DataBufferConfig, drawDataMap, initShaderDataMap, bufferData);
})
