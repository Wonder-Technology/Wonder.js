import flow from "lodash-es/flow";
import {List} from "immutable";
import {TransformData} from "./TransformData";
import {Transform} from "./Transform";
import curry from "lodash-es/curry";
import range from "lodash-es/range";
import {LogicWorld, world} from "./LogicWorld";
import curryRight from "lodash-es/curryRight";
import forEach from "lodash-es/forEach";


var _data: TransformData = TransformData.of();
// var _dirtyList = List();
var _dirtyList = [];

/*! side effect */
export var setPosition = (indexInArrayBuffer, position: number) => {
    _data.positions[indexInArrayBuffer] = position;
}

/*! side effect */
export var getPosition = (indexInArrayBuffer) => {
    return _data.positions[indexInArrayBuffer];
}

/*! side effect */
var push = (arr: any, target) => {
    arr.push(target);
}

var pushToDirtyList = curry(push)(_dirtyList);


export var transform = (indexInArrayBuffer) => {
    var positions = _data.positions;
    var calcute = (index: number, result: number) => {
        if (index < 0) {
            return result;
        }

        return calcute(index - 1, result + positions[index]);
    };

    // _dirtyList.push(tra);

    return calcute(indexInArrayBuffer, 0);
}


var getTransformCount = (world) => {
    return world.getCount();
}

//todo refactor
/*! side effect */
export var transformData = (world: LogicWorld, data: any) => {
    var positions = data.positions;
    var calcute = (index: number, result: number) => {
        if (index < 0) {
            return result;
        }

        return calcute(index - 1, result + positions[index]);
    };

    /*! side effect */
    // _(range(0, getTransformCount(world) - 1))
    forEach(range(0, getTransformCount(world) - 1), (value, index) => {
        // .forEach((value, index) => {
        pushToDirtyList(value);
        setPosition(value, calcute(value, 0));
    });

    return world;
}


/*! side effect */
// var clean = (dirtyList:List, tra:Transform) => {
var clean = (dirtyList: any, indexInArrayBuffer) => {
    // return dirtyList.remove(tra.indexInArrayBuffer);
    dirtyList[indexInArrayBuffer] = void 0;
}

var cleanDirty = curry(clean)(_dirtyList);

//todo refactor
var cleanAllDirty = (world: LogicWorld) => {
    // chain(range(0, getTransformCount(world) - 1)).forEach((value, index) => {
    forEach(range(0, getTransformCount(world) - 1), (value, index) => {
        cleanDirty(value);
    });
}


export var updateTransform = flow(curryRight(transformData)(_data), cleanAllDirty);
