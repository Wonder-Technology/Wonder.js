import { create as createGameObject, addChild as addGameObject, removeChild as removeGameObject, hasComponent } from "../gameObject/GameObjectSystem";
import { CameraController } from "../../../component/camera/CameraController";
import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getComponentIdFromClass } from "../../../component/ComponentComponentIdManager";
export var create = function (GameObjectData) {
    return createGameObject(null, GameObjectData);
};
export var addChild = function (scene, child, ThreeDTransformData, GameObjectData, SceneData) {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }
    addGameObject(scene, child, ThreeDTransformData, GameObjectData);
};
export var removeChild = function (parentUId, childUId, ThreeDTransformData, GameObjectData) {
    removeGameObject(parentUId, childUId, ThreeDTransformData, GameObjectData);
};
var _isCamera = function (gameObject, GameObjectData) {
    return hasComponent(gameObject, getComponentIdFromClass(CameraController), GameObjectData);
};
export var getCurrentCamera = ensureFunc(function (camera, SceneData) {
    it("current camera should exist", function () {
        expect(camera).exist;
    });
}, function (SceneData) {
    return SceneData.cameraArray[0];
});
export var initData = function (SceneData) {
    SceneData.cameraArray = [];
};
//# sourceMappingURL=SceneSystem.js.map