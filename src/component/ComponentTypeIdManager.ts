import { ClassUtils } from "../utils/ClassUtils";
import { Component } from "./Component";

var _generateTypeId = () => {
    var result = _typeId;

    _typeId += 1;

    return String(result);
}

export var getTypeIdFromClass = (_class: any) => {
    return _table[ClassUtils.getClassNameByClass(_class)];
}

export var getTypeIdFromComponent = (component: Component) => {
    return _table[ClassUtils.getClassNameByInstance(component)];
}

var _typeId = 1;
const _table = {};

_table["ThreeDTransform"] = _generateTypeId();
