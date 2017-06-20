import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    getComponent, getGeometry, getMaterial,
    getTransform
} from "../../core/entityObject/gameObject/GameObjectSystem";
import {
    getLocalToWorldMatrix,
    getTempLocalToWorldMatrix
} from "../../component/transform/ThreeDTransformSystem";
import { getCurrentCamera } from "../../core/entityObject/scene/SceneSystem";
import {
    getPMatrix, getWorldToCameraMatrix
} from "../../component/camera/CameraControllerSystem";
import { getTypeIDFromClass } from "../../component/ComponentTypeIDManager";
import { CameraController } from "../../component/camera/CameraController";
import { IRenderConfig } from "../data/render_config";
import { getShaderIndex } from "../../component/material/MaterialSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { getMatrix4DataSize, setMatrices } from "../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";

export var createRenderCommandBufferData = curry(requireCheckFunc((state: Map<any, any>, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", () => {
        expect(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount)
    })
}, (state: Map<any, any>, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    var count = renderGameObjectArray.length,
        buffer: any = RenderCommandBufferData.buffer,
        mMatrices = RenderCommandBufferData.mMatrices,
        vMatrices = RenderCommandBufferData.vMatrices,
        pMatrices = RenderCommandBufferData.pMatrices,
        materialIndices = RenderCommandBufferData.materialIndices,
        shaderIndices = RenderCommandBufferData.shaderIndices,
        geometryIndices = RenderCommandBufferData.geometryIndices,
        currentCamera = getComponent(getCurrentCamera(SceneData), getTypeIDFromClass(CameraController), GameObjectData),
        currentCameraIndex = currentCamera.index,
        mat4Length = getMatrix4DataSize();

    setMatrices(vMatrices, getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
    setMatrices(pMatrices, getPMatrix(currentCameraIndex, CameraData), 0);

    for (let i = 0; i < count; i++) {
        let matIndex = mat4Length * i,
            gameObject = renderGameObjectArray[i],
            geometry = getGeometry(gameObject, GameObjectData),
            material = getMaterial(gameObject, GameObjectData),
            transform = getTransform(gameObject, GameObjectData),
            materialIndex = material.index,
            shaderIndex = getShaderIndex(materialIndex, MaterialData);

        setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);

        materialIndices[i] = materialIndex;
        shaderIndices[i] = shaderIndex;
        geometryIndices[i] = geometry.index;
    }

    return {
        buffer: buffer,
        count: count
    }
}), 10)

export var initData = (DataBufferConfig: any, RenderCommandBufferData: any) => {
    var mat4Length = getMatrix4DataSize(),
        size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3,
        buffer: any = null,
        count = DataBufferConfig.renderCommandBufferCount;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size + 2 * Float32Array.BYTES_PER_ELEMENT * mat4Length);

    RenderCommandBufferData.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
    RenderCommandBufferData.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
    RenderCommandBufferData.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
    RenderCommandBufferData.materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count);
    RenderCommandBufferData.shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count);
    RenderCommandBufferData.geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);

    RenderCommandBufferData.buffer = buffer;
}
