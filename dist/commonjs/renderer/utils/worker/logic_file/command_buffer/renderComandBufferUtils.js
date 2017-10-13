"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBufferConfig_1 = require("../../../../../config/DataBufferConfig");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var GameObjectSystem_1 = require("../../../../../core/entityObject/gameObject/GameObjectSystem");
var ClassUtils_1 = require("../../../../../utils/ClassUtils");
var basicRenderComandBufferUtils_1 = require("./basicRenderComandBufferUtils");
var lightRenderComandBufferUtils_1 = require("./lightRenderComandBufferUtils");
var SceneSystem_1 = require("../../../../../core/entityObject/scene/SceneSystem");
var ComponentComponentIdManager_1 = require("../../../../../component/ComponentComponentIdManager");
var CameraController_1 = require("../../../../../component/camera/CameraController");
var CameraControllerSystem_1 = require("../../../../../component/camera/CameraControllerSystem");
var ThreeDTransformSystem_1 = require("../../../../../component/transform/ThreeDTransformSystem");
exports.createRenderCommandBufferData = contract_1.requireCheckFunc(function (state, createBasicRenderCommandBufferData, createLightRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray) {
    contract_1.it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", function () {
        wonder_expect_js_1.expect(renderGameObjectArray.length).lte(DataBufferConfig_1.DataBufferConfig.renderCommandBufferCount);
    });
}, function (state, createBasicRenderCommandBufferData, createLightRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray) {
    var basicMaterialGameObjectArr = [], lightMaterialGameObjectArr = [], vMatrix = null, pMatrix = null, cameraPosition = null, normalMatrix = null, currentCameraUId = SceneSystem_1.getCurrentCamera(SceneData).uid, currentCameraComponent = GameObjectSystem_1.getComponent(currentCameraUId, ComponentComponentIdManager_1.getComponentIdFromClass(CameraController_1.CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = GameObjectSystem_1.getTransform(currentCameraUId, GameObjectData);
    vMatrix = CameraControllerSystem_1.getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).values;
    pMatrix = CameraControllerSystem_1.getPMatrix(currentCameraIndex, CameraData).values;
    cameraPosition = ThreeDTransformSystem_1.getPosition(currentCameraTransform, ThreeDTransformData).values;
    normalMatrix = ThreeDTransformSystem_1.getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData).values;
    for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
        var gameObject = renderGameObjectArray_1[_i];
        var material = GameObjectSystem_1.getMaterial(gameObject.uid, GameObjectData);
        if (ClassUtils_1.ClassUtils.getClassNameByInstance(material) === "BasicMaterial") {
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
exports.initData = function (DataBufferConfig, BasicRenderCommandBufferData, LightRenderCommandBufferData) {
    basicRenderComandBufferUtils_1.initData(DataBufferConfig, BasicRenderCommandBufferData);
    lightRenderComandBufferUtils_1.initData(DataBufferConfig, LightRenderCommandBufferData);
};
//# sourceMappingURL=renderComandBufferUtils.js.map