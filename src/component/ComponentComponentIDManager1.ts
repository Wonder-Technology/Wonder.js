import { ClassUtils } from "../utils/ClassUtils";
import { Component } from "./Component";

var _generateComponentId = () => {
    var result = _componentId;

    _componentId += 1;

    return String(result);
}

export var getComponentIdFromClass = (_class: any) => {
    return _table[ClassUtils.getClassNameByClass(_class)];
}

export var getComponentIdFromComponent = (component: Component) => {
    return _table[ClassUtils.getClassNameByInstance(component)];
}

var _addComponentId = (componentClassNameArr: Array<string>, table: object) => {
    var id = _generateComponentId();

    for (let className of componentClassNameArr) {
        table[className] = id;
    }
}

var _componentId = 1;
const _table = {};

_addComponentId(["ThreeDTransform"], _table);
_addComponentId(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addComponentId(["Material", "BasicMaterial", "LightMaterial"], _table);
_addComponentId(["MeshRenderer"], _table);
_addComponentId(["Tag"], _table);
_addComponentId(["CameraController"], _table);
_addComponentId(["Light", "AmbientLight", "DirectionLight", "PointLight"], _table);
