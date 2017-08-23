"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderUtils_1 = require("../utils/worker/render_file/render/renderUtils");
var curry_1 = require("wonder-lodash/curry");
var DeviceManagerSystem_1 = require("../../device/DeviceManagerSystem");
var BasicRenderSystem_1 = require("./basic/BasicRenderSystem");
var DeferShadingSystem_1 = require("./light/defer/DeferShadingSystem");
exports.init = renderUtils_1.init;
exports.render = curry_1.default(function (state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, renderCommandBufferForDrawData) {
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, gl = DeviceManagerSystem_1.getGL(DeviceManagerDataFromSystem, state);
    renderUtils_1.render(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, BasicRenderSystem_1.render, DeferShadingSystem_1.render(ThreeDTransformData, GameObjectData), drawDataMap, deferDrawDataMap, initShaderDataMap, renderCommandBufferForDrawData);
    return state;
});
exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, ProgramData, GLSLSenderData, GeometryData, VaoData) { return renderUtils_1.sendAttributeData(gl, shaderIndex, geometryIndex, ProgramData, GLSLSenderData, GeometryData, VaoData); };
//# sourceMappingURL=RenderSystem.js.map