import { clear, setBlend, setDepthTest, setDepthWrite } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { drawGameObjects } from "../../../worker/render_file/draw/drawRenderCommandBufferUtils";
import { getNewTextureUnitIndex } from "../../../worker/render_file/render/light/defer/gbuffer/gBufferUtils";
export var drawGBufferPass = function (gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, _a, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData) {
    var GBufferDataFromSystem = _a.GBufferDataFromSystem;
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem;
    setDepthWrite(gl, true, DeviceManagerDataFromSystem);
    drawFuncDataMap.bindGBuffer(gl, GBufferDataFromSystem);
    clear(gl, drawDataMap.DeviceManagerDataFromSystem);
    setDepthTest(gl, true, DeviceManagerDataFromSystem);
    setBlend(gl, false, DeviceManagerDataFromSystem);
    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, getNewTextureUnitIndex(), "GBuffer", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData);
};
//# sourceMappingURL=gBufferPassDrawUtils.js.map