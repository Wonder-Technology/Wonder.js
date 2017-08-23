import curry from "wonder-lodash/curry";
import { getMaterial } from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { buildRenderCommandBufferForDrawData } from "../utils/command_buffer/lightRenderComandBufferUtils";
import { ClassUtils } from "../../utils/ClassUtils";
import { createRenderCommandBufferData as createRenderCommandBufferDataUtils, initData as initDataUtils } from "../utils/worker/logic_file/command_buffer/lightRenderComandBufferUtils";
export var createRenderCommandBufferData = curry(requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    it("renderGameObject should be light material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject, GameObjectData))).equal("LightMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    return createRenderCommandBufferDataUtils(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, function (count, buffer, materialIndices, geometryIndices, mMatrices) {
        return buildRenderCommandBufferForDrawData(count, materialIndices, geometryIndices, mMatrices);
    });
}), 11);
export var initData = initDataUtils;
//# sourceMappingURL=LightRenderCommandBufferSystem.js.map