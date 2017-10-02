import { ThreeDTransformData } from "./ThreeDTransformData";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BatchTransformData, BatchTypeArrayTransformData, IThreeDTransform, ThreeDTransform } from "./ThreeDTransform";
import { Map as MapImmutable } from "immutable";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { cacheFunc } from "../../utils/cacheUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, checkComponentShouldAlive, getComponentGameObject
} from "../ComponentSystem";
import { createMap, deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { update as updateSystem } from "./updateSystem";
import {
    addFirstDirtyIndex, addItAndItsChildrenToDirtyList, addNotUsedIndex,
    generateNotUsedIndexInArrayBuffer, isNotDirty
} from "./dirtySystem";
import {
    getChildren,
    getParent as getThreeDTransformDataParent, isChildrenExist, removeHierarchyData, setChildren,
    setParent as setParentHierarchy
} from "./hierarchySystem";
import {
    getMatrix4DataIndexInArrayBuffer, getVector3DataIndexInArrayBuffer, setDefaultTypeArrData,
    setLocalPositionData, setPositionData, setTransformDataInTypeArr,
    swap
} from "./operateDataSystem";
import { getStartIndexInArrayBuffer } from "./utils";
import { checkTransformShouldAlive } from "./contractUtils";
import { setBatchData as setBatchDataSystem } from "./batchSystem";
import {
    getLocalPositionCache, getLocalToWorldMatrixCache, getNormalMatrixCache, getPositionCache, setLocalPositionCache,
    setLocalToWorldMatrixCache, setNormalMatrixCache, setPositionCache
} from "./cacheSystem";
import { isDisposeTooManyComponents, reAllocateThreeDTransform } from "../../utils/memoryUtils";
import { LinkList } from "./LinkList";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { Quaternion } from "../../math/Quaternion";
import {
    createMatrix4ByIndex, createVector3ByIndex, getMatrix4DataSize, getQuaternionDataSize,
    getVector3DataSize
} from "../../utils/typeArrayUtils";
import { expect } from "wonder-expect.js";
import { Matrix3 } from "../../math/Matrix3";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
import { triggerEvent } from "../../event/EventManagerSystem";
import curry from "wonder-lodash/curry";
import { createTempData, setTransformMap } from "./tempDataSystem";

export const addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export const addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export const create = ensureFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    it("componentMap should has data", () => {
        expect(getChildren(transform.uid, ThreeDTransformData)).exist;
    });
    it("count should <= ThreeDTransformData.maxCount", () => {
        expect(ThreeDTransformData.count).lte(ThreeDTransformData.maxCount);
    });
}, (ThreeDTransformData: any) => {
    var transform = new ThreeDTransform(),
        index = generateNotUsedIndexInArrayBuffer(ThreeDTransformData),
        uid = _buildUId(ThreeDTransformData);

    transform.index = index;
    transform.uid = uid;

    ThreeDTransformData.count += 1;

    createTempData(uid, ThreeDTransformData);
    setTransformMap(index, transform, ThreeDTransformData);
    setChildren(uid, [], ThreeDTransformData);

    setDefaultTypeArrData(index, ThreeDTransformData);

    ThreeDTransformData.aliveUIdArray.push(uid);

    return transform;
})

const _buildUId =(ThreeDTransformData: any) => {
    return ThreeDTransformData.uid++;
}

export const checkShouldAlive = (component: ThreeDTransform, ThreeDTransformData: any) => {
    checkComponentShouldAlive(component, ThreeDTransformData, (component: ThreeDTransform, ThreeDTransformData: any) => {
        return isChildrenExist(getChildren(component.uid, ThreeDTransformData));
    })
}

export const init = (GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => {
    return update(null, GlobalTempData, ThreeDTransformData, state);
}

export const addComponent = (transform: ThreeDTransform, gameObject: GameObject) => {
    var index = transform.index,
        uid = transform.uid;

    addComponentToGameObjectMap(ThreeDTransformData.gameObjectMap, uid, gameObject);

    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
}

export const isAlive = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return isValidMapValue(ThreeDTransformData.transformMap[transform.index]);
}

