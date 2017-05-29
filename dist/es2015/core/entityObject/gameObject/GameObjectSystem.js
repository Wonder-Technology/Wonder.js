import { GameObject } from "./GameObject";
import { getTypeIDFromClass, getTypeIDFromComponent } from "../../../component/ComponentTypeIDManager";
import { createMap, deleteVal, isValidMapValue } from "../../../utils/objectUtils";
import { setParent } from "../../../component/transform/ThreeDTransformSystem";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { execHandle, execInitHandle } from "../../../component/ComponentSystem";
import { Geometry } from "../../../component/geometry/Geometry";
import { Material } from "../../../component/material/Material";
import { filter, forEach } from "../../../utils/arrayUtils";
import { removeChildEntity } from "../../../utils/entityUtils";
import { chrome, firefox } from "bowser";
import { error, Log } from "../../../utils/Log";
import { isDisposeTooManyComponents, reAllocateGameObjectMap } from "../../../utils/memoryUtils";
export var create = ensureFunc(function (gameObject, transform, GameObjectData) {
    it("componentMap should has data", function () {
        expect(_getComponentData(gameObject.uid, GameObjectData)).exist;
    });
}, function (transform, GameObjectData) {
    var gameObject = new GameObject(), uid = _buildUID(GameObjectData);
    gameObject.uid = uid;
    GameObjectData.aliveUIDArray.push(uid);
    if (!transform) {
        _setComponentData(uid, {}, GameObjectData);
    }
    else {
        addComponent(gameObject, transform, GameObjectData);
    }
    return gameObject;
});
var _buildUID = function (GameObjectData) {
    return GameObjectData.uid++;
};
export var isAlive = function (entity, GameObjectData) {
    return isValidMapValue(_getComponentData(entity.uid, GameObjectData));
};
export var initGameObject = function (gameObject, state, GameObjectData) {
    var uid = gameObject.uid, componentData = _getComponentData(uid, GameObjectData);
    for (var typeID in componentData) {
        if (componentData.hasOwnProperty(typeID)) {
            execInitHandle(typeID, componentData[typeID].index, state);
        }
    }
};
export var dispose = function (entity, ThreeDTransformData, GameObjectData) {
    var uid = entity.uid;
    var parent = _getParent(uid, GameObjectData);
    if (_isParentExist(parent)) {
        _removeFromChildrenMap(parent.uid, uid, GameObjectData);
    }
    _diposeAllDatas(entity, GameObjectData);
    GameObjectData.disposeCount += 1;
    if (isDisposeTooManyComponents(GameObjectData.disposeCount)) {
        reAllocateGameObjectMap(GameObjectData);
        GameObjectData.disposeCount = 0;
    }
};
var _removeFromChildrenMap = null;
if (chrome) {
    _removeFromChildrenMap = function (parentUID, childUID, GameObjectData) {
        _setChildren(parentUID, filter(_getChildren(parentUID, GameObjectData), function (gameObject) {
            return gameObject.uid !== childUID;
        }), GameObjectData);
    };
}
else if (firefox) {
    _removeFromChildrenMap = function (parentUID, childUID, GameObjectData) {
        removeChildEntity(_getChildren(parentUID, GameObjectData), childUID);
    };
}
else {
    error(true, Log.info.FUNC_NOT_SUPPORT("browser"));
}
var _diposeAllDatas = function (gameObject, GameObjectData) {
    var uid = gameObject.uid, children = _getChildren(uid, GameObjectData);
    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);
    if (_isChildrenExist(children)) {
        forEach(children, function (child) {
            _diposeAllDatas(child, GameObjectData);
        });
    }
};
var _disposeMapDatas = function (uid, GameObjectData) {
    deleteVal(uid, GameObjectData.childrenMap);
    deleteVal(uid, GameObjectData.parentMap);
    deleteVal(uid, GameObjectData.componentMap);
};
var _disposeAllComponents = function (gameObject, GameObjectData) {
    var components = _getComponentData(gameObject.uid, GameObjectData);
    for (var typeID in components) {
        if (components.hasOwnProperty(typeID)) {
            var component = components[typeID];
            execHandle(component, "disposeHandleMap");
        }
    }
};
export var addComponent = requireCheckFunc(function (gameObject, component, GameObjectData) {
    it("component should exist", function () {
        expect(component).exist;
    });
    it("should not has this type of component, please dispose it", function () {
        expect(hasComponent(gameObject, getTypeIDFromComponent(component), GameObjectData)).false;
    });
}, function (gameObject, component, GameObjectData) {
    var uid = gameObject.uid, typeID = getTypeIDFromComponent(component), data = _getComponentData(uid, GameObjectData);
    execHandle(component, "addComponentHandleMap", [component, gameObject]);
    if (!data) {
        var d = {};
        d[typeID] = component;
        _setComponentData(uid, d, GameObjectData);
        return;
    }
    data[typeID] = component;
});
var _removeComponent = function (typeID, gameObject, component, GameObjectData) {
    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
    if (isValidMapValue(data)) {
        deleteVal(typeID, data);
    }
};
export var disposeComponent = function (gameObject, component, GameObjectData) {
    var typeID = getTypeIDFromComponent(component);
    _removeComponent(typeID, gameObject, component, GameObjectData);
    execHandle(component, "disposeHandleMap");
};
export var getComponent = function (gameObject, componentTypeID, GameObjectData) {
    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
    if (isValidMapValue(data)) {
        var component = data[componentTypeID];
        return isValidMapValue(component) ? component : null;
    }
    return null;
};
var _getComponentData = function (uid, GameObjectData) { return GameObjectData.componentMap[uid]; };
var _setComponentData = function (uid, data, GameObjectData) { return GameObjectData.componentMap[uid] = data; };
export var hasComponent = function (gameObject, componentTypeID, GameObjectData) {
    return getComponent(gameObject, componentTypeID, GameObjectData) !== null;
};
export var getTransform = function (gameObject, GameObjectData) {
    return getComponent(gameObject, getTypeIDFromClass(ThreeDTransform), GameObjectData);
};
export var getGeometry = function (gameObject, GameObjectData) {
    return getComponent(gameObject, getTypeIDFromClass(Geometry), GameObjectData);
};
export var getMaterial = function (gameObject, GameObjectData) {
    return getComponent(gameObject, getTypeIDFromClass(Material), GameObjectData);
};
var _isParentExist = function (parent) { return isNotUndefined(parent); };
var _isChildrenExist = function (children) { return isNotUndefined(children); };
var _isComponentExist = function (component) { return component !== null; };
var _isGameObjectEqual = function (gameObject1, gameObject2) { return gameObject1.uid === gameObject2.uid; };
var _getParent = function (uid, GameObjectData) { return GameObjectData.parentMap[uid]; };
var _setParent = function (uid, parent, GameObjectData) {
    GameObjectData.parentMap[uid] = parent;
};
var _getChildren = function (uid, GameObjectData) {
    return GameObjectData.childrenMap[uid];
};
var _addChild = function (uid, child, GameObjectData) {
    var children = _getChildren(uid, GameObjectData);
    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        _setChildren(uid, [child], GameObjectData);
    }
};
var _setChildren = function (uid, children, GameObjectData) {
    GameObjectData.childrenMap[uid] = children;
};
export var addChild = requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    var transform = getTransform(gameObject, GameObjectData), uid = gameObject.uid, childUID = child.uid, parent = _getParent(childUID, GameObjectData);
    if (_isParentExist(parent)) {
        removeChild(parent, child, ThreeDTransformData, GameObjectData);
    }
    _setParent(childUID, gameObject, GameObjectData);
    if (_isComponentExist(transform)) {
        setParent(getTransform(child, GameObjectData), transform, ThreeDTransformData);
    }
    _addChild(uid, child, GameObjectData);
});
export var removeChild = requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
    it("child should has transform component", function () {
        expect(getTransform(child, GameObjectData)).exist;
    });
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    var uid = gameObject.uid, childUID = child.uid;
    deleteVal(childUID, GameObjectData.parentMap);
    setParent(getTransform(child, GameObjectData), null, ThreeDTransformData);
    _removeFromChildrenMap(uid, childUID, GameObjectData);
});
export var hasChild = function (gameObject, child, GameObjectData) {
    var parent = _getParent(child.uid, GameObjectData);
    if (!_isParentExist(parent)) {
        return false;
    }
    return _isGameObjectEqual(parent, gameObject);
};
export var initData = function (GameObjectData) {
    GameObjectData.uid = 0;
    GameObjectData.componentMap = createMap();
    GameObjectData.parentMap = createMap();
    GameObjectData.childrenMap = createMap();
    GameObjectData.aliveUIDArray = [];
};
//# sourceMappingURL=GameObjectSystem.js.map