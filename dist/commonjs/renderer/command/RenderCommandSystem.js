"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var RenderCommand_1 = require("./RenderCommand");
var GameObjectSystem_1 = require("../../core/entityObject/gameObject/GameObjectSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
var ThreeDTransformSystem_1 = require("../../component/transform/ThreeDTransformSystem");
var SceneSystem_1 = require("../../core/entityObject/scene/SceneSystem");
var CameraControllerSystem_1 = require("../../component/camera/CameraControllerSystem");
var ComponentTypeIdManager_1 = require("../../component/ComponentTypeIdManager");
var CameraController_1 = require("../../component/camera/CameraController");
var arrayUtils_1 = require("../../utils/arrayUtils");
exports.createRenderCommands = contract_1.requireCheckFunc(curry_1.default(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, renderGameObjectArray) {
    arrayUtils_1.forEach(renderGameObjectArray, function (gameObject) {
        var geometry = GameObjectSystem_1.getGeometry(gameObject, GameObjectData), material = GameObjectSystem_1.getMaterial(gameObject, GameObjectData);
        contract_1.it("geometry should exist in gameObject", function () {
            wonder_expect_js_1.expect(geometry).exist;
        });
        contract_1.it("material should exist in gameObject", function () {
            wonder_expect_js_1.expect(material).exist;
        });
    });
}), curry_1.default(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, renderGameObjectArray) {
    var commandArr = [];
    for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
        var gameObject = renderGameObjectArray_1[_i];
        var command = new RenderCommand_1.RenderCommand(), currentCamera = GameObjectSystem_1.getComponent(SceneSystem_1.getCurrentCamera(SceneData), ComponentTypeIdManager_1.getTypeIDFromClass(CameraController_1.CameraController), GameObjectData), currentCameraIndex = currentCamera.index, geometry = GameObjectSystem_1.getGeometry(gameObject, GameObjectData), material = GameObjectSystem_1.getMaterial(gameObject, GameObjectData), transform = GameObjectSystem_1.getTransform(gameObject, GameObjectData), materialIndex = material.index, shader = MaterialSystem_1.getShader(materialIndex, MaterialData);
        command.mMatrix = ThreeDTransformSystem_1.getLocalToWorldMatrix(transform, ThreeDTransformSystem_1.getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData).values;
        command.vMatrix = CameraControllerSystem_1.getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).values;
        command.pMatrix = CameraControllerSystem_1.getPMatrix(currentCameraIndex, CameraData).values;
        command.drawMode = GeometrySystem_1.getDrawMode(geometry, GeometryData);
        command.materialIndex = materialIndex;
        command.shaderIndex = shader.index;
        command.geometryIndex = geometry.index;
        commandArr.push(command);
    }
    return commandArr;
}));
//# sourceMappingURL=RenderCommandSystem.js.map