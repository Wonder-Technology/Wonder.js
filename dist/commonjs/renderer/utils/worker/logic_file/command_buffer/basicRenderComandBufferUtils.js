"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeArrayUtils_1 = require("../../../../../utils/typeArrayUtils");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ClassUtils_1 = require("../../../../../utils/ClassUtils");
var GameObjectSystem_1 = require("../../../../../core/entityObject/gameObject/GameObjectSystem");
var ThreeDTransformSystem_1 = require("../../../../../component/transform/ThreeDTransformSystem");
var basicRenderComandBufferUtils_1 = require("../../../command_buffer/basicRenderComandBufferUtils");
var arrayBufferUtils_1 = require("../../../../../utils/arrayBufferUtils");
exports.createRenderCommandBufferData = contract_1.requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    contract_1.it("renderGameObject should be basic material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            wonder_expect_js_1.expect(ClassUtils_1.ClassUtils.getClassNameByInstance(GameObjectSystem_1.getMaterial(gameObject.uid, GameObjectData))).equal("BasicMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, buildRenderCommandBufferForDrawData) {
    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, materialIndices = RenderCommandBufferData.materialIndices, geometryIndices = RenderCommandBufferData.geometryIndices, mat4Length = typeArrayUtils_1.getMatrix4DataSize();
    for (var i = 0; i < count; i++) {
        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], uid = gameObject.uid, geometry = GameObjectSystem_1.getGeometry(uid, GameObjectData), material = GameObjectSystem_1.getMaterial(uid, GameObjectData), transform = GameObjectSystem_1.getTransform(uid, GameObjectData), materialIndex = material.index;
        typeArrayUtils_1.setMatrices(mMatrices, ThreeDTransformSystem_1.getLocalToWorldMatrix(transform, ThreeDTransformSystem_1.getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
        materialIndices[i] = materialIndex;
        geometryIndices[i] = geometry.index;
    }
    return buildRenderCommandBufferForDrawData(count, buffer, materialIndices, geometryIndices, mMatrices);
});
exports.initData = function (DataBufferConfig, RenderCommandBufferData) {
    var mat4Length = typeArrayUtils_1.getMatrix4DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 2, buffer = null, count = DataBufferConfig.renderCommandBufferCount;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat4Length * 2));
    basicRenderComandBufferUtils_1.createTypeArrays(buffer, DataBufferConfig, RenderCommandBufferData);
    RenderCommandBufferData.buffer = buffer;
};
//# sourceMappingURL=basicRenderComandBufferUtils.js.map