import { MeshRenderer } from "./MeshRenderer";
import curry from "wonder-lodash/curry";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { deleteBySwap } from "../../utils/arrayUtils";
import { expect } from "wonder-expect.js";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, deleteComponentBySwapArray, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { MeshRendererData } from "./MeshRendererData";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var create = requireCheckFunc(function (MeshRendererData) {
    checkIndexShouldEqualCount(MeshRendererData);
}, function (MeshRendererData) {
    var renderer = new MeshRenderer(), index = generateComponentIndex(MeshRendererData);
    renderer.index = index;
    MeshRendererData.count += 1;
    MeshRendererData.meshRendererMap[index] = renderer;
    return renderer;
});
var _setRenderGameObjectArray = requireCheckFunc(function (index, gameObject, renderGameObjectArray) {
    it("should not exist gameObject", function () {
        expect(renderGameObjectArray[index]).not.exist;
    });
}, function (index, gameObject, renderGameObjectArray) {
    renderGameObjectArray[index] = gameObject;
});
export var addComponent = function (component, gameObject) {
    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData.renderGameObjectArray);
    addComponentToGameObjectMap(MeshRendererData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = ensureFunc(function (returnVal, component) {
    checkIndexShouldEqualCount(MeshRendererData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    MeshRendererData.count -= 1;
    MeshRendererData.index -= 1;
    lastComponentIndex = MeshRendererData.count;
    deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData.renderGameObjectArray);
    deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData.gameObjectMap);
    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MeshRendererData.meshRendererMap);
});
export var getGameObject = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
export var getRenderList = curry(function (state, MeshRendererData) {
    return MeshRendererData.renderGameObjectArray;
});
export var initData = function (MeshRendererData) {
    MeshRendererData.renderGameObjectArray = [];
    MeshRendererData.gameObjectMap = [];
    MeshRendererData.meshRendererMap = [];
    MeshRendererData.index = 0;
    MeshRendererData.count = 0;
};
//# sourceMappingURL=MeshRendererSystem.js.map