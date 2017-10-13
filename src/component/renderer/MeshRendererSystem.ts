import { MeshRenderer } from "./MeshRenderer";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { deleteBySwap } from "../../utils/arrayUtils";
import { expect } from "wonder-expect.js";
import { Map } from "immutable";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, deleteComponentBySwapArray,
    generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import { createMap, deleteBySwap as deleteObjectBySwap, deleteVal } from "../../utils/objectUtils";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { MeshRendererData } from "./MeshRendererData";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";

export const addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export const addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export const create = requireCheckFunc((MeshRendererData: any) => {
    checkIndexShouldEqualCount(MeshRendererData);
}, (MeshRendererData: any) => {
    var renderer = new MeshRenderer(),
        index = generateComponentIndex(MeshRendererData);

    renderer.index = index;

    MeshRendererData.count += 1;

    MeshRendererData.meshRendererMap[index] = renderer;

    return renderer;
})

const _setRenderGameObjectArray = requireCheckFunc((index: number, gameObject: GameObject, renderGameObjectArray: Array<GameObject>) => {
    it("should not exist gameObject", function() {
        expect(renderGameObjectArray[index]).not.exist;
    })
}, (index: number, gameObject: GameObject, renderGameObjectArray: Array<GameObject>) => {
    renderGameObjectArray[index] = gameObject;
})

export const addComponent = (component: MeshRenderer, gameObject: GameObject) => {
    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData.renderGameObjectArray);

    addComponentToGameObjectMap(MeshRendererData.gameObjectMap, component.index, gameObject);
}

export const disposeComponent = ensureFunc((returnVal, component: MeshRenderer) => {
    checkIndexShouldEqualCount(MeshRendererData);
}, (component: MeshRenderer) => {
    var sourceIndex = component.index,
        lastComponentIndex = null;

    MeshRendererData.count -= 1;
    MeshRendererData.index -= 1;

    lastComponentIndex = MeshRendererData.count;

    deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData.renderGameObjectArray);

    deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MeshRendererData.meshRendererMap);
})

export const getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export const getRenderList = curry((state: Map<any, any>, MeshRendererData: any) => {
    return MeshRendererData.renderGameObjectArray;
})

export const initData = (MeshRendererData: any) => {
    MeshRendererData.renderGameObjectArray = [];
    MeshRendererData.gameObjectMap = [];
    MeshRendererData.meshRendererMap = [];
    MeshRendererData.index = 0;
    MeshRendererData.count = 0;
}
