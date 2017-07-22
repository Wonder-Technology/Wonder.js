import { ThreeDTransformData } from "./ThreeDTransformData";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BatchTransformData, IThreeDTransform, ThreeDTransform } from "./ThreeDTransform";
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
    getMatrix4DataIndexInArrayBuffer, getVector3DataIndexInArrayBuffer,
    setLocalPositionData, setPositionData, setTransformDataInTypeArr,
    swap
} from "./operateDataSystem";
import { setIsTranslate } from "./isTransformSystem";
import { getStartIndexInArrayBuffer } from "./utils";
import { checkTransformShouldAlive } from "./contractUtils";
import { setBatchDatas as setBatchDatasSystem } from "./batchSystem";
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
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export var create = ensureFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    it("componentMap should has data", () => {
        expect(getChildren(transform.uid, ThreeDTransformData)).exist;
    });
    it("count should <= ThreeDTransformData.maxCount", () => {
        expect(ThreeDTransformData.count).lte(ThreeDTransformData.maxCount);
    });
}, (ThreeDTransformData: any) => {
    var transform = new ThreeDTransform(),
        index = _generateIndexInArrayBuffer(ThreeDTransformData),
        uid = _buildUID(ThreeDTransformData);

    transform.index = index;
    transform.uid = uid;

    ThreeDTransformData.count += 1;

    _createTempData(uid, ThreeDTransformData);
    _setTransformMap(index, transform, ThreeDTransformData);
    setChildren(uid, [], ThreeDTransformData);

    _setDefaultTypeArrData(index, ThreeDTransformData);

    ThreeDTransformData.aliveUIDArray.push(uid);

    return transform;
})

var _buildUID = (ThreeDTransformData: any) => {
    return ThreeDTransformData.uid++;
}

var _generateIndexInArrayBuffer = (ThreeDTransformData: any) => {
    return generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
}

var _createTempData = (uid: number, ThreeDTransformData: any, ) => {
    ThreeDTransformData.tempMap[uid] = {
        position: Vector3.create(),
        localPosition: Vector3.create(),
        localToWorldMatrix: Matrix4.create()
    }

    return ThreeDTransformData;
}

export var checkShouldAlive = (component: ThreeDTransform, ThreeDTransformData: any) => {
    checkComponentShouldAlive(component, ThreeDTransformData, (component: ThreeDTransform, ThreeDTransformData: any) => {
        return isChildrenExist(getChildren(component.uid, ThreeDTransformData));
    })
}

export var init = (GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => {
    return update(null, GlobalTempData, ThreeDTransformData, state);
}

export var addComponent = (transform: ThreeDTransform, gameObject: GameObject) => {
    var index = transform.index,
        uid = transform.uid;

    addComponentToGameObjectMap(ThreeDTransformData.gameObjectMap, uid, gameObject);

    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
}

export var isAlive = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return isValidMapValue(ThreeDTransformData.transformMap[transform.index]);
}

export var isNotAlive = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return !isAlive(transform, ThreeDTransformData);
}

export var disposeComponent = (transform: ThreeDTransform) => {
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

export var getGameObject = (uid: number, ThreeDTransformData: any) => getComponentGameObject(ThreeDTransformData.gameObjectMap, uid);

export var getParent = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var parent = getThreeDTransformDataParent(transform.uid, ThreeDTransformData);

    if (isValidMapValue(parent)) {
        return parent;
    }

    return null;
}

export var setParent = (transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => setParentHierarchy(transform, parent, ThreeDTransformData);

export var getLocalToWorldMatrix = requireCheckFunc((transform: IThreeDTransform, mat: Matrix4, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform: IThreeDTransform, mat: Matrix4, ThreeTransformData: any) => {
    return isValidMapValue(getLocalToWorldMatrixCache(transform.uid, ThreeTransformData));
}, (transform: IThreeDTransform, mat: Matrix4, ThreeTransformData: any) => {
    return getLocalToWorldMatrixCache(transform.uid, ThreeTransformData);
}, (transform: IThreeDTransform, mat: Matrix4, ThreeTransformData: any, returnedMat: Matrix4) => {
    setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeTransformData);
}, (transform: IThreeDTransform, mat: Matrix4, ThreeTransformData: any) => {
    return createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
}))

export var getPosition = requireCheckFunc((transform: ThreeDTransform, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform: ThreeDTransform, ThreeTransformData: any) => {
    return isValidMapValue(getPositionCache(transform.uid, ThreeTransformData));
}, (transform: ThreeDTransform, ThreeTransformData: any) => {
    return getPositionCache(transform.uid, ThreeTransformData);
}, (transform: ThreeDTransform, ThreeTransformData: any, position: Vector3) => {
    setPositionCache(transform.uid, position, ThreeTransformData);
}, (transform: ThreeDTransform, ThreeTransformData: any) => {
    var index = getMatrix4DataIndexInArrayBuffer(transform.index),
        localToWorldMatrices = ThreeTransformData.localToWorldMatrices;

    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
}))

