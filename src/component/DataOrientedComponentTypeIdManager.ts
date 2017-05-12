import { ClassUtils } from "../utils/ClassUtils";
import { DataOrientedComponent } from "./DataOrientedComponent";

var _generateTypeId = () => {
    var result = _typeId;

    _typeId += 1;

    return String(result);
}

export var getTypeIdFromClass = (_class: any) => {
    return _table[ClassUtils.getClassNameByClass(_class)];
}

export var getTypeIdFromComponent = (component: DataOrientedComponent) => {
    return _table[ClassUtils.getClassNameByInstance(component)];
}

var _typeId = 1;
const _table = {};

_table["ThreeDTransform"] = _generateTypeId();
