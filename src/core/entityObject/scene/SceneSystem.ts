import {
    create as createGameObject, addChild as addGameObject, removeChild as removeGameObject,
    hasComponent
} from "../gameObject/GameObjectSystem";
import { GameObject } from "../gameObject/GameObject";
import { CameraController } from "../../../component/camera/CameraController";
import { Scene } from "./Scene";
import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getComponentIdFromClass } from "../../../component/ComponentComponentIdManager";

export const create = (GameObjectData: any) => {
    return createGameObject(null, GameObjectData);
}

export const addChild = (scene: Scene, child: GameObject, ThreeDTransformData: any, GameObjectData: any, SceneData: any) => {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }

    addGameObject(scene, child, ThreeDTransformData, GameObjectData);
}

export const removeChild = (parentUId: number, childUId: number, ThreeDTransformData: any, GameObjectData: any) => {
    removeGameObject(parentUId, childUId, ThreeDTransformData, GameObjectData);
}

const _isCamera = (gameObject: GameObject, GameObjectData: any) => {
    return hasComponent(gameObject, getComponentIdFromClass(CameraController), GameObjectData);
}

export const getCurrentCamera = ensureFunc((camera: GameObject, SceneData: any) => {
    it("current camera should exist", () => {
        expect(camera).exist;
    });
}, (SceneData: any) => {
    return SceneData.cameraArray[0];
})

export const initData = (SceneData: any) => {
    SceneData.cameraArray = [];
}
