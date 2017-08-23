import { draw as drawBasic } from "../../../../draw/basic/basicDrawRenderCommandBufferUtils";
export var render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData) {
    drawBasic(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
};
//# sourceMappingURL=basicRenderUtils.js.map