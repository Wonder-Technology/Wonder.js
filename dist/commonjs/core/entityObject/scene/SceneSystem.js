"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObjectSystem_1 = require("../gameObject/GameObjectSystem");
var ComponentTypeIdManager_1 = require("../../../component/ComponentTypeIdManager");
var CameraController_1 = require("../../../component/camera/CameraController");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.create = function (GameObjectData) {
    return GameObjectSystem_1.create(null, GameObjectData);
};
exports.addChild = function (scene, child, GameObjectData, SceneData) {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }
    GameObjectSystem_1.addChild(scene, child, null, GameObjectData);
};
exports.removeChild = function (gameObject, child, ThreeDTransformData, GameObjectData) {
    GameObjectSystem_1.removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
};
var _isCamera = function (gameObject, GameObjectData) {
    return GameObjectSystem_1.hasComponent(gameObject, ComponentTypeIdManager_1.getTypeIDFromClass(CameraController_1.CameraController), GameObjectData);
};
exports.getCurrentCamera = contract_1.ensureFunc(function (camera, SceneData) {
    contract_1.it("current camera should exist", function () {
        wonder_expect_js_1.expect(camera).exist;
    });
}, function (SceneData) {
    return SceneData.cameraArray[0];
});
exports.initData = function (SceneData) {
    SceneData.cameraArray = [];
};
//# sourceMappingURL=SceneSystem.js.map