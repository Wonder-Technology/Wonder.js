import { setClearColor } from "../../both_file/device/deviceManagerUtils";
import { initData as initBasicDrawRenderCommandBufferData } from "../../../draw/basic/basicDrawRenderCommandBufferUtils";
import { initData as initLightDrawRenderCommandBufferData } from "../../../draw/light/lightDrawRenderCommandBufferUtils";
export var clearColor = function (gl, render_config, DeviceManagerDataFromSystem) {
    setClearColor(gl, render_config.clearColor, DeviceManagerDataFromSystem);
};
export var initData = function (BasicDrawRenderCommandBufferDataFromSystem, LightDrawRenderCommandBufferDataFromSystem) {
    initBasicDrawRenderCommandBufferData(BasicDrawRenderCommandBufferDataFromSystem);
    initLightDrawRenderCommandBufferData(LightDrawRenderCommandBufferDataFromSystem);
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map