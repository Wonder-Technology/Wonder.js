import { ClassUtils } from "../utils/ClassUtils";
import { Component } from "./Component";

var _generateTypeID = () => {
    var result = _typeID;

    _typeID += 1;

    return String(result);
}

export var getTypeIDFromClass = (_class: any) => {
    return _table[ClassUtils.getClassNameByClass(_class)];
}

export var getTypeIDFromComponent = (component: Component) => {
    return _table[ClassUtils.getClassNameByInstance(component)];
}

var _addTypeID = (componentClassNameArr: Array<string>, table: object) => {
    var id = _generateTypeID();

    for (let className of componentClassNameArr) {
        table[className] = id;
    }
}

var _typeID = 1;
const _table = {};

_addTypeID(["ThreeDTransform"], _table);
_addTypeID(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addTypeID(["Material", "BasicMaterial", "LightMaterial"], _table);
_addTypeID(["MeshRenderer"], _table);
_addTypeID(["Tag"], _table);
_addTypeID(["CameraController"], _table);
_addTypeID(["Light", "AmbientLight", "PointLight", "DirectionLight"], _table);
