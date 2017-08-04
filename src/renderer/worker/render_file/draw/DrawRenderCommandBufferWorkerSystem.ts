import {
    buildDrawFuncDataMap, clear as clearUtils, draw as drawUtils,
    initData as initDataUtils
} from "../../../utils/draw/drawRenderCommandBufferUtils";
import { Map } from "immutable";
import { clear as clearGL, getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DrawDataMap } from "../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { IRenderConfig } from "../../../data/render_config";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderWorkerSystem";
import {
    getIndexType,
    getIndexTypeSize,
    getIndicesCount,
    getVerticesCount,
    hasIndices
} from "../geometry/GeometryWorkerSystem";
import { bindAndUpdate, getMapCount } from "../texture/MapManagerWorkerSystem";
import { directlySendUniformData } from "../../../utils/shader/program/programUtils";

export var clear = (state: Map<any, any>, render_config: IRenderConfig, DeviceManagerWorkerData: any) => {
    return clearUtils(getGL(DeviceManagerWorkerData, state), clearGL, render_config, DeviceManagerWorkerData, null);
};

//todo fix
// export var draw = (state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => {
//     var gl = getGL(drawDataMap.DeviceManagerDataFromSystem, state);
//
//
//     if (_isBufferDataExist(bufferData)) {
//         drawUtils(gl, state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData);
//     }
//
//     _commitGL(gl, state);
// };

var _isBufferDataExist = (bufferData: RenderCommandBufferForDrawData) => !!bufferData;

var _commitGL = (gl: any, state: Map<any, any>) => {
    gl.commit();

    return state;
}

export var initData = initDataUtils;

