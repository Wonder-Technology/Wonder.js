"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointLightUtils_1 = require("../../../../utils/worker/render_file/light/pointLightUtils");
var SpecifyLightWorkerSystem_1 = require("../../../render_file/light/SpecifyLightWorkerSystem");
var pointLightUtils_2 = require("../../../../webgl2/utils/worker/render_file/light/pointLightUtils");
exports.initData = function (_a, PointLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount;
    SpecifyLightWorkerSystem_1.setCount(lightCount, PointLightWorkerData);
    pointLightUtils_1.createTypeArrays(buffer, bufferCount, PointLightWorkerData);
};
exports.computeRadius = pointLightUtils_2.computeRadius;
//# sourceMappingURL=PointLightWorkerSystem.js.map