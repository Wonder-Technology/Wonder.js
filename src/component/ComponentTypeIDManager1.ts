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

var _addTypeId = (componentClassNameArr: Array<string>, table: object) => {
    var id = _generateTypeId();

    for (let className of componentClassNameArr) {
        table[className] = id;
    }
}

var _typeId = 1;
const _table = {};

_addTypeId(["ThreeDTransform"], _table);
_addTypeId(["BoxGeometry"], _table);
_addTypeId(["CustomGeometry"], _table);
_addTypeId(["BasicMaterial"], _table);
_addTypeId(["LightMaterial"], _table);
_addTypeId(["MeshRenderer"], _table);
_addTypeId(["Tag"], _table);
_addTypeId(["CameraController"], _table);
_addTypeId(["AmbientLight"], _table);
_addTypeId(["DirectionLight"], _table);
_addTypeId(["PointLight"], _table);
