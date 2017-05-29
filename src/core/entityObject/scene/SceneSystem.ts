import {
    create as createGameObject, addChild as addGameObject, removeChild as removeGameObject,
    hasComponent
} from "../gameObject/GameObjectSystem";
import { GameObject } from "../gameObject/GameObject";
import { getTypeIDFromClass } from "../../../component/ComponentTypeIdManager";
import { CameraController } from "../../../component/camera/CameraController";
import { Scene } from "./Scene";
import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var create = (GameObjectData: any) => {
    return createGameObject(null, GameObjectData);
}

export var addChild = (scene: Scene, child: GameObject, GameObjectData: any, SceneData: any) => {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }

    addGameObject(scene, child, null, GameObjectData);
}

export var removeChild = (gameObject: GameObject, child: GameObject, ThreeDTransformData: any, GameObjectData: any) => {
    removeGameObject(gameObject, child, ThreeDTransformData, GameObjectData);
}

var _isCamera = (gameObject: GameObject, GameObjectData: any) => {
    return hasComponent(gameObject, getTypeIDFromClass(CameraController), GameObjectData);
}

export var getCurrentCamera = ensureFunc((camera: GameObject, SceneData: any) => {
    it("current camera should exist", () => {
        expect(camera).exist;
    });
}, (SceneData: any) => {
    return SceneData.cameraArray[0];
})

export var initData = (SceneData: any) => {
    SceneData.cameraArray = [];
}
