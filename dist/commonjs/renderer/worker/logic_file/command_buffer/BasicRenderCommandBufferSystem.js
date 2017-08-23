"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObjectSystem_1 = require("../../../../core/entityObject/gameObject/GameObjectSystem");
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ClassUtils_1 = require("../../../../utils/ClassUtils");
var basicRenderComandBufferUtils_1 = require("../../../utils/worker/logic_file/command_buffer/basicRenderComandBufferUtils");
exports.createRenderCommandBufferData = contract_1.requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    contract_1.it("renderGameObject should be basic material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            wonder_expect_js_1.expect(ClassUtils_1.ClassUtils.getClassNameByInstance(GameObjectSystem_1.getMaterial(gameObject, GameObjectData))).equal("BasicMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    return basicRenderComandBufferUtils_1.createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, function (count, buffer, materialIndices, geometryIndices, mMatrices, vMatrices, pMatrices) {
        return {
            buffer: buffer,
            count: count
        };
    });
});
exports.initData = basicRenderComandBufferUtils_1.initData;
//# sourceMappingURL=BasicRenderCommandBufferSystem.js.map