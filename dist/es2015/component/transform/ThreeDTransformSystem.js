import { ThreeDTransformData } from "./ThreeDTransformData";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransform } from "./ThreeDTransform";
import { DataUtils } from "../../utils/DataUtils";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { cacheFunc } from "../../utils/cacheUtils";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, checkComponentShouldAlive, getComponentGameObject } from "../ComponentSystem";
import { createMap, deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { update as updateSystem } from "./updateSystem";
import { addFirstDirtyIndex, addItAndItsChildrenToDirtyList, addNotUsedIndex, generateNotUsedIndexInArrayBuffer, isNotDirty } from "./dirtySystem";
import { getChildren, getParent as getThreeDTransformDataParent, isChildrenExist, removeHierarchyData, setChildren, setParent as setParentHierarchy } from "./hierarchySystem";
import { getMatrix4DataIndexInArrayBuffer, getMatrix4DataSize, getQuaternionDataSize, getVector3DataIndexInArrayBuffer, getVector3DataSize, setLocalPositionData, setPositionData, setTransformDataInTypeArr, swap } from "./operateDataSystem";
import { setIsTranslate } from "./isTransformSystem";
import { getStartIndexInArrayBuffer } from "./utils";
import { checkTransformShouldAlive } from "./contractUtils";
import { setBatchDatas as setBatchDatasSystem } from "./batchSystem";
import { getLocalPositionCache, getLocalToWorldMatrixCache, getPositionCache, setLocalPositionCache, setLocalToWorldMatrixCache, setPositionCache } from "./cacheSystem";
import { isDisposeTooManyComponents, reAllocateThreeDTransformMap } from "../../utils/memoryUtils";
import { LinkList } from "./LinkList";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { expect } from "wonder-expect.js";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var create = ensureFunc(function (transform, ThreeDTransformData) {
    it("componentMap should has data", function () {
        expect(getChildren(transform.uid, ThreeDTransformData)).exist;
    });
}, function (ThreeDTransformData) {
    var transform = new ThreeDTransform(), index = _generateIndexInArrayBuffer(ThreeDTransformData), uid = _buildUID(ThreeDTransformData);
    transform.index = index;
    transform.uid = uid;
    _createTempData(uid, ThreeDTransformData);
    _setTransformMap(index, transform, ThreeDTransformData);
    setChildren(uid, [], ThreeDTransformData);
    ThreeDTransformData.aliveUIDArray.push(uid);
    return transform;
});
var _buildUID = function (ThreeDTransformData) {
    return ThreeDTransformData.uid++;
};
var _generateIndexInArrayBuffer = function (ThreeDTransformData) {
    return generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
};
var _createTempData = function (uid, ThreeDTransformData) {
    ThreeDTransformData.tempMap[uid] = {
        position: Vector3.create(),
        localPosition: Vector3.create(),
        localToWorldMatrix: Matrix4.create()
    };
    return ThreeDTransformData;
};
export var checkShouldAlive = function (component, ThreeDTransformData) {
    checkComponentShouldAlive(component, ThreeDTransformData, function (component, ThreeDTransformData) {
        return isChildrenExist(getChildren(component.uid, ThreeDTransformData));
    });
};
export var init = function (GlobalTempData, ThreeDTransformData, state) {
    return update(null, GlobalTempData, ThreeDTransformData, state);
};
export var addComponent = function (transform, gameObject) {
    var indexInArrayBuffer = transform.index, uid = transform.uid;
    addComponentToGameObjectMap(ThreeDTransformData.gameObjectMap, uid, gameObject);
    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
};
export var disposeComponent = function (transform) {
    var indexInArrayBuffer = transform.index, uid = transform.uid;
    if (isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
        _disposeFromNormalList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
    }
    else {
        _disposeFromDirtyList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
    }
    ThreeDTransformData.disposeCount += 1;
    if (isDisposeTooManyComponents(ThreeDTransformData.disposeCount)) {
        reAllocateThreeDTransformMap(ThreeDTransformData);
        ThreeDTransformData.disposeCount = 0;
    }
};
export var getGameObject = function (uid, ThreeDTransformData) { return getComponentGameObject(ThreeDTransformData.gameObjectMap, uid); };
export var getParent = function (transform, ThreeDTransformData) {
    var parent = getThreeDTransformDataParent(transform.uid, ThreeDTransformData);
    if (isValidMapValue(parent)) {
        return parent;
    }
    return null;
};
export var setParent = function (transform, parent, ThreeDTransformData) { return setParentHierarchy(transform, parent, ThreeDTransformData); };
export var getLocalToWorldMatrix = requireCheckFunc(function (transform, mat, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc(function (transform, mat, ThreeTransformData) {
    return isValidMapValue(getLocalToWorldMatrixCache(transform.uid, ThreeTransformData));
}, function (transform, mat, ThreeTransformData) {
    return getLocalToWorldMatrixCache(transform.uid, ThreeTransformData);
}, function (transform, mat, ThreeTransformData, returnedMat) {
    setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeTransformData);
}, function (transform, mat, ThreeTransformData) {
    return DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
}));
export var getPosition = requireCheckFunc(function (transform, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc(function (transform, ThreeTransformData) {
    return isValidMapValue(getPositionCache(transform.uid, ThreeTransformData));
}, function (transform, ThreeTransformData) {
    return getPositionCache(transform.uid, ThreeTransformData);
}, function (transform, ThreeTransformData, position) {
    setPositionCache(transform.uid, position, ThreeTransformData);
}, function (transform, ThreeTransformData) {
    var indexInArrayBuffer = getMatrix4DataIndexInArrayBuffer(transform.index), localToWorldMatrices = ThreeTransformData.localToWorldMatrices;
    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[indexInArrayBuffer + 12], localToWorldMatrices[indexInArrayBuffer + 13], localToWorldMatrices[indexInArrayBuffer + 14]);
}));
var _setTransformMap = function (indexInArrayBuffer, transform, ThreeDTransformData) { return ThreeDTransformData.transformMap[indexInArrayBuffer] = transform; };
export var setPosition = requireCheckFunc(function (transform, position, GlobalTempData, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, function (transform, position, GlobalTempData, ThreeTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, parent = getThreeDTransformDataParent(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);
    setIsTranslate(uid, true, ThreeTransformData);
    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
});
export var setBatchDatas = function (batchData, GlobalTempData, ThreeTransformData) { return setBatchDatasSystem(batchData, GlobalTempData, ThreeDTransformData); };
export var getLocalPosition = requireCheckFunc(function (transform, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc(function (transform, ThreeTransformData) {
    return isValidMapValue(getLocalPositionCache(transform.uid, ThreeTransformData));
}, function (transform, ThreeTransformData) {
    return getLocalPositionCache(transform.uid, ThreeTransformData);
}, function (transform, ThreeTransformData, position) {
    setLocalPositionCache(transform.uid, position, ThreeTransformData);
}, function (transform, ThreeTransformData) {
    return DataUtils.createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
}));
export var setLocalPosition = requireCheckFunc(function (transform, position, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, function (transform, position, ThreeTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);
    setIsTranslate(uid, true, ThreeTransformData);
    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
});
export var update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return updateSystem(elapsed, GlobalTempData, ThreeDTransformData, state);
};
var _disposeItemInDataContainer = function (indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData) {
    var mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
    setTransformDataInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(indexInArrayBuffer, uid, ThreeDTransformData);
    return ThreeDTransformData;
};
var _disposeMapDatas = function (indexInArrayBuffer, uid, ThreeDTransformData) {
    deleteVal(indexInArrayBuffer, ThreeDTransformData.transformMap);
};
var _disposeFromNormalList = function (indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData) {
    addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexLinkList);
    return _disposeItemInDataContainer(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
};
var _disposeFromDirtyList = function (indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData) {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData);
    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);
    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
};
var _addDefaultTransformData = function (GlobalTempData, ThreeDTransformData) {
    var count = ThreeDTransformData.count, mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
    for (var i = getStartIndexInArrayBuffer(); i < count; i++) {
        setTransformDataInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    }
};
export var getTempLocalToWorldMatrix = function (transform, ThreeDTransformData) { return _getTempData(transform.uid, ThreeDTransformData).localToWorldMatrix; };
var _getTempData = function (uid, ThreeDTransformData) {
    var tempData = ThreeDTransformData.tempMap[uid];
    if (isNotValidMapValue(tempData)) {
        tempData = {};
        ThreeDTransformData.tempMap[uid] = tempData;
    }
    return tempData;
};
export var initData = function (GlobalTempData, ThreeDTransformData) {
    var buffer = null, count = ThreeDTransformData.count, size = Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);
    ThreeDTransformData.buffer = new ArrayBuffer(count * size);
    buffer = ThreeDTransformData.buffer;
    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getMatrix4DataSize(), count * getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize()), count * getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize()), count * getVector3DataSize());
    ThreeDTransformData.notUsedIndexLinkList = LinkList.create();
    ThreeDTransformData.parentMap = createMap();
    ThreeDTransformData.childrenMap = createMap();
    ThreeDTransformData.isTranslateMap = createMap();
    ThreeDTransformData.cacheMap = createMap();
    ThreeDTransformData.tempMap = createMap();
    ThreeDTransformData.transformMap = createMap();
    ThreeDTransformData.gameObjectMap = createMap();
    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
    ThreeDTransformData.indexInArrayBuffer = getStartIndexInArrayBuffer();
    ThreeDTransformData.uid = 0;
    ThreeDTransformData.disposeCount = 0;
    ThreeDTransformData.isClearCacheMap = false;
    ThreeDTransformData.aliveUIDArray = [];
    _addDefaultTransformData(GlobalTempData, ThreeDTransformData);
};
//# sourceMappingURL=ThreeDTransformSystem.js.map