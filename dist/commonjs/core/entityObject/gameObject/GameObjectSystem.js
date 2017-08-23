"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("./GameObject");
var objectUtils_1 = require("../../../utils/objectUtils");
var ThreeDTransformSystem_1 = require("../../../component/transform/ThreeDTransformSystem");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ThreeDTransform_1 = require("../../../component/transform/ThreeDTransform");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var ComponentSystem_1 = require("../../../component/ComponentSystem");
var Geometry_1 = require("../../../component/geometry/Geometry");
var Material_1 = require("../../../component/material/Material");
var arrayUtils_1 = require("../../../utils/arrayUtils");
var entityUtils_1 = require("../../../utils/entityUtils");
var memoryUtils_1 = require("../../../utils/memoryUtils");
var ComponentComponentIdManager_1 = require("../../../component/ComponentComponentIdManager");
var MeshRenderer_1 = require("../../../component/renderer/MeshRenderer");
var MeshRendererSystem_1 = require("../../../component/renderer/MeshRendererSystem");
exports.create = contract_1.ensureFunc(function (gameObject, transform, GameObjectData) {
    contract_1.it("componentMap should has data", function () {
        wonder_expect_js_1.expect(_getComponentData(gameObject.uid, GameObjectData)).exist;
    });
}, function (transform, GameObjectData) {
    var gameObject = new GameObject_1.GameObject(), uid = _buildUId(GameObjectData);
    gameObject.uid = uid;
    GameObjectData.aliveUIdArray.push(uid);
    if (!transform) {
        _setComponentData(uid, {}, GameObjectData);
    }
    else {
        exports.addComponent(gameObject, transform, GameObjectData);
    }
    return gameObject;
});
var _buildUId = function (GameObjectData) {
    return GameObjectData.uid++;
};
exports.isAlive = function (entity, GameObjectData) {
    return objectUtils_1.isValidMapValue(_getComponentData(entity.uid, GameObjectData));
};
exports.isNotAlive = function (entity, GameObjectData) {
    return !exports.isAlive(entity, GameObjectData);
};
exports.initGameObject = function (gameObject, state, GameObjectData) {
    var uid = gameObject.uid, componentData = _getComponentData(uid, GameObjectData);
    for (var typeId in componentData) {
        if (componentData.hasOwnProperty(typeId)) {
            ComponentSystem_1.execInitHandle(typeId, componentData[typeId].index, state);
        }
    }
};
exports.dispose = function (entity, ThreeDTransformData, GameObjectData) {
    _diposeAllDatas(entity, GameObjectData);
    GameObjectData.disposeCount += 1;
    if (memoryUtils_1.isDisposeTooManyComponents(GameObjectData.disposeCount)) {
        memoryUtils_1.reAllocateGameObject(GameObjectData);
        GameObjectData.disposeCount = 0;
    }
};
var _removeFromChildrenMap = function (parentUId, childUId, GameObjectData) {
    entityUtils_1.removeChildEntity(exports.getChildren(parentUId, GameObjectData), childUId);
};
var _diposeAllDatas = function (gameObject, GameObjectData) {
    var uid = gameObject.uid, children = exports.getChildren(uid, GameObjectData);
    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);
    if (_isChildrenExist(children)) {
        arrayUtils_1.forEach(children, function (child) {
            if (exports.isNotAlive(child, GameObjectData)) {
                return;
            }
            _diposeAllDatas(child, GameObjectData);
        });
    }
};
var _disposeMapDatas = function (uid, GameObjectData) {
    objectUtils_1.deleteVal(uid, GameObjectData.childrenMap);
    objectUtils_1.deleteVal(uid, GameObjectData.componentMap);
};
var _disposeAllComponents = function (gameObject, GameObjectData) {
    var components = _getComponentData(gameObject.uid, GameObjectData);
    for (var typeId in components) {
        if (components.hasOwnProperty(typeId)) {
            var component = components[typeId];
            ComponentSystem_1.execHandle(component, "disposeHandleMap");
        }
    }
};
exports.addComponent = contract_1.requireCheckFunc(function (gameObject, component, GameObjectData) {
    contract_1.it("component should exist", function () {
        wonder_expect_js_1.expect(component).exist;
    });
    contract_1.it("should not has this type of component, please dispose it", function () {
        wonder_expect_js_1.expect(exports.hasComponent(gameObject, ComponentComponentIdManager_1.getComponentIdFromComponent(component), GameObjectData)).false;
    });
}, function (gameObject, component, GameObjectData) {
    var uid = gameObject.uid, componentId = ComponentComponentIdManager_1.getComponentIdFromComponent(component), data = _getComponentData(uid, GameObjectData);
    ComponentSystem_1.execHandle(component, "addComponentHandleMap", [component, gameObject]);
    if (!data) {
        var d = {};
        d[componentId] = component;
        _setComponentData(uid, d, GameObjectData);
        return;
    }
    data[componentId] = component;
});
var _removeComponent = function (componentId, gameObject, GameObjectData) {
    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
    if (objectUtils_1.isValidMapValue(data)) {
        objectUtils_1.deleteVal(componentId, data);
    }
};
exports.disposeComponent = function (gameObject, component, GameObjectData) {
    var componentId = ComponentComponentIdManager_1.getComponentIdFromComponent(component);
    _removeComponent(componentId, gameObject, GameObjectData);
    ComponentSystem_1.execHandle(component, "disposeHandleMap");
};
exports.getComponent = function (gameObject, componentId, GameObjectData) {
    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
    if (objectUtils_1.isValidMapValue(data)) {
        var component = data[componentId];
        return objectUtils_1.isValidMapValue(component) ? component : null;
    }
    return null;
};
var _getComponentData = function (uid, GameObjectData) { return GameObjectData.componentMap[uid]; };
var _setComponentData = function (uid, data, GameObjectData) { return GameObjectData.componentMap[uid] = data; };
exports.hasComponent = function (gameObject, componentId, GameObjectData) {
    return exports.getComponent(gameObject, componentId, GameObjectData) !== null;
};
exports.getTransform = function (gameObject, GameObjectData) {
    return exports.getComponent(gameObject, ComponentComponentIdManager_1.getComponentIdFromClass(ThreeDTransform_1.ThreeDTransform), GameObjectData);
};
exports.getGeometry = function (gameObject, GameObjectData) {
    return exports.getComponent(gameObject, ComponentComponentIdManager_1.getComponentIdFromClass(Geometry_1.Geometry), GameObjectData);
};
exports.getMaterial = function (gameObject, GameObjectData) {
    return exports.getComponent(gameObject, ComponentComponentIdManager_1.getComponentIdFromClass(Material_1.Material), GameObjectData);
};
exports.getMeshRenderer = function (gameObject, GameObjectData) {
    return exports.getComponent(gameObject, ComponentComponentIdManager_1.getComponentIdFromClass(MeshRenderer_1.MeshRenderer), GameObjectData);
};
var _isParentExist = function (parent) { return JudgeUtils_1.isNotUndefined(parent); };
var _isChildrenExist = function (children) { return JudgeUtils_1.isNotUndefined(children); };
var _isComponentExist = function (component) { return component !== null; };
var _isGameObjectEqual = function (gameObject1, gameObject2) { return gameObject1.uid === gameObject2.uid; };
exports.getParent = function (uid, GameObjectData) { return GameObjectData.parentMap[uid]; };
var _setParent = function (uid, parent, GameObjectData) {
    GameObjectData.parentMap[uid] = parent;
};
exports.getChildren = function (uid, GameObjectData) {
    return GameObjectData.childrenMap[uid];
};
exports.setChildren = function (uid, children, GameObjectData) {
    GameObjectData.childrenMap[uid] = children;
};
exports.getAliveChildren = function (uid, GameObjectData) {
    return arrayUtils_1.filter(exports.getChildren(uid, GameObjectData), function (gameObject) {
        return exports.isAlive(gameObject, GameObjectData);
    });
};
var _addChild = function (uid, child, GameObjectData) {
    var children = exports.getChildren(uid, GameObjectData);
    if (objectUtils_1.isValidMapValue(children)) {
        children.push(child);
    }
    else {
        exports.setChildren(uid, [child], GameObjectData);
    }
};
exports.addChild = contract_1.requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    _addChildHelper(gameObject, child, ThreeDTransformData, GameObjectData);
});
exports.addRemovedChild = function (gameObject, child, MeshRendererData, ThreeDTransformData, GameObjectData) {
    _addChildHelper(gameObject, child, ThreeDTransformData, GameObjectData);
    exports.addComponent(child, MeshRendererSystem_1.create(MeshRendererData), GameObjectData);
};
var _addChildHelper = function (gameObject, child, ThreeDTransformData, GameObjectData) {
    var transform = exports.getTransform(gameObject, GameObjectData), uid = gameObject.uid, childUId = child.uid, parent = exports.getParent(childUId, GameObjectData);
    if (_isParentExist(parent)) {
        exports.removeChild(parent, child, ThreeDTransformData, GameObjectData);
    }
    _setParent(childUId, gameObject, GameObjectData);
    if (_isComponentExist(transform)) {
        ThreeDTransformSystem_1.setParent(exports.getTransform(child, GameObjectData), transform, ThreeDTransformData);
    }
    _addChild(uid, child, GameObjectData);
};
exports.removeChild = contract_1.requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
    contract_1.it("child should has transform component", function () {
        wonder_expect_js_1.expect(exports.getTransform(child, GameObjectData)).exist;
    });
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    var uid = gameObject.uid, childUId = child.uid, meshRenderer = exports.getMeshRenderer(child, GameObjectData);
    if (_isComponentExist(meshRenderer)) {
        exports.disposeComponent(child, exports.getMeshRenderer(child, GameObjectData), GameObjectData);
    }
    objectUtils_1.deleteVal(childUId, GameObjectData.parentMap);
    ThreeDTransformSystem_1.setParent(exports.getTransform(child, GameObjectData), null, ThreeDTransformData);
    _removeFromChildrenMap(uid, childUId, GameObjectData);
});
exports.hasChild = function (gameObject, child, GameObjectData) {
    if (exports.isNotAlive(gameObject, GameObjectData) || exports.isNotAlive(child, GameObjectData)) {
        return false;
    }
    var parent = exports.getParent(child.uid, GameObjectData);
    if (!_isParentExist(parent) || exports.isNotAlive(parent, GameObjectData)) {
        return false;
    }
    return _isGameObjectEqual(parent, gameObject);
};
exports.initData = function (GameObjectData) {
    GameObjectData.uid = 0;
    GameObjectData.componentMap = objectUtils_1.createMap();
    GameObjectData.parentMap = objectUtils_1.createMap();
    GameObjectData.childrenMap = objectUtils_1.createMap();
    GameObjectData.disposeCount = 0;
    GameObjectData.aliveUIdArray = [];
};
//# sourceMappingURL=GameObjectSystem.js.map