"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecifyLightWorkerSystem_1 = require("./SpecifyLightWorkerSystem");
var ambientLightUtils_1 = require("../../../utils/light/ambientLightUtils");
exports.getColorArr3 = ambientLightUtils_1.getColorArr3;
exports.initData = function (_a, AmbientLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount;
    _setCount(lightCount, AmbientLightWorkerData);
    ambientLightUtils_1.createTypeArrays(buffer, bufferCount, AmbientLightWorkerData);
};
var _setCount = SpecifyLightWorkerSystem_1.setCount;
//# sourceMappingURL=AmbientLightWorkerSystem.js.map