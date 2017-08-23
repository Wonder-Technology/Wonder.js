"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightDrawRenderCommandBufferUtils_1 = require("../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils");
var drawRenderCommandBufferUtils_1 = require("../../../worker/render_file/draw/drawRenderCommandBufferUtils");
exports.draw = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, _a) {
    var vMatrix = _a.vMatrix, pMatrix = _a.pMatrix, cameraPosition = _a.cameraPosition, normalMatrix = _a.normalMatrix;
    var LightDrawRenderCommandBufferDataFromSystem = drawDataMap.LightDrawRenderCommandBufferDataFromSystem, mMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend;
    drawRenderCommandBufferUtils_1.drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "FrontRenderLight", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, lightDrawRenderCommandBufferUtils_1.buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    return state;
};
//# sourceMappingURL=frontDrawRenderCommandBufferUtils.js.map