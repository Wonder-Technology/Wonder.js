"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObjectSystem_1 = require("../gameObject/GameObjectSystem");
var CameraController_1 = require("../../../component/camera/CameraController");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentComponentIdManager_1 = require("../../../component/ComponentComponentIdManager");
exports.create = function (GameObjectData) {
    return GameObjectSystem_1.create(null, GameObjectData);
};
exports.addChild = function (scene, child, ThreeDTransformData, GameObjectData, SceneData) {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }
    GameObjectSystem_1.addChild(scene, child, ThreeDTransformData, GameObjectData);
};
exports.removeChild = function (parentUId, childUId, ThreeDTransformData, GameObjectData) {
    GameObjectSystem_1.removeChild(parentUId, childUId, ThreeDTransformData, GameObjectData);
};
var _isCamera = function (gameObject, GameObjectData) {
    return GameObjectSystem_1.hasComponent(gameObject, ComponentComponentIdManager_1.getComponentIdFromClass(CameraController_1.CameraController), GameObjectData);
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