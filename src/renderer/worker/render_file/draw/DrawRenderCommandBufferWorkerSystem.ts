import {
    clearColor as clearColorUtils,
    initData as initDataUtils
} from "../../../utils/draw/drawRenderCommandBufferUtils";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { IRenderConfig } from "../../both_file/data/render_config";
import { Map } from "immutable";

export var clearColor = (state: Map<any, any>, render_config: IRenderConfig, DeviceManagerWorkerData: any) => {
    clearColorUtils(getGL(DeviceManagerWorkerData, state), render_config, DeviceManagerWorkerData);
};

export var commitGL = (gl: any, state: Map<any, any>) => {
    gl.commit();

    return state;
}

export var initData = initDataUtils;
