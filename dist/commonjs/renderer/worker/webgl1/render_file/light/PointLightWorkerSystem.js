"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointLightUtils_1 = require("../../../../utils/worker/render_file/light/pointLightUtils");
var SpecifyLightWorkerSystem_1 = require("../../../render_file/light/SpecifyLightWorkerSystem");
exports.initData = function (_a, PointLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, pointLightGLSLDataStructureMemberNameArr = _a.pointLightGLSLDataStructureMemberNameArr;
    SpecifyLightWorkerSystem_1.setCount(lightCount, PointLightWorkerData);
    PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
    pointLightUtils_1.createTypeArrays(buffer, bufferCount, PointLightWorkerData);
};
//# sourceMappingURL=PointLightWorkerSystem.js.map