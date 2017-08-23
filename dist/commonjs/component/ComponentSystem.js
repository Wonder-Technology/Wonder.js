"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentData_1 = require("./ComponentData");
var ComponentTypeIdManager_1 = require("./ComponentTypeIdManager");
var wonder_expect_js_1 = require("wonder-expect.js");
var contract_1 = require("../definition/typescript/decorator/contract");
var objectUtils_1 = require("../utils/objectUtils");
var arrayUtils_1 = require("../utils/arrayUtils");
var _addHandle = function (_class, handleMap, handle) {
    var typeId = ComponentTypeIdManager_1.getTypeIdFromClass(_class);
    handleMap[typeId] = handle;
};
exports.addAddComponentHandle = function (_class, handle) {
    _addHandle(_class, ComponentData_1.ComponentData.addComponentHandleMap, handle);
};
exports.addDisposeHandle = function (_class, handle) {
    _addHandle(_class, ComponentData_1.ComponentData.disposeHandleMap, handle);
};
exports.addInitHandle = function (_class, handle) {
    _addHandle(_class, ComponentData_1.ComponentData.initHandleMap, handle);
};
exports.execHandle = function (component, handleMapName, args) {
    var handle = ComponentData_1.ComponentData[handleMapName][ComponentTypeIdManager_1.getTypeIdFromComponent(component)];
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
exports.execInitHandle = function (typeId, index, state) {
    var handle = ComponentData_1.ComponentData.initHandleMap[typeId];
    if (_isHandleNotExist(handle)) {
        return;
    }
    handle(index, state);
};
var _isHandleNotExist = function (handle) { return objectUtils_1.isNotValidMapValue(handle); };
exports.checkComponentShouldAlive = function (component, data, isAlive) {
    contract_1.it("component should alive", function () {
        wonder_expect_js_1.expect(isAlive(component, data)).true;
    });
};
exports.addComponentToGameObjectMap = contract_1.requireCheckFunc(function (gameObjectMap, index, gameObject) {
}, function (gameObjectMap, index, gameObject) {
    gameObjectMap[index] = gameObject;
});
exports.getComponentGameObject = function (gameObjectMap, index) {
    return gameObjectMap[index];
};
exports.generateComponentIndex = function (ComponentData) {
    return ComponentData.index++;
};
exports.deleteComponent = contract_1.requireCheckFunc(function (index, componentMap) {
    contract_1.it("index should >= 0", function () {
        wonder_expect_js_1.expect(index).gte(0);
    });
}, function (index, componentMap) {
    exports.markComponentIndexRemoved(componentMap[index]);
    objectUtils_1.deleteVal(index, componentMap);
});
exports.deleteComponentBySwapArray = contract_1.requireCheckFunc(function (sourceIndex, targetIndex, componentMap) {
    contract_1.it("targetIndex should >= 0", function () {
        wonder_expect_js_1.expect(targetIndex).gte(0);
    });
}, function (sourceIndex, targetIndex, componentMap) {
    componentMap[targetIndex].index = sourceIndex;
    exports.markComponentIndexRemoved(componentMap[sourceIndex]);
    arrayUtils_1.deleteBySwap(sourceIndex, targetIndex, componentMap);
});
exports.markComponentIndexRemoved = function (component) {
    component.index = -1;
};
exports.isComponentIndexNotRemoved = function (component) {
    return component.index !== -1;
};
//# sourceMappingURL=ComponentSystem.js.map