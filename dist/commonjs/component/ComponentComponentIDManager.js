"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassUtils_1 = require("../utils/ClassUtils");
var _generateComponentID = function () {
    var result = _componentID;
    _componentID += 1;
    return String(result);
};
exports.getComponentIDFromClass = function (_class) {
    return _table[ClassUtils_1.ClassUtils.getClassNameByClass(_class)];
};
exports.getComponentIDFromComponent = function (component) {
    return _table[ClassUtils_1.ClassUtils.getClassNameByInstance(component)];
};
var _addComponentID = function (componentClassNameArr, table) {
    var id = _generateComponentID();
    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
        var className = componentClassNameArr_1[_i];
        table[className] = id;
    }
};
var _componentID = 1;
var _table = {};
_addComponentID(["ThreeDTransform"], _table);
_addComponentID(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addComponentID(["Material", "BasicMaterial", "LightMaterial"], _table);
_addComponentID(["MeshRenderer"], _table);
_addComponentID(["Tag"], _table);
_addComponentID(["CameraController"], _table);
_addComponentID(["Light", "AmbientLight", "DirectionLight", "PointLight"], _table);
//# sourceMappingURL=ComponentComponentIDManager.js.map