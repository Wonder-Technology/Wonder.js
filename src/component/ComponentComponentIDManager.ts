import { ClassUtils } from "../utils/ClassUtils";
import { Component } from "./Component";

var _generateComponentID = () => {
    var result = _componentID;

    _componentID += 1;

    return String(result);
}

export var getComponentIDFromClass = (_class: any) => {
    return _table[ClassUtils.getClassNameByClass(_class)];
}

export var getComponentIDFromComponent = (component: Component) => {
    return _table[ClassUtils.getClassNameByInstance(component)];
}

var _addComponentID = (componentClassNameArr: Array<string>, table: object) => {
    var id = _generateComponentID();

    for (let className of componentClassNameArr) {
        table[className] = id;
    }
}

var _componentID = 1;
const _table = {};

_addComponentID(["ThreeDTransform"], _table);
_addComponentID(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addComponentID(["Material", "BasicMaterial", "LightMaterial"], _table);
_addComponentID(["MeshRenderer"], _table);
_addComponentID(["Tag"], _table);
_addComponentID(["CameraController"], _table);
_addComponentID(["Light", "AmbientLight", "DirectionLight"], _table);
