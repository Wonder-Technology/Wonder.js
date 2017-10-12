import { getMatrix4DataSize, setMatrices } from "../../../../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import { getGeometry, getMaterial, getTransform } from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { getLocalToWorldMatrix, getTempLocalToWorldMatrix } from "../../../../../component/transform/ThreeDTransformSystem";
import { createTypeArrays } from "../../../command_buffer/basicRenderComandBufferUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../../../../utils/arrayBufferUtils";
export var createRenderCommandBufferData = requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    it("renderGameObject should be basic material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject.uid, GameObjectData))).equal("BasicMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, materialIndices = RenderCommandBufferData.materialIndices, geometryIndices = RenderCommandBufferData.geometryIndices, mat4Length = getMatrix4DataSize();
    for (var i = 0; i < count; i++) {
        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], uid = gameObject.uid, geometry = getGeometry(uid, GameObjectData), material = getMaterial(uid, GameObjectData), transform = getTransform(uid, GameObjectData), materialIndex = material.index;
        setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
        materialIndices[i] = materialIndex;
        geometryIndices[i] = geometry.index;
    }
    return buildRenderCommandBufferForDrawData(count, buffer, materialIndices, geometryIndices, mMatrices);
});
export var initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat4Length = getMatrix4DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat4Length * 2));
    createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=basicRenderComandBufferUtils.js.map