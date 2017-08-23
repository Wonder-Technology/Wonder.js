import curry from "wonder-lodash/curry";
import { getGL } from "../device/DeviceManagerSystem";
import { clearColor as clearColorUtils, initData as initDataUtils } from "../utils/worker/render_file/draw/drawRenderCommandBufferUtils";
export var clearColor = curry(function (state, render_config, DeviceManagerData, data) {
    clearColorUtils(getGL(DeviceManagerData, state), render_config, DeviceManagerData);
    return data;
});
export var initData = initDataUtils;
//# sourceMappingURL=DrawRenderCommandBufferSystem.js.map