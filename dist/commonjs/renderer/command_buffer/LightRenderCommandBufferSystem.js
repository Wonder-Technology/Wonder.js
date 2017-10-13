"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var GameObjectSystem_1 = require("../../core/entityObject/gameObject/GameObjectSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var lightRenderComandBufferUtils_1 = require("../utils/command_buffer/lightRenderComandBufferUtils");
var ClassUtils_1 = require("../../utils/ClassUtils");
var lightRenderComandBufferUtils_2 = require("../utils/worker/logic_file/command_buffer/lightRenderComandBufferUtils");
exports.createRenderCommandBufferData = curry_1.default(contract_1.requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    contract_1.it("renderGameObject should be light material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            wonder_expect_js_1.expect(ClassUtils_1.ClassUtils.getClassNameByInstance(GameObjectSystem_1.getMaterial(gameObject.uid, GameObjectData))).equal("LightMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    return lightRenderComandBufferUtils_2.createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, function (count, buffer, materialIndices, geometryIndices, mMatrices) {
        return lightRenderComandBufferUtils_1.buildRenderCommandBufferForDrawData(count, materialIndices, geometryIndices, mMatrices);
    });
}), 11);
exports.initData = lightRenderComandBufferUtils_2.initData;
//# sourceMappingURL=LightRenderCommandBufferSystem.js.map