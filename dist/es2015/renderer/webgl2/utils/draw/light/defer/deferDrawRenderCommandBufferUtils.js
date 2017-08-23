import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";
import { drawLightPass } from "./lightPassDrawUtils";
import { drawGBufferPass } from "./gBufferPassDrawUtils";
export var draw = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, _a) {
    var vMatrix = _a.vMatrix, pMatrix = _a.pMatrix, cameraPosition = _a.cameraPosition, normalMatrix = _a.normalMatrix;
    var LightDrawRenderCommandBufferDataFromSystem = drawDataMap.LightDrawRenderCommandBufferDataFromSystem, mMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend;
    drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrix, pMatrix, state);
};
//# sourceMappingURL=deferDrawRenderCommandBufferUtils.js.map