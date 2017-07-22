import { buildDrawFuncDataMap, clear as clearUtils, draw as drawUtils, initData as initDataUtils } from "../../../utils/draw/drawRenderCommandBufferUtils";
import { clear as clearGL, getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderWorkerSystem";
import { getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount, hasIndices } from "../geometry/GeometryWorkerSystem";
import { bindAndUpdate, getMapCount } from "../texture/MapManagerWorkerSystem";
import { directlySendUniformData } from "../../../utils/shader/program/programUtils";
export var clear = function (state, render_config, DeviceManagerWorkerData) {
    return clearUtils(getGL(DeviceManagerWorkerData, state), clearGL, render_config, DeviceManagerWorkerData, null);
};
export var draw = function (state, DataBufferConfig, drawDataMap, bufferData) {
    var gl = getGL(drawDataMap.DeviceManagerDataFromSystem, state);
    if (_isBufferDataExist(bufferData)) {
        drawUtils(gl, state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData);
    }
    _commitGL(gl, state);
};
var _isBufferDataExist = function (bufferData) { return !!bufferData; };
var _commitGL = function (gl, state) {
    gl.commit();
    return state;
};
export var initData = initDataUtils;
//# sourceMappingURL=DrawRenderCommandBufferWorkerSystem.js.map