import { GameObject } from "../../../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    getComponent, getGeometry, getMaterial,
    getTransform
} from "../../../../core/entityObject/gameObject/GameObjectSystem";
import {
    getLocalToWorldMatrix, getNormalMatrix, getPosition,
    getTempLocalToWorldMatrix
} from "../../../../component/transform/ThreeDTransformSystem";
import { getCurrentCamera } from "../../../../core/entityObject/scene/SceneSystem";
import {
    getPMatrix, getWorldToCameraMatrix
} from "../../../../component/camera/CameraControllerSystem";
import { CameraController } from "../../../../component/camera/CameraController";
import { IRenderConfig } from "../../both_file/data/render_config";
import { getShaderIndex } from "../../../../component/material/MaterialSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../../../utils/arrayBufferUtils";
import {
    getMatrix3DataSize,
    getMatrix4DataSize, getVector3DataSize, setMatrices, setMatrices3,
    setVectors
} from "../../../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../../../config/DataBufferConfig";
import { getComponentIDFromClass } from "../../../../component/ComponentComponentIDManager";
import { createTypeArrays } from "../utils/command_buffer/basicRenderComandBufferUtils";
import { ClassUtils } from "../../../../utils/ClassUtils";

export var createRenderCommandBufferData = requireCheckFunc((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObject should be basic material gameObject", () => {
        for(let gameObject of renderGameObjectArray) {
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject, GameObjectData))).equal("BasicMaterial")
        }
    })
}, (state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    var count = renderGameObjectArray.length,
        buffer: any = RenderCommandBufferData.buffer,
        mMatrices = RenderCommandBufferData.mMatrices,
        vMatrices = RenderCommandBufferData.vMatrices,
        pMatrices = RenderCommandBufferData.pMatrices,
        materialIndices = RenderCommandBufferData.materialIndices,
        geometryIndices = RenderCommandBufferData.geometryIndices,
        currentCamera = getCurrentCamera(SceneData),
        currentCameraComponent = getComponent(currentCamera, getComponentIDFromClass(CameraController), GameObjectData),
        currentCameraIndex = currentCameraComponent.index,
        mat4Length = getMatrix4DataSize();

    setMatrices(vMatrices, getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    setMatrices(pMatrices, getPMatrix(currentCameraIndex, CameraData), 0);

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

    return {
        buffer: buffer,
        count: count
    }
})

export var initData = (DataBufferConfig: any, RenderCommandBufferData: any) => {
    // var mat3Length = getMatrix3DataSize(),
    var mat4Length = getMatrix4DataSize(),
        // cameraPositionLength = getVector3DataSize(),
        size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2,
        buffer: any = null,
        count = DataBufferConfig.renderCommandBufferCount;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat4Length * 2));

    createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);

    RenderCommandBufferData.buffer = buffer;
}
