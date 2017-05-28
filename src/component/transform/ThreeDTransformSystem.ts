import { ThreeDTransformData } from "./ThreeDTransformData";
import curry from "wonder-lodash/curry";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BatchTransformData, IThreeDTransform, ThreeDTransform } from "./ThreeDTransform";
import { Map as MapImmutable } from "immutable";
import { DataUtils } from "../../utils/DataUtils";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { cacheFunc } from "../../utils/cacheUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap,
    getComponentGameObjectByMap, setComponentGameObjectByMap
} from "../ComponentSystem";
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { update as updateSystem } from "./updateSystem";
import {
    addFirstDirtyIndex, addItAndItsChildrenToDirtyList, addNotUsedIndex,
    generateNotUsedIndexInArrayBuffer, isNotDirty
} from "./dirtySystem";
import {
    getParent as getThreeDTransformDataParent, removeHierarchyData,
    setParent as setParentHierarchy
} from "./hierarchySystem";
import {
    getMatrix4DataIndexInArrayBuffer, getMatrix4DataSize,
    getQuaternionDataSize, getVector3DataIndexInArrayBuffer, getVector3DataSize,
    setLocalPositionData, setPositionData, setTransformDataInTypeArr,
    swap
} from "./operateDataSystem";
import { setIsTranslate } from "./isTransformSystem";
import { getStartIndexInArrayBuffer } from "./utils";
import { checkTransformShouldAlive } from "./contractUtils";
import { setBatchDatas as setBatchDatasSystem } from "./batchSystem";
import { deleteMapVal } from "../../utils/mapUtils";
import { getCache, setCache } from "./cacheSystem";
import { isDisposeTooManyComponents, reAllocateThreeDTransformMap } from "../../utils/memoryUtils";

export var addAddComponentHandle = (_class: any, ThreeDTransformData:any) => {
    addAddComponentHandleToMap(_class, addComponent(ThreeDTransformData));
}

export var addDisposeHandle = (_class: any, GlobalTempData:any, ThreeDTransformData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(GlobalTempData, ThreeDTransformData));
}

export var create = (ThreeDTransformData:any) => {
    var transform = new ThreeDTransform(),
        index = _generateIndexInArrayBuffer(ThreeDTransformData),
        uid = _buildUID(ThreeDTransformData);

    transform.index = index;
    transform.uid = uid;


    _createTempData(uid, ThreeDTransformData);
    _setTransformMap(index, transform, ThreeDTransformData);

    return transform;
}

var _buildUID = (ThreeDTransformData:any) => {
    return ThreeDTransformData.uid++;
}

var _generateIndexInArrayBuffer = (ThreeDTransformData:any) => {
    return generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
}


var _createTempData = (uid:number, ThreeDTransformData:any,) => {
    ThreeDTransformData.tempPositionMap[uid] = Vector3.create();
    ThreeDTransformData.tempLocalPositionMap[uid] = Vector3.create();
    ThreeDTransformData.tempLocalToWorldMatrixMap[uid] = Matrix4.create();

    return ThreeDTransformData;
}

export var init = (GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => {
    return update(null, GlobalTempData, ThreeDTransformData, state);
}

export var addComponent = curry((ThreeDTransformData: any, transform: ThreeDTransform, gameObject:GameObject) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid;

    setComponentGameObjectByMap(ThreeDTransformData.gameObjectMap, uid, gameObject);

    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
})

export var disposeComponent = curry((GlobalTempData:any, ThreeDTransformData:any, transform: ThreeDTransform) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid;

    if(isDisposeTooManyComponents(ThreeDTransformData.disposeCount)){
        reAllocateThreeDTransformMap(ThreeDTransformData.gameObjectMap, ThreeDTransformData);

        ThreeDTransformData.disposeCount = 0;
    }
    else{
        ThreeDTransformData.disposeCount += 1;
    }


    if (isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
        return _disposeFromNormalList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
    }

    _disposeFromDirtyList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
})

export var getGameObject = (uid:number, ThreeDTransformData:any) => getComponentGameObjectByMap(ThreeDTransformData.gameObjectMap, uid);

export var getParent = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var parent = getThreeDTransformDataParent(transform.uid, ThreeDTransformData);

    if(isValidMapValue(parent)){
        return parent;
    }

    return null;
}

export var setParent = (transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => setParentHierarchy(transform, parent, ThreeDTransformData);

export var getLocalToWorldMatrix = requireCheckFunc((transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    return isValidMapValue(getCache(ThreeTransformData.localToWorldMatrixCacheMap, transform.uid));
}, (transform:IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    return getCache(ThreeTransformData.localToWorldMatrixCacheMap, transform.uid);
}, (transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any, returnedMat:Matrix4) => {
    setCache(ThreeTransformData.localToWorldMatrixCacheMap, transform.uid, returnedMat);
}, (transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    return DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
}))

export var getPosition = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    return isValidMapValue(getCache(ThreeTransformData.positionCacheMap, transform.uid));
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    return getCache(ThreeTransformData.positionCacheMap, transform.uid);
}, (transform:ThreeDTransform, ThreeTransformData: any, position:Vector3) => {
    setCache(ThreeTransformData.positionCacheMap, transform.uid, position);
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    var indexInArrayBuffer = getMatrix4DataIndexInArrayBuffer(transform.index),
        localToWorldMatrices = ThreeTransformData.localToWorldMatrices;

    return ThreeTransformData.tempPositionMap[transform.uid].set(localToWorldMatrices[indexInArrayBuffer + 12], localToWorldMatrices[indexInArrayBuffer + 13], localToWorldMatrices[indexInArrayBuffer + 14]);
}))

