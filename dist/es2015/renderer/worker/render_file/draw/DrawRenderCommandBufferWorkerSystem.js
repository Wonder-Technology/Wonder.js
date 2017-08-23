import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { clearColor as clearColorUtils, initData as initDataUtils } from "../../../utils/worker/render_file/draw/drawRenderCommandBufferUtils";
export var clearColor = function (state, render_config, DeviceManagerWorkerData) {
    clearColorUtils(getGL(DeviceManagerWorkerData, state), render_config, DeviceManagerWorkerData);
};
export var commitGL = function (gl, state) {
    gl.commit();
    return state;
};
export var initData = initDataUtils;
//# sourceMappingURL=DrawRenderCommandBufferWorkerSystem.js.map