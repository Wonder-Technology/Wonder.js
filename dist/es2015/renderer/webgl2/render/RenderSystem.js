import { init as initUtils, render as renderUtils, sendAttributeData as sendAttributeDataUtils } from "../utils/worker/render_file/render/renderUtils";
import curry from "wonder-lodash/curry";
import { getGL } from "../../device/DeviceManagerSystem";
import { render as basicRender } from "./basic/BasicRenderSystem";
import { render as deferRender } from "./light/defer/DeferShadingSystem";
export var init = initUtils;
export var render = curry(function (state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, renderCommandBufferForDrawData) {
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, gl = getGL(DeviceManagerDataFromSystem, state);
    renderUtils(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender(ThreeDTransformData, GameObjectData), drawDataMap, deferDrawDataMap, initShaderDataMap, renderCommandBufferForDrawData);
    return state;
});
export var sendAttributeData = function (gl, shaderIndex, geometryIndex, ProgramData, GLSLSenderData, GeometryData, VaoData) { return sendAttributeDataUtils(gl, shaderIndex, geometryIndex, ProgramData, GLSLSenderData, GeometryData, VaoData); };
//# sourceMappingURL=RenderSystem.js.map