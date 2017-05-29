import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { it } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isAlive } from "../core/entityObject/gameObject/GameObjectSystem";
import { GameObjectData } from "../core/entityObject/gameObject/GameObjectData";

export var checkGameObjectShouldAlive = (gameObject: GameObject, GameObjectData: any) => {
    it("gameObject is diposed, should release it", () => {
        expect(isAlive(gameObject, GameObjectData)).true;
    });
}
