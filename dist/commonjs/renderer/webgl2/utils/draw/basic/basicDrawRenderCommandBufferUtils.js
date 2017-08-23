"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basicDrawRenderCommandBufferUtils_1 = require("../../../../utils/draw/basic/basicDrawRenderCommandBufferUtils");
var drawRenderCommandBufferUtils_1 = require("../../../../webgl2/utils/worker/render_file/draw/drawRenderCommandBufferUtils");
exports.draw = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, _a) {
    var vMatrix = _a.vMatrix, pMatrix = _a.pMatrix;
    var BasicDrawRenderCommandBufferDataFromSystem = drawDataMap.BasicDrawRenderCommandBufferDataFromSystem, mMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend;
    drawRenderCommandBufferUtils_1.drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "BasicRender", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, basicDrawRenderCommandBufferUtils_1.buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix), bufferData);
    return state;
};
//# sourceMappingURL=basicDrawRenderCommandBufferUtils.js.map