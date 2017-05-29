var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GameObject } from "../gameObject/GameObject";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { isAlive } from "../gameObject/GameObjectSystem";
import { GameObjectData } from "../gameObject/GameObjectData";
import { addChild, removeChild } from "./SceneSystem";
import { expect } from "wonder-expect.js";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";
import { SceneData } from "./SceneData";
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Scene;
}(GameObject));
export { Scene };
export var addSceneChild = requireCheckFunc(function (scene, gameObject) {
    it("scene should alive", function () {
        expect(isAlive(scene, GameObjectData)).true;
    });
}, function (scene, gameObject) {
    addChild(scene, gameObject, GameObjectData, SceneData);
});
export var removeSceneChild = requireCheckFunc(function (scene, gameObject) {
    it("scene should alive", function () {
        expect(isAlive(scene, GameObjectData)).true;
    });
}, function (scene, gameObject) {
    removeChild(scene, gameObject, ThreeDTransformData, GameObjectData);
});
//# sourceMappingURL=Scene.js.map