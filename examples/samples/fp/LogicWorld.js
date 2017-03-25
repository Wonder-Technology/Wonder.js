import { updateTransform } from "./TransformSystem";
import flow from "lodash-es/flow";
var LogicWorld = (function () {
    function LogicWorld() {
        this._transforms = [];
    }
    LogicWorld.of = function () {
        var obj = new this();
        return obj;
    };
    LogicWorld.prototype.add = function (tra) {
        this._transforms.push(tra);
    };
    LogicWorld.prototype.getCount = function () {
        return this._transforms.length;
    };
    return LogicWorld;
}());
export { LogicWorld };
export var world = LogicWorld.of();
var updateOther = function () { };
export var updateAll = flow(updateTransform, updateOther);
export var updateLogicWorld = function (world, elapsed) {
    updateAll(world);
};
//# sourceMappingURL=LogicWorld.js.map