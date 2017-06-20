"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MeshRenderer_1 = require("./MeshRenderer");
var curry_1 = require("wonder-lodash/curry");
var contract_1 = require("../../definition/typescript/decorator/contract");
var arrayUtils_1 = require("../../utils/arrayUtils");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var contractUtils_1 = require("../utils/contractUtils");
var MeshRendererData_1 = require("./MeshRendererData");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.create = contract_1.requireCheckFunc(function (MeshRendererData) {
    contractUtils_1.checkIndexShouldEqualCount(MeshRendererData);
}, function (MeshRendererData) {
    var renderer = new MeshRenderer_1.MeshRenderer(), index = ComponentSystem_1.generateComponentIndex(MeshRendererData);
    renderer.index = index;
    MeshRendererData.count += 1;
    MeshRendererData.meshRendererMap[index] = renderer;
    return renderer;
});
var _setRenderGameObjectArray = contract_1.requireCheckFunc(function (index, gameObject, renderGameObjectArray) {
    contract_1.it("should not exist gameObject", function () {
        wonder_expect_js_1.expect(renderGameObjectArray[index]).not.exist;
    });
}, function (index, gameObject, renderGameObjectArray) {
    renderGameObjectArray[index] = gameObject;
});
exports.addComponent = function (component, gameObject) {
    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData_1.MeshRendererData.renderGameObjectArray);
    ComponentSystem_1.addComponentToGameObjectMap(MeshRendererData_1.MeshRendererData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = contract_1.ensureFunc(function (returnVal, component) {
    contractUtils_1.checkIndexShouldEqualCount(MeshRendererData_1.MeshRendererData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    MeshRendererData_1.MeshRendererData.count -= 1;
    MeshRendererData_1.MeshRendererData.index -= 1;
    lastComponentIndex = MeshRendererData_1.MeshRendererData.count;
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData_1.MeshRendererData.renderGameObjectArray);
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData_1.MeshRendererData.gameObjectMap);
    ComponentSystem_1.deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MeshRendererData_1.MeshRendererData.meshRendererMap);
});
exports.getGameObject = function (index, Data) {
    return ComponentSystem_1.getComponentGameObject(Data.gameObjectMap, index);
};
exports.getRenderList = curry_1.default(function (state, MeshRendererData) {
    return MeshRendererData.renderGameObjectArray;
});
exports.initData = function (MeshRendererData) {
    MeshRendererData.renderGameObjectArray = [];
    MeshRendererData.gameObjectMap = [];
    MeshRendererData.meshRendererMap = [];
    MeshRendererData.index = 0;
    MeshRendererData.count = 0;
};
//# sourceMappingURL=MeshRendererSystem.js.map