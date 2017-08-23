"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeArrayUtils_1 = require("../../../../../utils/typeArrayUtils");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ClassUtils_1 = require("../../../../../utils/ClassUtils");
var GameObjectSystem_1 = require("../../../../../core/entityObject/gameObject/GameObjectSystem");
var SceneSystem_1 = require("../../../../../core/entityObject/scene/SceneSystem");
var ComponentComponentIdManager_1 = require("../../../../../component/ComponentComponentIdManager");
var CameraControllerSystem_1 = require("../../../../../component/camera/CameraControllerSystem");
var ThreeDTransformSystem_1 = require("../../../../../component/transform/ThreeDTransformSystem");
var CameraController_1 = require("../../../../../component/camera/CameraController");
var arrayBufferUtils_1 = require("../../../../../utils/arrayBufferUtils");
var lightRenderComandBufferUtils_1 = require("../../../command_buffer/lightRenderComandBufferUtils");
exports.createRenderCommandBufferData = contract_1.requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    contract_1.it("renderGameObject should be light material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            wonder_expect_js_1.expect(ClassUtils_1.ClassUtils.getClassNameByInstance(GameObjectSystem_1.getMaterial(gameObject, GameObjectData))).equal("LightMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, vMatrices = RenderCommandBufferData.vMatrices, pMatrices = RenderCommandBufferData.pMatrices, cameraPositions = RenderCommandBufferData.cameraPositions, normalMatrices = RenderCommandBufferData.normalMatrices, materialIndices = RenderCommandBufferData.materialIndices, geometryIndices = RenderCommandBufferData.geometryIndices, currentCamera = SceneSystem_1.getCurrentCamera(SceneData), currentCameraComponent = GameObjectSystem_1.getComponent(currentCamera, ComponentComponentIdManager_1.getComponentIdFromClass(CameraController_1.CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = GameObjectSystem_1.getTransform(currentCamera, GameObjectData), mat4Length = typeArrayUtils_1.getMatrix4DataSize();
    typeArrayUtils_1.setMatrices(vMatrices, CameraControllerSystem_1.getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    typeArrayUtils_1.setMatrices(pMatrices, CameraControllerSystem_1.getPMatrix(currentCameraIndex, CameraData), 0);
    typeArrayUtils_1.setVectors(cameraPositions, ThreeDTransformSystem_1.getPosition(currentCameraTransform, ThreeDTransformData), 0);
    typeArrayUtils_1.setMatrices3(normalMatrices, ThreeDTransformSystem_1.getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData), 0);
    for (var i = 0; i < count; i++) {
        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], geometry = GameObjectSystem_1.getGeometry(gameObject, GameObjectData), material = GameObjectSystem_1.getMaterial(gameObject, GameObjectData), transform = GameObjectSystem_1.getTransform(gameObject, GameObjectData), materialIndex = material.index;
        typeArrayUtils_1.setMatrices(mMatrices, ThreeDTransformSystem_1.getLocalToWorldMatrix(transform, ThreeDTransformSystem_1.getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
        materialIndices[i] = materialIndex;
        geometryIndices[i] = geometry.index;
    }
    return buildRenderCommandBufferForDrawData(count, buffer, materialIndices, geometryIndices, mMatrices, vMatrices, pMatrices, cameraPositions, normalMatrices);
});
exports.initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat3Length = typeArrayUtils_1.getMatrix3DataSize(), mat4Length = typeArrayUtils_1.getMatrix4DataSize(), cameraPositionLength = typeArrayUtils_1.getVector3DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat3Length + mat4Length * 2 + cameraPositionLength));
    lightRenderComandBufferUtils_1.createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=lightRenderComandBufferUtils.js.map