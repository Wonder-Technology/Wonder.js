"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shaderSourceBuildUtils_1 = require("../../../utils/shader/shaderSourceBuildUtils");
var MaterialWorkerSystem_1 = require("../material/MaterialWorkerSystem");
exports.buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, initShaderDataMap) {
    return shaderSourceBuildUtils_1.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: MaterialWorkerSystem_1.getAlphaTest,
        isTestAlpha: MaterialWorkerSystem_1.isTestAlpha
    }, initShaderDataMap);
};
//# sourceMappingURL=shaderSourceBuildWorkerSystem.js.map