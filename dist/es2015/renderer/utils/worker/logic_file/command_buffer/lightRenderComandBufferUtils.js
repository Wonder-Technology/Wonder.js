import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize, setMatrices, setMatrices3, setVectors } from "../../../../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import { getComponent, getGeometry, getMaterial, getTransform } from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { getCurrentCamera } from "../../../../../core/entityObject/scene/SceneSystem";
import { getComponentIdFromClass } from "../../../../../component/ComponentComponentIdManager";
import { getPMatrix, getWorldToCameraMatrix } from "../../../../../component/camera/CameraControllerSystem";
import { getLocalToWorldMatrix, getNormalMatrix, getPosition, getTempLocalToWorldMatrix } from "../../../../../component/transform/ThreeDTransformSystem";
import { CameraController } from "../../../../../component/camera/CameraController";
import { createSharedArrayBufferOrArrayBuffer } from "../../../../../utils/arrayBufferUtils";
import { createTypeArrays } from "../../../command_buffer/lightRenderComandBufferUtils";
export var createRenderCommandBufferData = requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    it("renderGameObject should be light material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject.uid, GameObjectData))).equal("LightMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, vMatrices = RenderCommandBufferData.vMatrices, pMatrices = RenderCommandBufferData.pMatrices, cameraPositions = RenderCommandBufferData.cameraPositions, normalMatrices = RenderCommandBufferData.normalMatrices, materialIndices = RenderCommandBufferData.materialIndices, geometryIndices = RenderCommandBufferData.geometryIndices, currentCameraUId = getCurrentCamera(SceneData).uid, currentCameraComponent = getComponent(currentCameraUId, getComponentIdFromClass(CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = getTransform(currentCameraUId, GameObjectData), mat4Length = getMatrix4DataSize();
    setMatrices(vMatrices, getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    setMatrices(pMatrices, getPMatrix(currentCameraIndex, CameraData), 0);
    setVectors(cameraPositions, getPosition(currentCameraTransform, ThreeDTransformData), 0);
    setMatrices3(normalMatrices, getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData), 0);
    for (var i = 0; i < count; i++) {
        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], uid = gameObject.uid, geometry = getGeometry(uid, GameObjectData), material = getMaterial(uid, GameObjectData), transform = getTransform(uid, GameObjectData), materialIndex = material.index;
        setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
        materialIndices[i] = materialIndex;
        geometryIndices[i] = geometry.index;
    }
    return buildRenderCommandBufferForDrawData(count, buffer, materialIndices, geometryIndices, mMatrices, vMatrices, pMatrices, cameraPositions, normalMatrices);
});
export var initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat3Length = getMatrix3DataSize(), mat4Length = getMatrix4DataSize(), cameraPositionLength = getVector3DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat3Length + mat4Length * 2 + cameraPositionLength));
    createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=lightRenderComandBufferUtils.js.map