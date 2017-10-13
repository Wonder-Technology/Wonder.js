import { GameObject } from "./GameObject";
import { createMap, deleteVal, isValidMapValue } from "../../../utils/objectUtils";
import { setParent as setThreeDTransformParent } from "../../../component/transform/ThreeDTransformSystem";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { execHandle, execInitHandle } from "../../../component/ComponentSystem";
import { Geometry } from "../../../component/geometry/Geometry";
import { Material } from "../../../component/material/Material";
import { filter, forEach } from "../../../utils/arrayUtils";
import { removeChildEntity } from "../../../utils/entityUtils";
import { isDisposeTooManyComponents, reAllocateGameObject } from "../../../utils/memoryUtils";
import { getComponentIdFromClass, getComponentIdFromComponent } from "../../../component/ComponentComponentIdManager";
import { MeshRenderer } from "../../../component/renderer/MeshRenderer";
import { create as createMeshRenderer } from "../../../component/renderer/MeshRendererSystem";
import { getTypeIdFromComponent } from "../../../component/ComponentTypeIdManager";
export var create = ensureFunc(function (gameObject, transform, GameObjectData) {
    it("componentMap should has data", function () {
        expect(_getComponentData(gameObject.uid, GameObjectData)).exist;
    });
}, function (transform, GameObjectData) {
    var gameObject = new GameObject(), uid = _buildUId(GameObjectData);
    gameObject.uid = uid;
    GameObjectData.aliveUIdArray.push(uid);
    if (!transform) {
        _setComponentData(uid, {}, GameObjectData);
    }
    else {
        addComponent(gameObject, transform, GameObjectData);
    }
    return gameObject;
});
var _buildUId = function (GameObjectData) {
    return GameObjectData.uid++;
};
export var isAlive = function (entity, GameObjectData) {
    return isValidMapValue(_getComponentData(entity.uid, GameObjectData));
};
export var isNotAlive = function (entity, GameObjectData) {
    return !isAlive(entity, GameObjectData);
};
export var initGameObject = function (gameObject, state, GameObjectData) {
    var uid = gameObject.uid, componentData = _getComponentData(uid, GameObjectData);
    for (var componentId in componentData) {
        if (componentData.hasOwnProperty(componentId)) {
            var component = componentData[componentId];
            execInitHandle(getTypeIdFromComponent(component), component.index, state);
        }
    }
};
export var dispose = function (entity, ThreeDTransformData, GameObjectData) {
    _diposeAllDatas(entity, GameObjectData);
    GameObjectData.disposeCount += 1;
    if (isDisposeTooManyComponents(GameObjectData.disposeCount)) {
        reAllocateGameObject(GameObjectData);
        GameObjectData.disposeCount = 0;
    }
};
var _removeFromChildrenMap = function (parentUId, childUId, GameObjectData) {
    removeChildEntity(getChildren(parentUId, GameObjectData), childUId);
};
var _diposeAllDatas = function (gameObject, GameObjectData) {
    var uid = gameObject.uid, children = getChildren(uid, GameObjectData);
    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);
    if (_isChildrenExist(children)) {
        forEach(children, function (child) {
            if (isNotAlive(child, GameObjectData)) {
                return;
            }
            _diposeAllDatas(child, GameObjectData);
        });
    }
};
var _disposeMapDatas = function (uid, GameObjectData) {
    deleteVal(uid, GameObjectData.childrenMap);
    deleteVal(uid, GameObjectData.componentMap);
};
var _disposeAllComponents = function (gameObject, GameObjectData) {
    var components = _getComponentData(gameObject.uid, GameObjectData);
    for (var typeId in components) {
        if (components.hasOwnProperty(typeId)) {
            var component = components[typeId];
            execHandle(component, "disposeHandleMap");
        }
    }
};
export var addComponent = requireCheckFunc(function (gameObject, component, GameObjectData) {
    it("component should exist", function () {
        expect(component).exist;
    });
    it("should not has this type of component, please dispose it", function () {
        expect(hasComponent(gameObject, getComponentIdFromComponent(component), GameObjectData)).false;
    });
}, function (gameObject, component, GameObjectData) {
    var uid = gameObject.uid, componentId = getComponentIdFromComponent(component), data = _getComponentData(uid, GameObjectData);
    execHandle(component, "addComponentHandleMap", [component, gameObject]);
    if (!data) {
        var d = {};
        d[componentId] = component;
        _setComponentData(uid, d, GameObjectData);
        return;
    }
    data[componentId] = component;
});
var _removeComponent = function (componentId, uid, GameObjectData) {
    var data = _getComponentData(uid, GameObjectData);
    if (isValidMapValue(data)) {
        deleteVal(componentId, data);
    }
};
export var disposeComponent = function (uid, component, GameObjectData) {
    var componentId = getComponentIdFromComponent(component);
    _removeComponent(componentId, uid, GameObjectData);
    execHandle(component, "disposeHandleMap");
};
export var getComponent = function (uid, componentId, GameObjectData) {
    var data = _getComponentData(uid, GameObjectData);
    if (isValidMapValue(data)) {
        var component = data[componentId];
        return isValidMapValue(component) ? component : null;
    }
    return null;
};
export var getAllComponents = function (uid, GameObjectData) {
    return _getComponentData(uid, GameObjectData);
};
var _getComponentData = function (uid, GameObjectData) { return GameObjectData.componentMap[uid]; };
var _setComponentData = function (uid, data, GameObjectData) { return GameObjectData.componentMap[uid] = data; };
export var hasComponent = function (gameObject, componentId, GameObjectData) {
    return getComponent(gameObject.uid, componentId, GameObjectData) !== null;
};
export var getTransform = function (uid, GameObjectData) {
    return getComponent(uid, getComponentIdFromClass(ThreeDTransform), GameObjectData);
};
export var getGeometry = function (uid, GameObjectData) {
    return getComponent(uid, getComponentIdFromClass(Geometry), GameObjectData);
};
export var getMaterial = function (uid, GameObjectData) {
    return getComponent(uid, getComponentIdFromClass(Material), GameObjectData);
};
export var getMeshRenderer = function (uid, GameObjectData) {
    return getComponent(uid, getComponentIdFromClass(MeshRenderer), GameObjectData);
};
var _isParentExist = function (parent) { return isNotUndefined(parent); };
var _isChildrenExist = function (children) { return isNotUndefined(children); };
var _isComponentExist = function (component) { return component !== null; };
var _isGameObjectEqual = function (gameObject1, gameObject2) { return gameObject1.uid === gameObject2.uid; };
export var getParent = function (uid, GameObjectData) { return GameObjectData.parentMap[uid]; };
export var setParent = function (parent, child, ThreeDTransformData, GameObjectData) {
    var parentUId = parent.uid, childUId = child.uid, transform = getTransform(parentUId, GameObjectData), childOriginParent = getParent(childUId, GameObjectData);
    if (_isParentExist(childOriginParent)) {
        removeChildWithoutDisposeMeshRenderer(childOriginParent.uid, childUId, ThreeDTransformData, GameObjectData);
    }
    _setParent(childUId, parent, GameObjectData);
    if (_isComponentExist(transform)) {
        setThreeDTransformParent(transform, getTransform(childUId, GameObjectData), ThreeDTransformData);
    }
    _addChild(parentUId, child, GameObjectData);
};
var _setParent = function (uid, parent, GameObjectData) {
    GameObjectData.parentMap[uid] = parent;
};
export var getChildren = function (uid, GameObjectData) {
    return GameObjectData.childrenMap[uid];
};
export var setChildren = function (uid, children, GameObjectData) {
    GameObjectData.childrenMap[uid] = children;
};
export var getAliveChildren = function (uid, GameObjectData) {
    return filter(getChildren(uid, GameObjectData), function (gameObject) {
        return isAlive(gameObject, GameObjectData);
    });
};
var _addChild = function (uid, child, GameObjectData) {
    var children = getChildren(uid, GameObjectData);
    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        setChildren(uid, [child], GameObjectData);
    }
};
export var addChild = requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    setParent(gameObject, child, ThreeDTransformData, GameObjectData);
});
export var addRemovedChild = function (gameObject, child, MeshRendererData, ThreeDTransformData, GameObjectData) {
    setParent(gameObject, child, ThreeDTransformData, GameObjectData);
    addComponent(child, createMeshRenderer(MeshRendererData), GameObjectData);
};
export var removeChild = function (parentUId, childUId, ThreeDTransformData, GameObjectData) {
    var meshRenderer = getMeshRenderer(childUId, GameObjectData);
    if (_isComponentExist(meshRenderer)) {
        disposeComponent(childUId, getMeshRenderer(childUId, GameObjectData), GameObjectData);
    }
    _removeChildWithoutDisposeMeshRenderer(parentUId, childUId, ThreeDTransformData, GameObjectData);
};
export var removeChildWithoutDisposeMeshRenderer = function (parentUId, childUId, ThreeDTransformData, GameObjectData) {
    _removeChildWithoutDisposeMeshRenderer(parentUId, childUId, ThreeDTransformData, GameObjectData);
};
var _removeChildWithoutDisposeMeshRenderer = requireCheckFunc(function (parentUId, childUId, ThreeDTransformData, GameObjectData) {
    it("child should has transform component", function () {
        expect(getTransform(childUId, GameObjectData)).exist;
    });
}, function (parentUId, childUId, ThreeDTransformData, GameObjectData) {
    deleteVal(childUId, GameObjectData.parentMap);
    setThreeDTransformParent(null, getTransform(childUId, GameObjectData), ThreeDTransformData);
    _removeFromChildrenMap(parentUId, childUId, GameObjectData);
});
export var hasChild = function (gameObject, child, GameObjectData) {
    if (isNotAlive(gameObject, GameObjectData) || isNotAlive(child, GameObjectData)) {
        return false;
    }
    var parent = getParent(child.uid, GameObjectData);
    if (!_isParentExist(parent) || isNotAlive(parent, GameObjectData)) {
        return false;
    }
    return _isGameObjectEqual(parent, gameObject);
};
export var initData = function (GameObjectData) {
    GameObjectData.uid = 0;
    GameObjectData.componentMap = createMap();
    GameObjectData.parentMap = createMap();
    GameObjectData.childrenMap = createMap();
    GameObjectData.disposeCount = 0;
    GameObjectData.aliveUIdArray = [];
};
//# sourceMappingURL=GameObjectSystem.js.map