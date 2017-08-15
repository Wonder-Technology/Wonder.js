import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { setClearColor } from "../../both_file/device/deviceManagerUtils";
import { initData as initBasicDrawRenderCommandBufferData } from "../../../draw/basic/basicDrawRenderCommandBufferUtils";
import { initData as initLightDrawRenderCommandBufferData } from "../../../draw/light/lightDrawRenderCommandBufferUtils";

export var clearColor = (gl: WebGLRenderingContext, render_config: IRenderConfig, DeviceManagerDataFromSystem: any) => {
    setClearColor(gl, render_config.clearColor, DeviceManagerDataFromSystem);
}

export var initData = (BasicDrawRenderCommandBufferDataFromSystem: any, LightDrawRenderCommandBufferDataFromSystem: any) => {
    initBasicDrawRenderCommandBufferData(BasicDrawRenderCommandBufferDataFromSystem);
    initLightDrawRenderCommandBufferData(LightDrawRenderCommandBufferDataFromSystem);
}
