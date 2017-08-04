import {
    buildDrawFuncDataMap, clear as clearUtils, draw as drawUtils,
    initData as initDataUtils
} from "../utils/draw/drawRenderCommandBufferUtils";
import { clear as clearGL, getGL } from "../device/DeviceManagerSystem";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { DrawDataMap } from "../type/utilsType";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../component/geometry/GeometrySystem";
import { IRenderConfig } from "../data/render_config";
import { RenderCommandBufferForDrawData } from "../type/dataType";
import { bindAndUpdate, getMapCount } from "../texture/MapManagerSystem";
import { directlySendUniformData } from "../utils/shader/program/programUtils";

export var clear = curry((state: Map<any, any>, render_config: IRenderConfig, DeviceManagerData: any, data: RenderCommandBufferForDrawData) => {
    return clearUtils(getGL(DeviceManagerData, state), clearGL, render_config, DeviceManagerData, data);
});

//todo fix
// export var draw = curry((state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => {
//     return drawUtils(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData)
// });

export var initData = initDataUtils;
