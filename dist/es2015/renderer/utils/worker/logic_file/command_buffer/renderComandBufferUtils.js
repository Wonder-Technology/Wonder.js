import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getComponent, getMaterial, getTransform } from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import { initData as initBasicRenderComandBufferData } from "./basicRenderComandBufferUtils";
import { initData as initLightRenderComandBufferData } from "./lightRenderComandBufferUtils";
import { getCurrentCamera } from "../../../../../core/entityObject/scene/SceneSystem";
import { getComponentIdFromClass } from "../../../../../component/ComponentComponentIdManager";
import { CameraController } from "../../../../../component/camera/CameraController";
import { getPMatrix, getWorldToCameraMatrix } from "../../../../../component/camera/CameraControllerSystem";
import { getNormalMatrix, getPosition } from "../../../../../component/transform/ThreeDTransformSystem";
export var createRenderCommandBufferData = requireCheckFunc(function (state, createBasicRenderCommandBufferData, createLightRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray) {
    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", function () {
        expect(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount);
    });
}, function (state, createBasicRenderCommandBufferData, createLightRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray) {
    var basicMaterialGameObjectArr = [], lightMaterialGameObjectArr = [], vMatrix = null, pMatrix = null, cameraPosition = null, normalMatrix = null, currentCameraUId = getCurrentCamera(SceneData).uid, currentCameraComponent = getComponent(currentCameraUId, getComponentIdFromClass(CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = getTransform(currentCameraUId, GameObjectData);
    vMatrix = getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).values;
    pMatrix = getPMatrix(currentCameraIndex, CameraData).values;
    cameraPosition = getPosition(currentCameraTransform, ThreeDTransformData).values;
    normalMatrix = getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData).values;
    for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
        var gameObject = renderGameObjectArray_1[_i];
        var material = getMaterial(gameObject.uid, GameObjectData);
        if (ClassUtils.getClassNameByInstance(material) === "BasicMaterial") {
            basicMaterialGameObjectArr.push(gameObject);
        }
        else {
            lightMaterialGameObjectArr.push(gameObject);
        }
    }
    return {
        cameraData: {
            vMatrix: vMatrix,
            pMatrix: pMatrix,
            cameraPosition: cameraPosition,
            normalMatrix: normalMatrix
        },
        basicData: createBasicRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, basicMaterialGameObjectArr),
        lightData: createLightRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, LightRenderCommandBufferData, lightMaterialGameObjectArr)
    };
});
export var initData = function (DataBufferConfig, BasicRenderCommandBufferData, LightRenderCommandBufferData) {
    initBasicRenderComandBufferData(DataBufferConfig, BasicRenderCommandBufferData);
    initLightRenderComandBufferData(DataBufferConfig, LightRenderCommandBufferData);
};
//# sourceMappingURL=renderComandBufferUtils.js.map