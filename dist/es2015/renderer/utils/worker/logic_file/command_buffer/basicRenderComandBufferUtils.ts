import { getMatrix4DataSize, setMatrices } from "../../../../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import {
    getGeometry, getMaterial,
    getTransform
} from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { getLocalToWorldMatrix, getTempLocalToWorldMatrix } from "../../../../../component/transform/ThreeDTransformSystem";
import { Map } from "immutable";
import { createTypeArrays } from "../../../command_buffer/basicRenderComandBufferUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../../../../utils/arrayBufferUtils";
import { GameObject } from "../../../../../core/entityObject/gameObject/GameObject";

export var createRenderCommandBufferData = requireCheckFunc((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>, buildRenderCommandBufferForDrawData: Function) => {
    it("renderGameObject should be basic material gameObject", () => {
        for (let gameObject of renderGameObjectArray) {
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject, GameObjectData))).equal("BasicMaterial")
        }
    })
}, (state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>, buildRenderCommandBufferForDrawData: Function) => {
    var count = renderGameObjectArray.length,
        buffer: any = RenderCommandBufferData.buffer,
        mMatrices = RenderCommandBufferData.mMatrices,
        materialIndices = RenderCommandBufferData.materialIndices,
        geometryIndices = RenderCommandBufferData.geometryIndices,
        mat4Length = getMatrix4DataSize();

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

    return buildRenderCommandBufferForDrawData(count, buffer, materialIndices, geometryIndices, mMatrices);
})

export var initData = (DataBufferConfig: any, RenderCommandBufferData: any) => {
    var mat4Length = getMatrix4DataSize(),
        size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2,
        buffer: any = null,
        count = DataBufferConfig.renderCommandBufferCount;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat4Length * 2));

    createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);

    RenderCommandBufferData.buffer = buffer;
}
