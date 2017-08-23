import { ClassUtils } from "../utils/ClassUtils";
var _generateTypeId = function () {
    var result = _typeId;
    _typeId += 1;
    return String(result);
};
export var getTypeIdFromClass = function (_class) {
    return _table[ClassUtils.getClassNameByClass(_class)];
};
export var getTypeIdFromComponent = function (component) {
    return _table[ClassUtils.getClassNameByInstance(component)];
};
var _addTypeId = function (componentClassNameArr, table) {
    var id = _generateTypeId();
    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
        var className = componentClassNameArr_1[_i];
        table[className] = id;
    }
};
var _typeId = 1;
var _table = {};
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
//# sourceMappingURL=ComponentTypeIdManager.js.map