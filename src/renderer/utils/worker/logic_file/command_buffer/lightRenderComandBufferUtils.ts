import {
    getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize, setMatrices, setMatrices3,
    setVectors
} from "../../../../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import {
    getComponent, getGeometry, getMaterial,
    getTransform
} from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { getCurrentCamera } from "../../../../../core/entityObject/scene/SceneSystem";
import { getComponentIDFromClass } from "../../../../../component/ComponentComponentIDManager";
import { getPMatrix, getWorldToCameraMatrix } from "../../../../../component/camera/CameraControllerSystem";
import {
    getLocalToWorldMatrix, getNormalMatrix, getPosition,
    getTempLocalToWorldMatrix
} from "../../../../../component/transform/ThreeDTransformSystem";
import { CameraController } from "../../../../../component/camera/CameraController";
import { Map } from "immutable";
import { createSharedArrayBufferOrArrayBuffer } from "../../../../../utils/arrayBufferUtils";
import { createTypeArrays } from "../../../command_buffer/lightRenderComandBufferUtils";
import { GameObject } from "../../../../../core/entityObject/gameObject/GameObject";

export var createRenderCommandBufferData = requireCheckFunc((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>, buildRenderCommandBufferForDrawData:Function) => {
    it("renderGameObject should be light material gameObject", () => {
        for(let gameObject of renderGameObjectArray) {
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject, GameObjectData))).equal("LightMaterial")
        }
    })
}, (state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>, buildRenderCommandBufferForDrawData:Function) => {
    var count = renderGameObjectArray.length,
        buffer: any = RenderCommandBufferData.buffer,
        mMatrices = RenderCommandBufferData.mMatrices,
        vMatrices = RenderCommandBufferData.vMatrices,
        pMatrices = RenderCommandBufferData.pMatrices,
        cameraPositions = RenderCommandBufferData.cameraPositions,
        normalMatrices = RenderCommandBufferData.normalMatrices,
        materialIndices = RenderCommandBufferData.materialIndices,
        geometryIndices = RenderCommandBufferData.geometryIndices,
        currentCamera = getCurrentCamera(SceneData),
        currentCameraComponent = getComponent(currentCamera, getComponentIDFromClass(CameraController), GameObjectData),
        currentCameraIndex = currentCameraComponent.index,
        currentCameraTransform = getTransform(currentCamera, GameObjectData),
        mat4Length = getMatrix4DataSize();

    setMatrices(vMatrices, getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    setMatrices(pMatrices, getPMatrix(currentCameraIndex, CameraData), 0);
    setVectors(cameraPositions, getPosition(currentCameraTransform, ThreeDTransformData), 0);
    setMatrices3(normalMatrices, getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData), 0);

    for (let i = 0; i < count; i++) {
        let matIndex = mat4Length * i,
            gameObject = renderGameObjectArray[i],
            geometry = getGeometry(gameObject, GameObjectData),
            material = getMaterial(gameObject, GameObjectData),
            transform = getTransform(gameObject, GameObjectData),
            materialIndex = material.index;

        setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);

        materialIndices[i] = materialIndex;
        geometryIndices[i] = geometry.index;
    }

    return buildRenderCommandBufferForDrawData(count, buffer, materialIndices, geometryIndices, mMatrices, vMatrices, pMatrices, cameraPositions, normalMatrices);
})

export var initData = (DataBufferConfig: any, RenderCommandBufferData: any) => {
    var mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2,
        buffer: any = null,
        count = DataBufferConfig.renderCommandBufferCount;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat3Length + mat4Length * 2 + cameraPositionLength));

    createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);

    RenderCommandBufferData.buffer = buffer;
}
