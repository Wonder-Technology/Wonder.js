import { ThreeDTransformData } from "./ThreeDTransformData";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransform } from "./ThreeDTransform";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { cacheFunc } from "../../utils/cacheUtils";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, checkComponentShouldAlive, getComponentGameObject } from "../ComponentSystem";
import { createMap, deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { update as updateSystem } from "./updateSystem";
import { addFirstDirtyIndex, addItAndItsChildrenToDirtyList, addNotUsedIndex, generateNotUsedIndexInArrayBuffer, isNotDirty } from "./dirtySystem";
import { getChildren, getParent as getThreeDTransformDataParent, isChildrenExist, removeHierarchyData, setChildren, setParent as setParentHierarchy } from "./hierarchySystem";
import { getMatrix4DataIndexInArrayBuffer, getVector3DataIndexInArrayBuffer, setLocalPositionData, setPositionData, setTransformDataInTypeArr, swap } from "./operateDataSystem";
import { getStartIndexInArrayBuffer } from "./utils";
import { checkTransformShouldAlive } from "./contractUtils";
import { setBatchDatas as setBatchDatasSystem } from "./batchSystem";
import { getLocalPositionCache, getLocalToWorldMatrixCache, getNormalMatrixCache, getPositionCache, setLocalPositionCache, setLocalToWorldMatrixCache, setNormalMatrixCache, setPositionCache } from "./cacheSystem";
import { isDisposeTooManyComponents, reAllocateThreeDTransform } from "../../utils/memoryUtils";
import { LinkList } from "./LinkList";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { Quaternion } from "../../math/Quaternion";
import { createMatrix4ByIndex, createVector3ByIndex, getMatrix4DataSize, getQuaternionDataSize, getVector3DataSize } from "../../utils/typeArrayUtils";
import { expect } from "wonder-expect.js";
import { triggerEvent } from "../../event/EventManagerSystem";
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
    it("count should <= ThreeDTransformData.maxCount", function () {
        expect(ThreeDTransformData.count).lte(ThreeDTransformData.maxCount);
    });
}, function (ThreeDTransformData) {
    var transform = new ThreeDTransform(), index = _generateIndexInArrayBuffer(ThreeDTransformData), uid = _buildUId(ThreeDTransformData);
    transform.index = index;
    transform.uid = uid;
    ThreeDTransformData.count += 1;
    _createTempData(uid, ThreeDTransformData);
    _setTransformMap(index, transform, ThreeDTransformData);
    setChildren(uid, [], ThreeDTransformData);
    _setDefaultTypeArrData(index, ThreeDTransformData);
    ThreeDTransformData.aliveUIdArray.push(uid);
    return transform;
});
var _buildUId = function (ThreeDTransformData) {
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
    var index = transform.index, uid = transform.uid;
    addComponentToGameObjectMap(ThreeDTransformData.gameObjectMap, uid, gameObject);
    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
};
export var isAlive = function (transform, ThreeDTransformData) {
    return isValidMapValue(ThreeDTransformData.transformMap[transform.index]);
};
export var isNotAlive = function (transform, ThreeDTransformData) {
    return !isAlive(transform, ThreeDTransformData);
};
export var disposeComponent = function (transform) {
    var index = transform.index, uid = transform.uid;
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
};
export var getGameObject = function (uid, ThreeDTransformData) { return getComponentGameObject(ThreeDTransformData.gameObjectMap, uid); };
export var getParent = function (transform, ThreeDTransformData) {
    var parent = getThreeDTransformDataParent(transform.uid, ThreeDTransformData);
    if (isValidMapValue(parent)) {
        return parent;
    }
    return null;
};
export var setParent = function (parent, child, ThreeDTransformData) { return setParentHierarchy(parent, child, ThreeDTransformData); };
export var getLocalToWorldMatrix = requireCheckFunc(function (transform, mat, ThreeDTransformData) {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc(function (transform, mat, ThreeDTransformData) {
    return isValidMapValue(getLocalToWorldMatrixCache(transform.uid, ThreeDTransformData));
}, function (transform, mat, ThreeDTransformData) {
    return getLocalToWorldMatrixCache(transform.uid, ThreeDTransformData);
}, function (transform, mat, ThreeDTransformData, returnedMat) {
    setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeDTransformData);
}, function (transform, mat, ThreeDTransformData) {
    return createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
}));
export var getPosition = requireCheckFunc(function (transform, ThreeDTransformData) {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc(function (transform, ThreeDTransformData) {
    return isValidMapValue(getPositionCache(transform.uid, ThreeDTransformData));
}, function (transform, ThreeDTransformData) {
    return getPositionCache(transform.uid, ThreeDTransformData);
}, function (transform, ThreeDTransformData, position) {
    setPositionCache(transform.uid, position, ThreeDTransformData);
}, function (transform, ThreeDTransformData) {
    var index = getMatrix4DataIndexInArrayBuffer(transform.index), localToWorldMatrices = ThreeDTransformData.localToWorldMatrices;
    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
}));
export var getNormalMatrix = requireCheckFunc(function (transform, GlobalTempData, ThreeDTransformData) {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc(function (transform, GlobalTempData, ThreeDTransformData) {
    return isValidMapValue(getNormalMatrixCache(transform.uid, ThreeDTransformData));
}, function (transform, GlobalTempData, ThreeDTransformData) {
    return getNormalMatrixCache(transform.uid, ThreeDTransformData);
}, function (transform, GlobalTempData, ThreeDTransformData, mat) {
    setNormalMatrixCache(transform.uid, mat, ThreeDTransformData);
}, function (transform, GlobalTempData, ThreeDTransformData) {
    return getLocalToWorldMatrix(transform, GlobalTempData.matrix4_1, ThreeDTransformData).invertTo3x3().transpose();
}));
var _setTransformMap = function (index, transform, ThreeDTransformData) { return ThreeDTransformData.transformMap[index] = transform; };
export var setPosition = requireCheckFunc(function (transform, position, GlobalTempData, ThreeDTransformData) {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, function (transform, position, GlobalTempData, ThreeDTransformData) {
    var index = transform.index, uid = transform.uid, parent = getThreeDTransformDataParent(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);
    setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
    _triggerChangePositionEvent(uid, ThreeDTransformData);
    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
});
export var setBatchDatas = function (batchData, GlobalTempData, ThreeDTransformData) { return setBatchDatasSystem(batchData, GlobalTempData, ThreeDTransformData); };
export var getLocalPosition = requireCheckFunc(function (transform, ThreeDTransformData) {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheFunc(function (transform, ThreeDTransformData) {
    return isValidMapValue(getLocalPositionCache(transform.uid, ThreeDTransformData));
}, function (transform, ThreeDTransformData) {
    return getLocalPositionCache(transform.uid, ThreeDTransformData);
}, function (transform, ThreeDTransformData, position) {
    setLocalPositionCache(transform.uid, position, ThreeDTransformData);
}, function (transform, ThreeDTransformData) {
    return createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
}));
export var setLocalPosition = requireCheckFunc(function (transform, position, ThreeDTransformData) {
    checkTransformShouldAlive(transform, ThreeDTransformData);
}, function (transform, position, ThreeDTransformData) {
    var index = transform.index, uid = transform.uid, vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);
    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeDTransformData);
    _triggerChangePositionEvent(uid, ThreeDTransformData);
    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
});
var _triggerChangePositionEvent = function (uid, ThreeDTransformData) {
    triggerEvent("changePosition");
};
export var update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return updateSystem(elapsed, GlobalTempData, ThreeDTransformData, state);
};
var _disposeItemInDataContainer = function (index, uid, GlobalTempData, ThreeDTransformData) {
    removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(index, uid, ThreeDTransformData);
    return ThreeDTransformData;
};
var _disposeMapDatas = function (index, uid, ThreeDTransformData) {
    deleteVal(index, ThreeDTransformData.transformMap);
};
var _disposeFromNormalList = function (index, uid, GlobalTempData, ThreeDTransformData) {
    addNotUsedIndex(index, ThreeDTransformData.notUsedIndexLinkList);
    return _disposeItemInDataContainer(index, uid, GlobalTempData, ThreeDTransformData);
};
var _disposeFromDirtyList = function (index, uid, GlobalTempData, ThreeDTransformData) {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    swap(index, firstDirtyIndex, ThreeDTransformData);
    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);
    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
};
var _setDefaultTypeArrData = function (index, ThreeDTransformData) {
    setTransformDataInTypeArr(index, ThreeDTransformData.defaultLocalToWorldMatrice, ThreeDTransformData.defaultRotation, ThreeDTransformData.defaultPosition, ThreeDTransformData.defaultScale, ThreeDTransformData);
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
};
var _initBufferData = function (ThreeDTransformData) {
    var buffer = null, count = ThreeDTransformData.maxCount, size = Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize() + getVector3DataSize());
    buffer = new ArrayBuffer(count * size);
    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getMatrix4DataSize(), count * getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize()), count * getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize()), count * getVector3DataSize());
    ThreeDTransformData.buffer = buffer;
};
//# sourceMappingURL=ThreeDTransformSystem.js.map