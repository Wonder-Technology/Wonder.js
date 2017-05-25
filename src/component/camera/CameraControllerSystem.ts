import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import {
    dispose, getPMatrix as getPMatrixCamera,
    getWorldToCameraMatrix as getWorldToCameraMatrixCamera, init as initCamera, initData as initDataCamera,
    updateProjectionMatrix
} from "./CameraSystem";
import { CameraController } from "./CameraController";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Map } from "immutable";
import { removeDuplicateItems, removeItem } from "../../utils/arrayUtils";
import { deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { cacheFunc } from "../../utils/cacheUtils";
import { Matrix4 } from "../../math/Matrix4";

export var addAddComponentHandle = (_class: any, CameraControllerData:any) => {
    addAddComponentHandleToMap(_class, addComponent(CameraControllerData));
}

export var addDisposeHandle = (_class: any, PerspectiveCameraData:any, CameraData:any, CameraControllerData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(PerspectiveCameraData, CameraData, CameraControllerData));
}

export var create = requireCheckFunc((CameraControllerData: any) => {
    checkIndexShouldEqualCount(CameraControllerData);
}, (CameraControllerData: any) => {
    var controller = new CameraController(),
        index = generateComponentIndex(CameraControllerData);

    controller.index = index;

    CameraControllerData.count += 1;

    addToDirtyList(index, CameraControllerData);

    return controller;
})

export var addToDirtyList = ensureFunc((index:number, CameraControllerData: any) => {
    // it("dirty index should not be duplicated", () => {
    //     expect(hasDuplicateItems(CameraControllerData.dirtyIndexArray)).false;
    // });
}, (index:number, CameraControllerData: any) => {
    CameraControllerData.dirtyIndexArray.push(index);
})

export var init = (PerspectiveCameraData:any, CameraData:any, CameraControllerData:any, state: Map<any, any>) => {
    // for(let i = 0, count = CameraControllerData.count; i < count; i++){
    //     for(let i = 0, count = CameraControllerData.count; i < count; i++){
    //todo refactor MaterialSystem

    _forEachDirtyList(CameraControllerData.dirtyIndexArray, (dirtyIndex:number) => {
        initCameraController(state, dirtyIndex, PerspectiveCameraData, CameraData);
    });

    _clearDirtyList(CameraControllerData);

    return state;
}

export var initCameraController = (state: Map<any, any>, index:number, PerspectiveCameraData:any, CameraData:any) => {
    initCamera(state, index, PerspectiveCameraData, CameraData);
}

var _forEachDirtyList = (dirtyIndexArray:Array<number>, func:(dirtyIndex:number) => void) => {
    var arr = removeDuplicateItems(dirtyIndexArray);

    for(let dirtyIndex of arr){
        func(dirtyIndex);
    }
}

var _clearDirtyList = (CameraControllerData: any) => {
    CameraControllerData.dirtyIndexArray = [];
}

export var update = (PerspectiveCameraData:any, CameraData:any, CameraControllerData:any) => {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, (dirtyIndex:number) => {
        updateProjectionMatrix(dirtyIndex, PerspectiveCameraData, CameraData);
    });

    _clearDirtyList(CameraControllerData);
    _clearCache(CameraControllerData);
}

export var addComponent = curry((CameraControllerData:any, component:CameraController, gameObject:GameObject) => {
    addComponentToGameObjectMap(CameraControllerData.gameObjectMap, component.index, gameObject);
})

export var disposeComponent = curry((PerspectiveCameraData:any, CameraData:any, CameraControllerData:any, component:CameraController) => {
    var index = component.index;

    deleteVal(index, CameraControllerData.gameObjectMap);
    deleteVal(index, CameraControllerData.worldToCameraMatrixCacheMap);

    CameraControllerData.count -= 1;

    CameraControllerData.dirtyIndexArray = removeItem(CameraControllerData.dirtyIndexArray, index);

    dispose(index, PerspectiveCameraData, CameraData);
})

export var getGameObject = (index:number, CameraControllerData:any) => {
    return getComponentGameObject(CameraControllerData.gameObjectMap, index);
}

export var getWorldToCameraMatrix = cacheFunc((index:number, ThreeDTransformData:any, GameObjectData:any, CameraControllerData:any, CameraData:any) => {
    return isValidMapValue(CameraControllerData.worldToCameraMatrixCacheMap[index]);
}, (index:number, ThreeDTransformData:any, GameObjectData:any, CameraControllerData:any, CameraData:any) => {
    return CameraControllerData.worldToCameraMatrixCacheMap[index];
}, (index:number, ThreeDTransformData:any, GameObjectData:any, CameraControllerData:any, CameraData:any, worldToCamraMatrix:Matrix4,) => {
    CameraControllerData.worldToCameraMatrixCacheMap[index] = worldToCamraMatrix;
}, (index:number, ThreeDTransformData:any, GameObjectData:any, CameraControllerData:any, CameraData:any) => {
    return getWorldToCameraMatrixCamera(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData);
})

export var getPMatrix = (index:number, CameraData:any) => {
    return getPMatrixCamera(index, CameraData);
}

var _clearCache = (CameraControllerData:any) => {
    CameraControllerData.worldToCameraMatrixCacheMap = {};
}

export var initData = (CameraControllerData: any, PerspectiveCameraData:any, CameraData:any) => {
    CameraControllerData.index = 0;
    CameraControllerData.count = 0;
    CameraControllerData.gameObjectMap = {};
    CameraControllerData.dirtyIndexArray = [];
    CameraControllerData.worldToCameraMatrixCacheMap = {};

    initDataCamera(PerspectiveCameraData, CameraData);
}
