"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directionLightUtils_1 = require("../../../../utils/worker/render_file/light/directionLightUtils");
var SpecifyLightWorkerSystem_1 = require("../../../render_file/light/SpecifyLightWorkerSystem");
exports.initData = function (_a, DirectionLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, directionLightGLSLDataStructureMemberNameArr = _a.directionLightGLSLDataStructureMemberNameArr;
    SpecifyLightWorkerSystem_1.setCount(lightCount, DirectionLightWorkerData);
    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;
    directionLightUtils_1.createTypeArrays(buffer, bufferCount, DirectionLightWorkerData);
};
//# sourceMappingURL=DirectionLightWorkerSystem.js.map