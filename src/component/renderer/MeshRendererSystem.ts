import { MeshRenderer } from "./MeshRenderer";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { deleteBySwap } from "../../utils/arrayUtils";
import { expect } from "wonder-expect.js";
import { Map } from "immutable";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, deleteComponentBySwap, generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import { createMap, deleteBySwap as deleteObjectBySwap, deleteVal } from "../../utils/objectUtils";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";

export var addAddComponentHandle = (_class: any, MaterialData:any) => {
    addAddComponentHandleToMap(_class, addComponent(MaterialData));
}

export var addDisposeHandle = (_class: any, MaterialData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(MaterialData));
}

export var create = requireCheckFunc((MeshRendererData: any) => {
    checkIndexShouldEqualCount(MeshRendererData);
}, (MeshRendererData: any) => {
    var renderer = new MeshRenderer(),
        index = generateComponentIndex(MeshRendererData);

    renderer.index = index;

    MeshRendererData.count += 1;

    MeshRendererData.meshRendererMap[index] = renderer;

    return renderer;
})

var _setRenderGameObjectArray = requireCheckFunc((index:number, gameObject:GameObject, renderGameObjectArray:Array<GameObject>) => {
    it("should not exist gameObject", function () {
        expect(renderGameObjectArray[index]).not.exist;
    })
},(index:number, gameObject:GameObject, renderGameObjectArray:Array<GameObject>) => {
    renderGameObjectArray[index] = gameObject;
})

export var addComponent = curry((MeshRendererData:any, component:MeshRenderer, gameObject:GameObject) => {
    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData.renderGameObjectArray);

    addComponentToGameObjectMap(MeshRendererData.gameObjectMap, component.index, gameObject);
})

export var disposeComponent = curry((MeshRendererData:any, component:MeshRenderer) => {
    var sourceIndex = component.index,
        lastComponentIndex = null;

    deleteBySwap(sourceIndex, MeshRendererData.renderGameObjectArray);

    MeshRendererData.count -= 1;
    MeshRendererData.index -= 1;

    lastComponentIndex = MeshRendererData.count;

    deleteObjectBySwap(sourceIndex, lastComponentIndex, MeshRendererData.gameObjectMap);

    deleteComponentBySwap(sourceIndex, lastComponentIndex, MeshRendererData.meshRendererMap);
})

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var getRenderList = curry((state:Map<any, any>, MeshRendererData:any) => {
    return MeshRendererData.renderGameObjectArray;
})

export var initData = (MeshRendererData: any) => {
    MeshRendererData.renderGameObjectArray = [];
    MeshRendererData.gameObjectMap = createMap();
    MeshRendererData.meshRendererMap = createMap();
    MeshRendererData.index = 0;
    MeshRendererData.count = 0;
}
