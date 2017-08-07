import {
    clearColor as clearColorUtils,
    initData as initDataUtils
} from "../utils/draw/drawRenderCommandBufferUtils";
import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../data/render_config";
import { RenderCommandBufferForDrawData } from "../type/dataType";
import { getGL } from "../device/DeviceManagerSystem";
import { Map } from "immutable";

export var clearColor = curry((state: Map<any, any>, render_config: IRenderConfig, DeviceManagerData: any, data: RenderCommandBufferForDrawData) => {
    clearColorUtils(getGL(DeviceManagerData, state), render_config, DeviceManagerData);

    return data;
});

//todo fix
// export var draw = curry((state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => {
//     return drawUtils(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData)
// });

export var initData = initDataUtils;