export const isNotAlive = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return !isAlive(transform, ThreeDTransformData);
}

export const disposeComponent = (transform: ThreeDTransform) => {
    var index = transform.index,
        uid = transform.uid;

    if (isNotDirty(index, ThreeDTransformData.firstDirtyIndex)) {
        _disposeFromNormalList(index, uid, GlobalTempData, ThreeDTransformData);
    }
    else {
        _disposeFromDirtyList(index, uid, GlobalTempData, ThreeDTransformData);
    }

    ThreeDTransformData.count -= 1;
    ThreeDTransformData.disposeCount += 1;

    if (isDisposeTooManyComponents(ThreeDTransformData.disposeCount)) {
        reAllocateThreeDTransform(ThreeDTransformData);

        ThreeDTransformData.disposeCount = 0;
    }
}

export const getGameObject = (uid: number, ThreeDTransformData: any) => getComponentGameObject(ThreeDTransformData.gameObjectMap, uid);

export const getParent = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var parent = getThreeDTransformDataParent(transform.uid, ThreeDTransformData);

    if (isValidMapValue(parent)) {
        return parent;
    }

    return null;
}

export const setParent = (parent: ThreeDTransform, child:ThreeDTransform, ThreeDTransformData: any) => setParentHierarchy(parent, child, ThreeDTransformData);

export const getLocalToWorldMatrix = requireCheckFunc((transform: IThreeDTransform, mat: Matrix4, ThreeDTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc((transform: IThreeDTransform, mat: Matrix4, ThreeDTransformData: any) => {
    return isValidMapValue(getLocalToWorldMatrixCache(transform.uid, ThreeDTransformData));
}, (transform: IThreeDTransform, mat: Matrix4, ThreeDTransformData: any) => {
    return getLocalToWorldMatrixCache(transform.uid, ThreeDTransformData);
}, (transform: IThreeDTransform, mat: Matrix4, ThreeDTransformData: any, returnedMat: Matrix4) => {
    setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeDTransformData);
}, (transform: IThreeDTransform, mat: Matrix4, ThreeDTransformData: any) => {
    return createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
}))

export const getPosition = requireCheckFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    return isValidMapValue(getPositionCache(transform.uid, ThreeDTransformData));
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return getPositionCache(transform.uid, ThreeDTransformData);
}, (transform: ThreeDTransform, ThreeDTransformData: any, position: Vector3) => {
    setPositionCache(transform.uid, position, ThreeDTransformData);
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var index = getMatrix4DataIndexInArrayBuffer(transform.index),
        localToWorldMatrices = ThreeDTransformData.localToWorldMatrices;

    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
}))

export const getNormalMatrix = requireCheckFunc((transform: ThreeDTransform, GlobalTempData: any, ThreeDTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc((transform: ThreeDTransform, GlobalTempData: any, ThreeDTransformData: any) => {
    return isValidMapValue(getNormalMatrixCache(transform.uid, ThreeDTransformData));
}, (transform: ThreeDTransform, GlobalTempData: any, ThreeDTransformData: any) => {
    return getNormalMatrixCache(transform.uid, ThreeDTransformData);
}, (transform: ThreeDTransform, GlobalTempData: any, ThreeDTransformData: any, mat: Matrix3) => {
    setNormalMatrixCache(transform.uid, mat, ThreeDTransformData);
}, (transform: ThreeDTransform, GlobalTempData: any, ThreeDTransformData: any) => {
    return getLocalToWorldMatrix(transform, GlobalTempData.matrix4_1, ThreeDTransformData).invertTo3x3().transpose();
}))

export const setPosition = requireCheckFunc((transform: ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeDTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, (transform: ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeDTransformData: any) => {
    var index = transform.index,
        uid = transform.uid,
        parent = getThreeDTransformDataParent(uid, ThreeDTransformData),
        vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);

    setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);

    _triggerChangePositionEvent(uid, ThreeDTransformData);

    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
})

export const setBatchData = (batchData: Array<BatchTransformData>, GlobalTempData: any, ThreeDTransformData: any) => setBatchDataSystem(batchData, GlobalTempData, ThreeDTransformData);

