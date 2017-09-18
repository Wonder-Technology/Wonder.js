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
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { cacheFunc } from "../../utils/cacheUtils";
import { Matrix4 } from "../../math/Matrix4";
import { CameraControllerData } from "./CameraControllerData";
import { PerspectiveCameraData } from "./PerspectiveCameraData";
import { CameraData } from "./CameraData";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";

export const addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export const addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export const create = requireCheckFunc((CameraControllerData: any) => {
    checkIndexShouldEqualCount(CameraControllerData);
}, (CameraControllerData: any) => {
    var controller = new CameraController(),
        index = generateComponentIndex(CameraControllerData);

    controller.index = index;

    CameraControllerData.count += 1;

    addToDirtyList(index, CameraControllerData);

    return controller;
})

export const addToDirtyList = ensureFunc((index: number, CameraControllerData: any) => {
    // it("dirty index should not be duplicated", () => {
    //     expect(hasDuplicateItems(CameraControllerData.dirtyIndexArray)).false;
    // });
}, (index: number, CameraControllerData: any) => {
    CameraControllerData.dirtyIndexArray.push(index);
})

export const init = (PerspectiveCameraData: any, CameraData: any, CameraControllerData: any, state: Map<any, any>) => {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, (dirtyIndex: number) => {
        initCameraController(state, dirtyIndex, PerspectiveCameraData, CameraData);
    });

    _clearDirtyList(CameraControllerData);

    return state;
}

export const initCameraController = (state: Map<any, any>, index: number, PerspectiveCameraData: any, CameraData: any) => {
    initCamera(state, index, PerspectiveCameraData, CameraData);
}

const _forEachDirtyList =(dirtyIndexArray: Array<number>, func: (dirtyIndex: number) => void) => {
    var arr = removeDuplicateItems(dirtyIndexArray);

    for (let dirtyIndex of arr) {
        func(dirtyIndex);
    }
}

const _clearDirtyList =(CameraControllerData: any) => {
    CameraControllerData.dirtyIndexArray = [];
}

export const update = (PerspectiveCameraData: any, CameraData: any, CameraControllerData: any, state: Map<any, any>) => {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, (dirtyIndex: number) => {
        updateProjectionMatrix(dirtyIndex, PerspectiveCameraData, CameraData);
    });

    _clearDirtyList(CameraControllerData);
    _clearCache(CameraControllerData);

    return state;
}

export const addComponent = (component: CameraController, gameObject: GameObject) => {
    addComponentToGameObjectMap(CameraControllerData.gameObjectMap, component.index, gameObject);
}

export const disposeComponent = (component: CameraController) => {
    var index = component.index;

    deleteVal(index, CameraControllerData.gameObjectMap);
    deleteVal(index, CameraControllerData.worldToCameraMatrixCacheMap);

    CameraControllerData.count -= 1;

    CameraControllerData.dirtyIndexArray = removeItem(CameraControllerData.dirtyIndexArray, index);

    dispose(index, PerspectiveCameraData, CameraData);
}

export const getGameObject = (index: number, CameraControllerData: any) => {
    return getComponentGameObject(CameraControllerData.gameObjectMap, index);
}

export const getWorldToCameraMatrix = cacheFunc((index: number, ThreeDTransformData: any, GameObjectData: any, CameraControllerData: any, CameraData: any) => {
    return isValidMapValue(CameraControllerData.worldToCameraMatrixCacheMap[index]);
}, (index: number, ThreeDTransformData: any, GameObjectData: any, CameraControllerData: any, CameraData: any) => {
    return CameraControllerData.worldToCameraMatrixCacheMap[index];
}, (index: number, ThreeDTransformData: any, GameObjectData: any, CameraControllerData: any, CameraData: any, worldToCamraMatrix: Matrix4, ) => {
    CameraControllerData.worldToCameraMatrixCacheMap[index] = worldToCamraMatrix;
}, (index: number, ThreeDTransformData: any, GameObjectData: any, CameraControllerData: any, CameraData: any) => {
    return getWorldToCameraMatrixCamera(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData);
})

export const getPMatrix = (index: number, CameraData: any) => {
    return getPMatrixCamera(index, CameraData);
}

const _clearCache =(CameraControllerData: any) => {
    CameraControllerData.worldToCameraMatrixCacheMap = {};
}

export const initData = (CameraControllerData: any, PerspectiveCameraData: any, CameraData: any) => {
    CameraControllerData.index = 0;
    CameraControllerData.count = 0;
    CameraControllerData.gameObjectMap = createMap();
    CameraControllerData.dirtyIndexArray = [];
    CameraControllerData.worldToCameraMatrixCacheMap = createMap();

    initDataCamera(PerspectiveCameraData, CameraData);
}
