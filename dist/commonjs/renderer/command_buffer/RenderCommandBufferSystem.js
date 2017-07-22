"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var GameObjectSystem_1 = require("../../core/entityObject/gameObject/GameObjectSystem");
var ThreeDTransformSystem_1 = require("../../component/transform/ThreeDTransformSystem");
var SceneSystem_1 = require("../../core/entityObject/scene/SceneSystem");
var CameraControllerSystem_1 = require("../../component/camera/CameraControllerSystem");
var CameraController_1 = require("../../component/camera/CameraController");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var renderComandBufferUtils_1 = require("../utils/draw/renderComandBufferUtils");
var ComponentComponentIDManager_1 = require("../../component/ComponentComponentIDManager");
exports.createRenderCommandBufferData = curry_1.default(contract_1.requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    contract_1.it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", function () {
        wonder_expect_js_1.expect(renderGameObjectArray.length).lte(DataBufferConfig_1.DataBufferConfig.renderCommandBufferCount);
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, vMatrices = RenderCommandBufferData.vMatrices, pMatrices = RenderCommandBufferData.pMatrices, cameraPositions = RenderCommandBufferData.cameraPositions, normalMatrices = RenderCommandBufferData.normalMatrices, materialIndices = RenderCommandBufferData.materialIndices, shaderIndices = RenderCommandBufferData.shaderIndices, geometryIndices = RenderCommandBufferData.geometryIndices, currentCamera = SceneSystem_1.getCurrentCamera(SceneData), currentCameraComponent = GameObjectSystem_1.getComponent(currentCamera, ComponentComponentIDManager_1.getComponentIDFromClass(CameraController_1.CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = GameObjectSystem_1.getTransform(currentCamera, GameObjectData), mat4Length = typeArrayUtils_1.getMatrix4DataSize();
    typeArrayUtils_1.setMatrices(vMatrices, CameraControllerSystem_1.getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    typeArrayUtils_1.setMatrices(pMatrices, CameraControllerSystem_1.getPMatrix(currentCameraIndex, CameraData), 0);
    typeArrayUtils_1.setVectors(cameraPositions, ThreeDTransformSystem_1.getPosition(currentCameraTransform, ThreeDTransformData), 0);
    typeArrayUtils_1.setMatrices3(normalMatrices, ThreeDTransformSystem_1.getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData), 0);
    for (var i = 0; i < count; i++) {
        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], geometry = GameObjectSystem_1.getGeometry(gameObject, GameObjectData), material = GameObjectSystem_1.getMaterial(gameObject, GameObjectData), transform = GameObjectSystem_1.getTransform(gameObject, GameObjectData), materialIndex = material.index, shaderIndex = MaterialSystem_1.getShaderIndex(materialIndex, MaterialData);
        typeArrayUtils_1.setMatrices(mMatrices, ThreeDTransformSystem_1.getLocalToWorldMatrix(transform, ThreeDTransformSystem_1.getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
        materialIndices[i] = materialIndex;
        shaderIndices[i] = shaderIndex;
        geometryIndices[i] = geometry.index;
    }
    return {
        buffer: buffer,
        count: count
    };
}), 11);
exports.initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat3Length = typeArrayUtils_1.getMatrix3DataSize(), mat4Length = typeArrayUtils_1.getMatrix4DataSize(), cameraPositionLength = typeArrayUtils_1.getVector3DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat3Length + mat4Length * 2 + cameraPositionLength));
    renderComandBufferUtils_1.createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=RenderCommandBufferSystem.js.map