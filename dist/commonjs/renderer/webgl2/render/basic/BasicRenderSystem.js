"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var ShaderSystem_1 = require("../../../shader/ShaderSystem");
var GeometrySystem_1 = require("../../../../component/geometry/GeometrySystem");
var MapManagerSystem_1 = require("../../../texture/MapManagerSystem");
var GLSLSenderSystem_1 = require("../../../shader/glslSender/GLSLSenderSystem");
var MaterialSystem_1 = require("../../../../component/material/MaterialSystem");
var renderUtils_1 = require("../../../utils/worker/render_file/render/renderUtils");
var basicDrawRenderCommandBufferUtils_1 = require("../../utils/worker/render_file/draw/basic/basicDrawRenderCommandBufferUtils");
var RenderSystem_1 = require("../RenderSystem");
var basicRenderUtils_1 = require("../../utils/worker/render_file/render/basic/basicRenderUtils");
var basicRenderUtils_2 = require("../../../utils/worker/render_file/render/basic/basicRenderUtils");
var basicRenderUtils_3 = require("../../../utils/worker/render_file/render/basic/basicRenderUtils");
var mapManagerUtils_1 = require("../../../utils/worker/render_file/texture/mapManagerUtils");
exports.render = curry_1.default(function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, bufferData, cameraData) {
    basicRenderUtils_1.render(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicDrawRenderCommandBufferUtils_1.buildDrawFuncDataMap(RenderSystem_1.sendAttributeData, _sendUniformData, renderUtils_1.directlySendUniformData, ShaderSystem_1.use, GeometrySystem_1.hasIndices, GeometrySystem_1.getIndicesCount, GeometrySystem_1.getIndexType, GeometrySystem_1.getIndexTypeSize, GeometrySystem_1.getVerticesCount, MapManagerSystem_1.bindAndUpdate, MapManagerSystem_1.getMapCount, mapManagerUtils_1.getStartTextureIndex, MaterialSystem_1.useShader), drawDataMap, basicRenderUtils_2.buildSendUniformDataDataMap(GLSLSenderSystem_1.sendFloat1, GLSLSenderSystem_1.sendFloat3, GLSLSenderSystem_1.sendMatrix4, GLSLSenderSystem_1.sendVector3, GLSLSenderSystem_1.sendInt, GLSLSenderSystem_1.sendMatrix3, drawDataMap), initShaderDataMap, bufferData, cameraData);
});
var _sendUniformData = function (gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap) {
    basicRenderUtils_2.sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, basicRenderUtils_2.buildMaterialDataForGetUniformData(MaterialSystem_1.getColorArr3, MaterialSystem_1.getOpacity, drawDataMap.MaterialDataFromSystem), basicRenderUtils_3.buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
//# sourceMappingURL=BasicRenderSystem.js.map