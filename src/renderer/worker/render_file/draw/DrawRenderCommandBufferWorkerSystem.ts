import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { IRenderConfig } from "../../both_file/data/render_config";
import { Map } from "immutable";
import {
    clearColor as clearColorUtils,
    initData as initDataUtils
} from "../../../utils/worker/render_file/draw/drawRenderCommandBufferUtils";

export var clearColor = (state: Map<any, any>, render_config: IRenderConfig, DeviceManagerWorkerData: any) => {
    clearColorUtils(getGL(DeviceManagerWorkerData, state), render_config, DeviceManagerWorkerData);
};

export var commitGL = (gl: any, state: Map<any, any>) => {
    gl.commit();

    return state;
}

export var initData = initDataUtils;
