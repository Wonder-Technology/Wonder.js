import { ComponentData } from "./ComponentData";
import { getTypeIDFromClass, getTypeIDFromComponent } from "./ComponentTypeIDManager";
import { expect } from "wonder-expect.js";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { deleteBySwap, isNotValidMapValue } from "../utils/objectUtils";
var _addHandle = function (_class, handleMap, handle) {
    var typeID = getTypeIDFromClass(_class);
    handleMap[typeID] = handle;
};
export var addAddComponentHandle = function (_class, handle) {
    _addHandle(_class, ComponentData.addComponentHandleMap, handle);
};
export var addDisposeHandle = function (_class, handle) {
    _addHandle(_class, ComponentData.disposeHandleMap, handle);
};
export var addInitHandle = function (_class, handle) {
    _addHandle(_class, ComponentData.initHandleMap, handle);
};
export var execHandle = function (component, handleMapName, args) {
    var handle = ComponentData[handleMapName][getTypeIDFromComponent(component)];
    if (_isHandleNotExist(handle)) {
        return;
    }
    if (!!args) {
        handle.apply(null, args);
    }
    else {
        handle(component);
    }
};
export var execInitHandle = function (typeID, index, state) {
    var handle = ComponentData.initHandleMap[typeID];
    if (_isHandleNotExist(handle)) {
        return;
    }
    handle(index, state);
};
var _isHandleNotExist = function (handle) { return isNotValidMapValue(handle); };
export var checkComponentShouldAlive = function (component, data, isAlive) {
    it("component should alive", function () {
        expect(isAlive(component, data)).true;
    });
};
export var addComponentToGameObjectMap = requireCheckFunc(function (gameObjectMap, index, gameObject) {
    it("component should not exist in gameObject", function () {
        expect(gameObjectMap[index]).not.exist;
    });
}, function (gameObjectMap, index, gameObject) {
    gameObjectMap[index] = gameObject;
});
export var getComponentGameObject = function (gameObjectMap, index) {
    return gameObjectMap[index];
};
export var generateComponentIndex = function (ComponentData) {
    return ComponentData.index++;
};
export var deleteComponentBySwap = requireCheckFunc(function (sourceIndex, targetIndex, componentMap) {
    it("targetIndex should >= 0", function () {
        expect(targetIndex).gte(0);
    });
}, function (sourceIndex, targetIndex, componentMap) {
    componentMap[targetIndex].index = sourceIndex;
    markComponentIndexRemoved(componentMap[sourceIndex]);
    deleteBySwap(sourceIndex, targetIndex, componentMap);
});
export var markComponentIndexRemoved = function (component) {
    component.index = -1;
};
//# sourceMappingURL=ComponentSystem.js.map