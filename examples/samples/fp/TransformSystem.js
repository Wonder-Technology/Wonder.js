import flow from "lodash-es/flow";
import { TransformData } from "./TransformData";
import curry from "lodash-es/curry";
import range from "lodash-es/range";
import curryRight from "lodash-es/curryRight";
import forEach from "lodash-es/forEach";
var _data = TransformData.of();
var _dirtyList = [];
export var setPosition = function (indexInArrayBuffer, position) {
    _data.positions[indexInArrayBuffer] = position;
};
export var getPosition = function (indexInArrayBuffer) {
    return _data.positions[indexInArrayBuffer];
};
var push = function (arr, target) {
    arr.push(target);
};
var pushToDirtyList = curry(push)(_dirtyList);
export var transform = function (indexInArrayBuffer) {
    var positions = _data.positions;
    var calcute = function (index, result) {
        if (index < 0) {
            return result;
        }
        return calcute(index - 1, result + positions[index]);
    };
    return calcute(indexInArrayBuffer, 0);
};
var getTransformCount = function (world) {
    return world.getCount();
};
export var transformData = function (world, data) {
    var positions = data.positions;
    var calcute = function (index, result) {
        if (index < 0) {
            return result;
        }
        return calcute(index - 1, result + positions[index]);
    };
    forEach(range(0, getTransformCount(world) - 1), function (value, index) {
        pushToDirtyList(value);
        setPosition(value, calcute(value, 0));
    });
    return world;
};
var clean = function (dirtyList, indexInArrayBuffer) {
    dirtyList[indexInArrayBuffer] = void 0;
};
var cleanDirty = curry(clean)(_dirtyList);
var cleanAllDirty = function (world) {
    forEach(range(0, getTransformCount(world) - 1), function (value, index) {
        cleanDirty(value);
    });
};
export var updateTransform = flow(curryRight(transformData)(_data), cleanAllDirty);
//# sourceMappingURL=TransformSystem.js.map