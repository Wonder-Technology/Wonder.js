"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightDrawRenderCommandBufferUtils_1 = require("../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils");
var lightPassDrawUtils_1 = require("./lightPassDrawUtils");
var gBufferPassDrawUtils_1 = require("./gBufferPassDrawUtils");
exports.draw = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, _a) {
    var vMatrix = _a.vMatrix, pMatrix = _a.pMatrix, cameraPosition = _a.cameraPosition, normalMatrix = _a.normalMatrix;
    var LightDrawRenderCommandBufferDataFromSystem = drawDataMap.LightDrawRenderCommandBufferDataFromSystem, mMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend;
    gBufferPassDrawUtils_1.drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, lightDrawRenderCommandBufferUtils_1.buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    lightPassDrawUtils_1.drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrix, pMatrix, state);
};
//# sourceMappingURL=deferDrawRenderCommandBufferUtils.js.map