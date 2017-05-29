"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var GameObjectSystem_1 = require("../core/entityObject/gameObject/GameObjectSystem");
exports.checkGameObjectShouldAlive = function (gameObject, GameObjectData) {
    contract_1.it("gameObject is diposed, should release it", function () {
        wonder_expect_js_1.expect(GameObjectSystem_1.isAlive(gameObject, GameObjectData)).true;
    });
};
//# sourceMappingURL=contractUtils.js.map