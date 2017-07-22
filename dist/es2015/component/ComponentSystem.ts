import { ComponentData, ComponentGameObjectMap } from "./ComponentData";
import { Component } from "./Component";
import { getTypeIDFromClass, getTypeIDFromComponent } from "./ComponentTypeIDManager";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { expect } from "wonder-expect.js";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { deleteBySwap, deleteVal, isNotValidMapValue } from "../utils/objectUtils";
import { Map as MapImmutable } from "immutable";
import { deleteBySwap as deleteBySwapArray } from "../utils/arrayUtils";
import { IUIDEntity } from "../core/entityObject/gameObject/IUIDEntity";

var _addHandle = (_class: any, handleMap: object, handle: Function) => {
    var typeID = getTypeIDFromClass(_class);

    handleMap[typeID] = handle;
}

export var addAddComponentHandle = (_class: any, handle: Function) => {
    _addHandle(_class, ComponentData.addComponentHandleMap, handle);
}

export var addDisposeHandle = (_class: any, handle: Function) => {
    _addHandle(_class, ComponentData.disposeHandleMap, handle);
}

export var addInitHandle = (_class: any, handle: (index: number, state: MapImmutable<any, any>) => void) => {
    _addHandle(_class, ComponentData.initHandleMap, handle);
}

export var execHandle = (component: Component, handleMapName: string, args?: Array<any>) => {
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
}

export var execInitHandle = (typeID: string, index: number, state: MapImmutable<any, any>) => {
    var handle = ComponentData.initHandleMap[typeID];

    if (_isHandleNotExist(handle)) {
        return;
    }

    handle(index, state);
}

var _isHandleNotExist = (handle: Function) => isNotValidMapValue(handle);

export var checkComponentShouldAlive = (component: Component, data: any, isAlive: (component: Component, data: any) => boolean) => {
    it("component should alive", () => {
        expect(isAlive(component, data)).true;
    });
}

export var addComponentToGameObjectMap = requireCheckFunc((gameObjectMap: ComponentGameObjectMap | Array<GameObject>, index: number, gameObject: GameObject) => {
    it("component should not exist in gameObject", () => {
        expect(gameObjectMap[index]).not.exist;
    });
}, (gameObjectMap: ComponentGameObjectMap | Array<GameObject>, index: number, gameObject: GameObject) => {
    gameObjectMap[index] = gameObject;
})

export var getComponentGameObject = (gameObjectMap: ComponentGameObjectMap | Array<GameObject>, index: number) => {
    return gameObjectMap[index];
}

export var generateComponentIndex = (ComponentData: any) => {
    return ComponentData.index++;
}

export var deleteComponent = requireCheckFunc((index: number, componentMap: ComponentMap) => {
    it("index should >= 0", () => {
        expect(index).gte(0);
    });
}, (index: number, componentMap: ComponentMap) => {
    markComponentIndexRemoved(componentMap[index]);

    deleteVal(index, componentMap);
})
//
// export var deleteComponentBySwap = requireCheckFunc((sourceIndex: number, targetIndex: number | null, componentMap: ComponentMap) => {
//     it("targetIndex should >= 0", () => {
//         expect(targetIndex).gte(0);
//     });
// }, (sourceIndex: number, targetIndex: number, componentMap: ComponentMap) => {
//     componentMap[targetIndex].index = sourceIndex;
//     markComponentIndexRemoved(componentMap[sourceIndex]);
//
//     deleteBySwap(sourceIndex, targetIndex, componentMap);
// })

export var deleteComponentBySwapArray = requireCheckFunc((sourceIndex: number, targetIndex: number | null, componentMap: Array<Component>) => {
    it("targetIndex should >= 0", () => {
        expect(targetIndex).gte(0);
    });
}, (sourceIndex: number, targetIndex: number, componentMap: Array<Component>) => {
    componentMap[targetIndex].index = sourceIndex;
    markComponentIndexRemoved(componentMap[sourceIndex]);

    deleteBySwapArray(sourceIndex, targetIndex, componentMap);
})

export var markComponentIndexRemoved = (component: Component) => {
    component.index = -1;
}

export var isComponentIndexNotRemoved = (component: Component) => {
    return component.index !== -1;
}

export type ComponentMap = {
    [index: number]: Component;
}
