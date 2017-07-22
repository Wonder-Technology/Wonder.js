"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shaderSourceBuildUtils_1 = require("../utils/shader/shaderSourceBuildUtils");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
exports.buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, MaterialDataMap) {
    return shaderSourceBuildUtils_1.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: MaterialSystem_1.getAlphaTest,
        isTestAlpha: MaterialSystem_1.isTestAlpha
    }, MaterialDataMap);
};
//# sourceMappingURL=shaderSourceBuildSystem.js.map