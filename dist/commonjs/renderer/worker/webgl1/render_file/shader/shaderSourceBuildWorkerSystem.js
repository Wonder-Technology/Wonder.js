"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaterialWorkerSystem_1 = require("../../../render_file/material/MaterialWorkerSystem");
var shaderSourceBuildUtils_1 = require("../../../../webgl1/utils/worker/render_file/shader/shaderSourceBuildUtils");
exports.buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, initShaderDataMap) {
    return shaderSourceBuildUtils_1.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: MaterialWorkerSystem_1.getAlphaTest,
        isTestAlpha: MaterialWorkerSystem_1.isTestAlpha
    }, initShaderDataMap);
};
//# sourceMappingURL=ShaderSourceBuildWorkerSystem.js.map