export const getLocalPosition = requireCheckFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    return isValidMapValue(getLocalPositionCache(transform.uid, ThreeDTransformData));
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return getLocalPositionCache(transform.uid, ThreeDTransformData);
}, (transform: ThreeDTransform, ThreeDTransformData: any, position: Vector3) => {
    setLocalPositionCache(transform.uid, position, ThreeDTransformData);
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
}))

export const setLocalPosition = requireCheckFunc((transform: ThreeDTransform, position: Vector3, ThreeDTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, (transform: ThreeDTransform, position: Vector3, ThreeDTransformData: any) => {
    var index = transform.index,
        uid = transform.uid,
        vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);

    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeDTransformData);

    _triggerChangePositionEvent(uid, ThreeDTransformData);

    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
})

const _triggerChangePositionEvent =(uid: number, ThreeDTransformData: any) => {
    triggerEvent("changePosition");
}

export const update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => {
    return updateSystem(elapsed, GlobalTempData, ThreeDTransformData, state);
}

const _disposeItemInDataContainer =(index: number, uid: number, GlobalTempData: any, ThreeDTransformData: any) => {
    removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(index, uid, ThreeDTransformData);

    return ThreeDTransformData;
}

const _disposeMapDatas =(index: number, uid: number, ThreeDTransformData: any) => {
    deleteVal(index, ThreeDTransformData.transformMap);
}

const _disposeFromNormalList =(index: number, uid: number, GlobalTempData: any, ThreeDTransformData: any) => {
    addNotUsedIndex(index, ThreeDTransformData.notUsedIndexLinkList);

    return _disposeItemInDataContainer(index, uid, GlobalTempData, ThreeDTransformData);
}


const _disposeFromDirtyList =(index: number, uid: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;

    swap(index, firstDirtyIndex, ThreeDTransformData);


    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);

    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
}


export const getTempLocalToWorldMatrix = (transform: ThreeDTransform, ThreeDTransformData: any) => _getTempData(transform.uid, ThreeDTransformData).localToWorldMatrix;

const _getTempData =(uid: number, ThreeDTransformData: any) => {
    var tempData = ThreeDTransformData.tempMap[uid];

    if (isNotValidMapValue(tempData)) {
        tempData = {};
        ThreeDTransformData.tempMap[uid] = tempData;
    }

    return tempData;
}

export const initData = (GlobalTempData: any, ThreeDTransformData: any) => {
    _initBufferData(ThreeDTransformData);

    ThreeDTransformData.defaultPosition = Vector3.create(0, 0, 0);
    ThreeDTransformData.defaultRotation = Quaternion.create(0, 0, 0, 1);
    ThreeDTransformData.defaultScale = Vector3.create(1, 1, 1);
    ThreeDTransformData.defaultLocalToWorldMatrice = Matrix4.create().setIdentity();


    ThreeDTransformData.notUsedIndexLinkList = LinkList.create();

    ThreeDTransformData.parentMap = createMap();
    ThreeDTransformData.childrenMap = createMap();

    ThreeDTransformData.isTranslateMap = createMap();

    ThreeDTransformData.cacheMap = createMap();
    ThreeDTransformData.tempMap = createMap();

    ThreeDTransformData.transformMap = createMap();

    ThreeDTransformData.gameObjectMap = createMap();

    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.maxCount;
    ThreeDTransformData.index = getStartIndexInArrayBuffer();

    ThreeDTransformData.uid = 0;
    ThreeDTransformData.disposeCount = 0;
    ThreeDTransformData.isClearCacheMap = false;

    ThreeDTransformData.count = 0;

    ThreeDTransformData.aliveUIdArray = [];
}

const _initBufferData =(ThreeDTransformData: any) => {
    var buffer: ArrayBuffer = null,
        count = ThreeDTransformData.maxCount,
        size = Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize() + getVector3DataSize());

    buffer = new ArrayBuffer(count * size);

    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getMatrix4DataSize(), count * getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize()), count * getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize()), count * getVector3DataSize());

    ThreeDTransformData.buffer = buffer;
}
