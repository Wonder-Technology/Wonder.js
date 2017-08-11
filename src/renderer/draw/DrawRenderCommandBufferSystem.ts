import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IRenderConfig } from "../worker/both_file/data/render_config";
import { RenderCommandBufferForDrawData } from "../type/dataType";
import { clearColor as clearColorUtils, initData as initDataUtils } from "../utils/draw/drawRenderCommandBufferUtils";
import { getGL } from "../device/DeviceManagerSystem";

export var clearColor = curry((state: Map<any, any>, render_config: IRenderConfig, DeviceManagerData: any, data: RenderCommandBufferForDrawData) => {
    clearColorUtils(getGL(DeviceManagerData, state), render_config, DeviceManagerData);

    return data;
});

export var initData = initDataUtils;
