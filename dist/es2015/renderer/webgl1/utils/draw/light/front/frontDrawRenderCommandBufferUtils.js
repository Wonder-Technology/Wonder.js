import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";
import { drawGameObjects } from "../../../worker/render_file/draw/drawRenderCommandBufferUtils";
export var draw = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, _a) {
    var vMatrix = _a.vMatrix, pMatrix = _a.pMatrix, cameraPosition = _a.cameraPosition, normalMatrix = _a.normalMatrix;
    var LightDrawRenderCommandBufferDataFromSystem = drawDataMap.LightDrawRenderCommandBufferDataFromSystem, mMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend;
    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "FrontRenderLight", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    return state;
};
//# sourceMappingURL=frontDrawRenderCommandBufferUtils.js.map