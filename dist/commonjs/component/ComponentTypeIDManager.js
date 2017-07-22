"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassUtils_1 = require("../utils/ClassUtils");
var _generateTypeID = function () {
    var result = _typeID;
    _typeID += 1;
    return String(result);
};
exports.getTypeIDFromClass = function (_class) {
    return _table[ClassUtils_1.ClassUtils.getClassNameByClass(_class)];
};
exports.getTypeIDFromComponent = function (component) {
    return _table[ClassUtils_1.ClassUtils.getClassNameByInstance(component)];
};
var _addTypeID = function (componentClassNameArr, table) {
    var id = _generateTypeID();
    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
        var className = componentClassNameArr_1[_i];
        table[className] = id;
    }
};
var _typeID = 1;
var _table = {};
_addTypeID(["ThreeDTransform"], _table);
_addTypeID(["BoxGeometry"], _table);
_addTypeID(["CustomGeometry"], _table);
_addTypeID(["BasicMaterial"], _table);
_addTypeID(["LightMaterial"], _table);
_addTypeID(["MeshRenderer"], _table);
_addTypeID(["Tag"], _table);
_addTypeID(["CameraController"], _table);
_addTypeID(["AmbientLight"], _table);
_addTypeID(["DirectionLight"], _table);
_addTypeID(["PointLight"], _table);
//# sourceMappingURL=ComponentTypeIDManager.js.map