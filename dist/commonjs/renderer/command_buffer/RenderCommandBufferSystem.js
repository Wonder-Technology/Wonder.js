"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var GameObjectSystem_1 = require("../../core/entityObject/gameObject/GameObjectSystem");
var ThreeDTransformSystem_1 = require("../../component/transform/ThreeDTransformSystem");
var SceneSystem_1 = require("../../core/entityObject/scene/SceneSystem");
var CameraControllerSystem_1 = require("../../component/camera/CameraControllerSystem");
var ComponentTypeIDManager_1 = require("../../component/ComponentTypeIDManager");
var CameraController_1 = require("../../component/camera/CameraController");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
exports.createRenderCommandBufferData = curry_1.default(contract_1.requireCheckFunc(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    contract_1.it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", function () {
        wonder_expect_js_1.expect(renderGameObjectArray.length).lte(DataBufferConfig_1.DataBufferConfig.renderCommandBufferCount);
    });
}, function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, vMatrices = RenderCommandBufferData.vMatrices, pMatrices = RenderCommandBufferData.pMatrices, materialIndices = RenderCommandBufferData.materialIndices, shaderIndices = RenderCommandBufferData.shaderIndices, geometryIndices = RenderCommandBufferData.geometryIndices, currentCamera = GameObjectSystem_1.getComponent(SceneSystem_1.getCurrentCamera(SceneData), ComponentTypeIDManager_1.getTypeIDFromClass(CameraController_1.CameraController), GameObjectData), currentCameraIndex = currentCamera.index, mat4Length = typeArrayUtils_1.getMatrix4DataSize();
    typeArrayUtils_1.setMatrices(vMatrices, CameraControllerSystem_1.getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    typeArrayUtils_1.setMatrices(pMatrices, CameraControllerSystem_1.getPMatrix(currentCameraIndex, CameraData), 0);
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
}), 10);
exports.initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat4Length = typeArrayUtils_1.getMatrix4DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size + 2 * Float32Array.BYTES_PER_ELEMENT * mat4Length);
    RenderCommandBufferData.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
    RenderCommandBufferData.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
    RenderCommandBufferData.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
    RenderCommandBufferData.materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count);
    RenderCommandBufferData.shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count);
    RenderCommandBufferData.geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=RenderCommandBufferSystem.js.map