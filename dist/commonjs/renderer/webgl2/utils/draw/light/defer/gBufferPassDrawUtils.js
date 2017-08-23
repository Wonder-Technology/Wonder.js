"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deviceManagerUtils_1 = require("../../../../../utils/worker/both_file/device/deviceManagerUtils");
var drawRenderCommandBufferUtils_1 = require("../../../worker/render_file/draw/drawRenderCommandBufferUtils");
var gBufferUtils_1 = require("../../../worker/render_file/render/light/defer/gbuffer/gBufferUtils");
exports.drawGBufferPass = function (gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, _a, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData) {
    var GBufferDataFromSystem = _a.GBufferDataFromSystem;
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem;
    deviceManagerUtils_1.setDepthWrite(gl, true, DeviceManagerDataFromSystem);
    drawFuncDataMap.bindGBuffer(gl, GBufferDataFromSystem);
    deviceManagerUtils_1.clear(gl, drawDataMap.DeviceManagerDataFromSystem);
    deviceManagerUtils_1.setDepthTest(gl, true, DeviceManagerDataFromSystem);
    deviceManagerUtils_1.setBlend(gl, false, DeviceManagerDataFromSystem);
    drawRenderCommandBufferUtils_1.drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, gBufferUtils_1.getNewTextureUnitIndex(), "GBuffer", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData);
};
//# sourceMappingURL=gBufferPassDrawUtils.js.map