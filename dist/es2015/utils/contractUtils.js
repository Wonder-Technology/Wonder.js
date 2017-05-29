import { it } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isAlive } from "../core/entityObject/gameObject/GameObjectSystem";
export var checkGameObjectShouldAlive = function (gameObject, GameObjectData) {
    it("gameObject is diposed, should release it", function () {
        expect(isAlive(gameObject, GameObjectData)).true;
    });
};
//# sourceMappingURL=contractUtils.js.map