var _setTransformMap = (indexInArrayBuffer:number, transform:ThreeDTransform, ThreeDTransformData:any) => ThreeDTransformData.transformMap[indexInArrayBuffer] = transform;

export var setPosition = requireCheckFunc((transform:ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, (transform:ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid,
        parent = getThreeDTransformDataParent(uid, ThreeDTransformData),
        vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

    setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);

    setIsTranslate(uid, true, ThreeTransformData);

    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
})

export var setBatchDatas = (batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeTransformData: any) => setBatchDatasSystem(batchData, GlobalTempData, ThreeDTransformData);

export var getLocalPosition = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    return isValidMapValue(getCache(ThreeTransformData.localPositionCacheMap, transform.uid));
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    return getCache(ThreeTransformData.localPositionCacheMap, transform.uid);
}, (transform:ThreeDTransform, ThreeTransformData: any, position:Vector3) => {
    setCache(ThreeTransformData.localPositionCacheMap, transform.uid, position);
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    return DataUtils.createVector3ByIndex(ThreeTransformData.tempLocalPositionMap[transform.uid], ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
}))

export var setLocalPosition = requireCheckFunc((transform:ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, (transform:ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid,
        vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);

    setIsTranslate(uid, true, ThreeTransformData);

    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
})

export var update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => {
    return updateSystem(elapsed, GlobalTempData, ThreeDTransformData, state);
}

var _disposeItemInDataContainer = (indexInArrayBuffer: number, uid:number, GlobalTempData: any, ThreeDTransformData: any) => {
    var mat = GlobalTempData.matrix4_1.setIdentity(),
        positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
        qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
        scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

    setTransformDataInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData);

    removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(indexInArrayBuffer, uid, ThreeDTransformData);

    return ThreeDTransformData;
}

var _disposeMapDatas = (indexInArrayBuffer:number, uid:number, ThreeDTransformData:any) => {
    deleteMapVal(uid, ThreeDTransformData.gameObjectMap);

    deleteVal(uid, ThreeDTransformData.isTranslateMap);
    deleteVal(uid, ThreeDTransformData.positionCacheMap);
    deleteVal(uid, ThreeDTransformData.localPositionCacheMap);
    deleteVal(uid, ThreeDTransformData.localToWorldMatrixCacheMap);
    deleteVal(uid, ThreeDTransformData.tempLocalToWorldMatrixMap);
    deleteVal(uid, ThreeDTransformData.tempPositionMap);
    deleteVal(uid, ThreeDTransformData.tempLocalPositionMap);

    deleteVal(indexInArrayBuffer, ThreeDTransformData.transformMap);
}

var _disposeFromNormalList = (indexInArrayBuffer: number, uid:number, GlobalTempData: any, ThreeDTransformData: any) => {
    addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray);

    return _disposeItemInDataContainer(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
}


var _disposeFromDirtyList = (indexInArrayBuffer: number, uid:number, GlobalTempData: any, ThreeDTransformData: any) => {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;

    swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData);


    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);

    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
}

var _addDefaultTransformData = (GlobalTempData: any, ThreeDTransformData: any) => {
    var count = ThreeDTransformData.count,
        mat = GlobalTempData.matrix4_1.setIdentity(),
        positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
        qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
        scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

    for (let i = getStartIndexInArrayBuffer(); i < count; i++) {
        setTransformDataInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    }
}

export var getTempLocalToWorldMatrix = (transform:ThreeDTransform, ThreeDTransformData:any) => ThreeDTransformData.tempLocalToWorldMatrixMap[transform.uid];

export var initData = (GlobalTempData: any, ThreeDTransformData: any) => {
    var buffer: ArrayBuffer = null,
        count = ThreeDTransformData.count,
        size = Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);

    ThreeDTransformData.buffer = new ArrayBuffer(count * size);

    buffer = ThreeDTransformData.buffer;

    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getMatrix4DataSize(), count * getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize()), count * getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize()), count * getVector3DataSize());


    ThreeDTransformData.notUsedIndexArray = [];

    ThreeDTransformData.parentMap = createMap();
    ThreeDTransformData.childrenMap = createMap();

    ThreeDTransformData.isTranslateMap = createMap();

    ThreeDTransformData.positionCacheMap = createMap();
    ThreeDTransformData.localPositionCacheMap = createMap();
    ThreeDTransformData.localToWorldMatrixCacheMap = createMap();

    ThreeDTransformData.tempPositionMap = createMap();
    ThreeDTransformData.tempLocalPositionMap = createMap();
    ThreeDTransformData.tempLocalToWorldMatrixMap = createMap();

    ThreeDTransformData.transformMap = {};

    ThreeDTransformData.gameObjectMap = new Map();

    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
    ThreeDTransformData.indexInArrayBuffer = getStartIndexInArrayBuffer();

    ThreeDTransformData.uid = 0;
    ThreeDTransformData.disposeCount = 0;
    ThreeDTransformData.isClearCacheMap = false;

    _addDefaultTransformData(GlobalTempData, ThreeDTransformData);
}

