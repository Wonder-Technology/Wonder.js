import { ComponentData, ComponentGameObjectMap } from "./ComponentData";
import { Component } from "./Component";
import { getTypeIdFromClass, getTypeIdFromComponent } from "./ComponentTypeIdManager";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { expect } from "wonder-expect.js";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { deleteBySwap, deleteVal, isNotValidMapValue } from "../utils/objectUtils";
import { Map as MapImmutable } from "immutable";
import { deleteBySwap as deleteBySwapArray } from "../utils/arrayUtils";
import { IUIdEntity } from "../core/entityObject/gameObject/IUIdEntity";

const _addHandle =(_class: any, handleMap: object, handle: Function) => {
    var typeId = getTypeIdFromClass(_class);

    handleMap[typeId] = handle;
}

export const addAddComponentHandle = (_class: any, handle: Function) => {
    _addHandle(_class, ComponentData.addComponentHandleMap, handle);
}

export const addDisposeHandle = (_class: any, handle: Function) => {
    _addHandle(_class, ComponentData.disposeHandleMap, handle);
}

export const addInitHandle = (_class: any, handle: (index: number, state: MapImmutable<any, any>) => void) => {
    _addHandle(_class, ComponentData.initHandleMap, handle);
}

export const execHandle = (component: Component, handleMapName: string, args?: Array<any>) => {
    var handle = ComponentData[handleMapName][getTypeIdFromComponent(component)];

    if (_isHandleNotExist(handle)) {
        return;
    }

    if (!!args) {
        handle.apply(null, args);
    }
    else {
        handle(component);
    }
}

export const execInitHandle = (typeId: string, index: number, state: MapImmutable<any, any>) => {
    var handle = ComponentData.initHandleMap[typeId];

    if (_isHandleNotExist(handle)) {
        return;
    }

    handle(index, state);
}

const _isHandleNotExist =(handle: Function) => isNotValidMapValue(handle);

export const checkComponentShouldAlive = (component: Component, data: any, isAlive: (component: Component, data: any) => boolean) => {
    it("component should alive", () => {
        expect(isAlive(component, data)).true;
    });
}

export const addComponentToGameObjectMap = requireCheckFunc((gameObjectMap: ComponentGameObjectMap | Array<GameObject>, index: number, gameObject: GameObject) => {
    // it("component should not exist in gameObject", () => {
    //     expect(gameObjectMap[index]).not.exist;
    // });
}, (gameObjectMap: ComponentGameObjectMap | Array<GameObject>, index: number, gameObject: GameObject) => {
    gameObjectMap[index] = gameObject;
})

export const getComponentGameObject = (gameObjectMap: ComponentGameObjectMap | Array<GameObject>, index: number) => {
    return gameObjectMap[index];
}

export const generateComponentIndex = (ComponentData: any) => {
    return ComponentData.index++;
}

export const deleteComponent = requireCheckFunc((index: number, componentMap: ComponentMap) => {
    it("index should >= 0", () => {
        expect(index).gte(0);
    });
}, (index: number, componentMap: ComponentMap) => {
    markComponentIndexRemoved(componentMap[index]);

    deleteVal(index, componentMap);
})
//
// export const deleteComponentBySwap = requireCheckFunc((sourceIndex: number, targetIndex: number | null, componentMap: ComponentMap) => {
//     it("targetIndex should >= 0", () => {
//         expect(targetIndex).gte(0);
//     });
// }, (sourceIndex: number, targetIndex: number, componentMap: ComponentMap) => {
//     componentMap[targetIndex].index = sourceIndex;
//     markComponentIndexRemoved(componentMap[sourceIndex]);
//
//     deleteBySwap(sourceIndex, targetIndex, componentMap);
// })

export const deleteComponentBySwapArray = requireCheckFunc((sourceIndex: number, targetIndex: number | null, componentMap: Array<Component>) => {
    it("targetIndex should >= 0", () => {
        expect(targetIndex).gte(0);
    });
}, (sourceIndex: number, targetIndex: number, componentMap: Array<Component>) => {
    componentMap[targetIndex].index = sourceIndex;
    markComponentIndexRemoved(componentMap[sourceIndex]);

    deleteBySwapArray(sourceIndex, targetIndex, componentMap);
})

export const markComponentIndexRemoved = (component: Component) => {
    component.index = -1;
}

export const isComponentIndexNotRemoved = (component: Component) => {
    return component.index !== -1;
}

export type ComponentMap = {
    [index: number]: Component;
}
