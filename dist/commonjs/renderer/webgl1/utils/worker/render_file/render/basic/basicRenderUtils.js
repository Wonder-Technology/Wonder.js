"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basicDrawRenderCommandBufferUtils_1 = require("../../../../draw/basic/basicDrawRenderCommandBufferUtils");
exports.render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData) {
    basicDrawRenderCommandBufferUtils_1.draw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
};
//# sourceMappingURL=basicRenderUtils.js.map