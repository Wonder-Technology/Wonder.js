import { buildRenderCommandUniformData } from "../../../../utils/draw/basic/basicDrawRenderCommandBufferUtils";
import { drawGameObjects } from "../../../../webgl2/utils/worker/render_file/draw/drawRenderCommandBufferUtils";
export var draw = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, _a) {
    var vMatrix = _a.vMatrix, pMatrix = _a.pMatrix;
    var BasicDrawRenderCommandBufferDataFromSystem = drawDataMap.BasicDrawRenderCommandBufferDataFromSystem, mMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend;
    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "BasicRender", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix), bufferData);
    return state;
};
//# sourceMappingURL=basicDrawRenderCommandBufferUtils.js.map