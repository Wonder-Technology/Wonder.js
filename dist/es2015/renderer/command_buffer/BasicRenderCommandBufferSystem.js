import { getMaterial } from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { buildRenderCommandBufferForDrawData } from "../utils/command_buffer/basicRenderComandBufferUtils";
import { ClassUtils } from "../../utils/ClassUtils";
import { createRenderCommandBufferData as createRenderCommandBufferDataUtils, initData as initDataUtils } from "../utils/worker/logic_file/command_buffer/basicRenderComandBufferUtils";
export var createRenderCommandBufferData = requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    it("renderGameObject should be basic material gameObject", function () {
        for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
            var gameObject = renderGameObjectArray_1[_i];
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject, GameObjectData))).equal("BasicMaterial");
        }
    });
}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
    return createRenderCommandBufferDataUtils(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, function (count, buffer, materialIndices, geometryIndices, mMatrices) {
        return buildRenderCommandBufferForDrawData(count, materialIndices, geometryIndices, mMatrices);
    });
});
export var initData = initDataUtils;
//# sourceMappingURL=BasicRenderCommandBufferSystem.js.map