export var getNormalMatrix = requireCheckFunc((transform: ThreeDTransform, GlobalTempData: any, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform: ThreeDTransform, GlobalTempData: any, ThreeTransformData: any) => {
    return isValidMapValue(getNormalMatrixCache(transform.uid, ThreeTransformData));
}, (transform: ThreeDTransform, GlobalTempData: any, ThreeTransformData: any) => {
    return getNormalMatrixCache(transform.uid, ThreeTransformData);
}, (transform: ThreeDTransform, GlobalTempData: any, ThreeTransformData: any, mat: Matrix3) => {
    setNormalMatrixCache(transform.uid, mat, ThreeTransformData);
}, (transform: ThreeDTransform, GlobalTempData: any, ThreeTransformData: any) => {
    return getLocalToWorldMatrix(transform, GlobalTempData.matrix4_1, ThreeDTransformData).invertTo3x3().transpose();
}))

var _setTransformMap = (index: number, transform: ThreeDTransform, ThreeDTransformData: any) => ThreeDTransformData.transformMap[index] = transform;

export var setPosition = requireCheckFunc((transform: ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, (transform: ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    var index = transform.index,
        uid = transform.uid,
        parent = getThreeDTransformDataParent(uid, ThreeDTransformData),
        vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);

    setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);

    setIsTranslate(uid, true, ThreeTransformData);

    return addItAndItsChildrenToDirtyList(index, uid, ThreeTransformData);
})

export var setBatchDatas = (batchData: Array<BatchTransformData>, GlobalTempData: any, ThreeTransformData: any) => setBatchDatasSystem(batchData, GlobalTempData, ThreeDTransformData);

export var getLocalPosition = requireCheckFunc((transform: ThreeDTransform, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform: ThreeDTransform, ThreeTransformData: any) => {
    return isValidMapValue(getLocalPositionCache(transform.uid, ThreeTransformData));
}, (transform: ThreeDTransform, ThreeTransformData: any) => {
    return getLocalPositionCache(transform.uid, ThreeTransformData);
}, (transform: ThreeDTransform, ThreeTransformData: any, position: Vector3) => {
    setLocalPositionCache(transform.uid, position, ThreeTransformData);
}, (transform: ThreeDTransform, ThreeTransformData: any) => {
    return createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
}))

export var setLocalPosition = requireCheckFunc((transform: ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, (transform: ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    var index = transform.index,
        uid = transform.uid,
        vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);

    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);

    setIsTranslate(uid, true, ThreeTransformData);

    return addItAndItsChildrenToDirtyList(index, uid, ThreeTransformData);
})

export var update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => {
    return updateSystem(elapsed, GlobalTempData, ThreeDTransformData, state);
}

var _disposeItemInDataContainer = (index: number, uid: number, GlobalTempData: any, ThreeDTransformData: any) => {
    removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(index, uid, ThreeDTransformData);

    return ThreeDTransformData;
}

var _disposeMapDatas = (index: number, uid: number, ThreeDTransformData: any) => {
    deleteVal(index, ThreeDTransformData.transformMap);
}

var _disposeFromNormalList = (index: number, uid: number, GlobalTempData: any, ThreeDTransformData: any) => {
    addNotUsedIndex(index, ThreeDTransformData.notUsedIndexLinkList);

    return _disposeItemInDataContainer(index, uid, GlobalTempData, ThreeDTransformData);
}


var _disposeFromDirtyList = (index: number, uid: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;

    swap(index, firstDirtyIndex, ThreeDTransformData);


    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);

    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
}


var _setDefaultTypeArrData = (index: number, ThreeDTransformData: any) => {
    setTransformDataInTypeArr(index, ThreeDTransformData.defaultLocalToWorldMatrice, ThreeDTransformData.defaultRotation, ThreeDTransformData.defaultPosition, ThreeDTransformData.defaultScale, ThreeDTransformData);
}

export var getTempLocalToWorldMatrix = (transform: ThreeDTransform, ThreeDTransformData: any) => _getTempData(transform.uid, ThreeDTransformData).localToWorldMatrix;

var _getTempData = (uid: number, ThreeDTransformData: any) => {
    var tempData = ThreeDTransformData.tempMap[uid];

    if (isNotValidMapValue(tempData)) {
        tempData = {};
        ThreeDTransformData.tempMap[uid] = tempData;
    }

    return tempData;
}

export var initData = (GlobalTempData: any, ThreeDTransformData: any) => {
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

    ThreeDTransformData.aliveUIDArray = [];
}

var _initBufferData = (ThreeDTransformData: any) => {
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
