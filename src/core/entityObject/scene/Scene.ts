import { GameObject } from "../gameObject/GameObject";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { isAlive } from "../gameObject/GameObjectSystem";
import { GameObjectData } from "../gameObject/GameObjectData";
import { addChild, removeChild } from "./SceneSystem";
import { expect } from "wonder-expect.js";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";
import { SceneData } from "./SceneData";

export class Scene extends GameObject {
}

export var addSceneChild = requireCheckFunc((scene: Scene, gameObject: GameObject) => {
    it("scene should alive", () => {
        expect(isAlive(scene, GameObjectData)).true;
    });
}, (scene: Scene, gameObject: GameObject) => {
    addChild(scene, gameObject, ThreeDTransformData, GameObjectData, SceneData);
})

export var removeSceneChild = requireCheckFunc((scene: Scene, gameObject: GameObject) => {
    it("scene should alive", () => {
        expect(isAlive(scene, GameObjectData)).true;
    });
}, (scene: Scene, gameObject: GameObject) => {
    removeChild(scene.uid, gameObject.uid, ThreeDTransformData, GameObjectData);
})
