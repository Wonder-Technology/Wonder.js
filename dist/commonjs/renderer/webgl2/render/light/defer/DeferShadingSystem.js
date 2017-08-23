"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var deferShadingUtils_1 = require("../../../utils/worker/render_file/render/light/defer/deferShadingUtils");
var ShaderSystem_1 = require("../../../../shader/ShaderSystem");
var GeometrySystem_1 = require("../../../../../component/geometry/GeometrySystem");
var MapManagerSystem_1 = require("../../../../texture/MapManagerSystem");
var AmbientLightSystem_1 = require("../../../../../component/light/AmbientLightSystem");
var DirectionLightSystem_1 = require("../../../../../component/light/DirectionLightSystem");
var PointLightSystem_1 = require("../../../../../component/light/PointLightSystem");
var GLSLSenderSystem_1 = require("../../../../shader/glslSender/GLSLSenderSystem");
var MaterialSystem_1 = require("../../../../../component/material/MaterialSystem");
var gBufferUtils_1 = require("../../../utils/worker/render_file/render/light/defer/gbuffer/gBufferUtils");
var PointLightSystem_2 = require("../../../light/PointLightSystem");
var LightRenderSystem_1 = require("../LightRenderSystem");
var renderUtils_1 = require("../../../../utils/worker/render_file/render/renderUtils");
var RenderSystem_1 = require("../../RenderSystem");
var deferDrawRenderCommandBufferUtils_1 = require("../../../utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils");
exports.init = deferShadingUtils_1.init;
exports.render = curry_1.default(function (ThreeDTransformData, GameObjectData, gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, bufferData, cameraData) {
    deferShadingUtils_1.render(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, deferDrawRenderCommandBufferUtils_1.buildDrawFuncDataMap(RenderSystem_1.sendAttributeData, LightRenderSystem_1.sendUniformData, renderUtils_1.directlySendUniformData, ShaderSystem_1.use, GeometrySystem_1.hasIndices, GeometrySystem_1.getIndicesCount, GeometrySystem_1.getIndexType, GeometrySystem_1.getIndexTypeSize, GeometrySystem_1.getVerticesCount, MapManagerSystem_1.bindAndUpdate, MapManagerSystem_1.getMapCount, MaterialSystem_1.useShader, gBufferUtils_1.bindGBuffer, gBufferUtils_1.unbindGBuffer, gBufferUtils_1.getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, deferShadingUtils_1.buildSendUniformDataDataMap(GLSLSenderSystem_1.sendFloat1, GLSLSenderSystem_1.sendFloat3, GLSLSenderSystem_1.sendMatrix4, GLSLSenderSystem_1.sendVector3, GLSLSenderSystem_1.sendInt, GLSLSenderSystem_1.sendMatrix3, AmbientLightSystem_1.getColorArr3, AmbientLightSystem_1.isColorDirty, AmbientLightSystem_1.cleanColorDirty, function (index, DirectionDataFromSystem) {
        return DirectionLightSystem_1.getPosition(index, ThreeDTransformData, GameObjectData, DirectionDataFromSystem).values;
    }, DirectionLightSystem_1.getColorArr3, DirectionLightSystem_1.getIntensity, DirectionLightSystem_1.isPositionDirty, DirectionLightSystem_1.isColorDirty, DirectionLightSystem_1.isIntensityDirty, DirectionLightSystem_1.cleanPositionDirty, DirectionLightSystem_1.cleanColorDirty, DirectionLightSystem_1.cleanIntensityDirty, function (index, PointLightDataFromSystem) {
        return PointLightSystem_1.getPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
    }, PointLightSystem_1.getColorArr3, PointLightSystem_1.getConstant, PointLightSystem_1.getIntensity, PointLightSystem_1.getLinear, PointLightSystem_1.getQuadratic, PointLightSystem_1.getRange, PointLightSystem_2.computeRadius, PointLightSystem_1.isPositionDirty, PointLightSystem_1.isColorDirty, PointLightSystem_1.isIntensityDirty, PointLightSystem_1.isAttenuationDirty, PointLightSystem_1.cleanPositionDirty, PointLightSystem_1.cleanColorDirty, PointLightSystem_1.cleanIntensityDirty, PointLightSystem_1.cleanAttenuationDirty, drawDataMap), initShaderDataMap, bufferData, cameraData);
});
//# sourceMappingURL=DeferShadingSystem.js.map