import curry from "wonder-lodash/curry";
import { getComponent, getGeometry, getMaterial, getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getLocalToWorldMatrix, getNormalMatrix, getPosition, getTempLocalToWorldMatrix } from "../../component/transform/ThreeDTransformSystem";
import { getCurrentCamera } from "../../core/entityObject/scene/SceneSystem";
import { getPMatrix, getWorldToCameraMatrix } from "../../component/camera/CameraControllerSystem";
import { CameraController } from "../../component/camera/CameraController";
import { getShaderIndex } from "../../component/material/MaterialSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize, setMatrices, setMatrices3, setVectors } from "../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createTypeArrays } from "../utils/draw/renderComandBufferUtils";
import { getComponentIDFromClass } from "../../component/ComponentComponentIDManager";
export var createRenderCommandBufferData = curry(requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", function () {
        expect(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount);
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, vMatrices = RenderCommandBufferData.vMatrices, pMatrices = RenderCommandBufferData.pMatrices, cameraPositions = RenderCommandBufferData.cameraPositions, normalMatrices = RenderCommandBufferData.normalMatrices, materialIndices = RenderCommandBufferData.materialIndices, shaderIndices = RenderCommandBufferData.shaderIndices, geometryIndices = RenderCommandBufferData.geometryIndices, currentCamera = getCurrentCamera(SceneData), currentCameraComponent = getComponent(currentCamera, getComponentIDFromClass(CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = getTransform(currentCamera, GameObjectData), mat4Length = getMatrix4DataSize();
    setMatrices(vMatrices, getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    setMatrices(pMatrices, getPMatrix(currentCameraIndex, CameraData), 0);
    setVectors(cameraPositions, getPosition(currentCameraTransform, ThreeDTransformData), 0);
    setMatrices3(normalMatrices, getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData), 0);
    for (var i = 0; i < count; i++) {
        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], geometry = getGeometry(gameObject, GameObjectData), material = getMaterial(gameObject, GameObjectData), transform = getTransform(gameObject, GameObjectData), materialIndex = material.index, shaderIndex = getShaderIndex(materialIndex, MaterialData);
        setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
        materialIndices[i] = materialIndex;
        shaderIndices[i] = shaderIndex;
        geometryIndices[i] = geometry.index;
    }
    return {
        buffer: buffer,
        count: count
    };
}), 11);
export var initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat3Length = getMatrix3DataSize(), mat4Length = getMatrix4DataSize(), cameraPositionLength = getVector3DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat3Length + mat4Length * 2 + cameraPositionLength));
    createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=RenderCommandBufferSystem.js.map