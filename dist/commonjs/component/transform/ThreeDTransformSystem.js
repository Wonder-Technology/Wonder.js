"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThreeDTransformData_1 = require("./ThreeDTransformData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ThreeDTransform_1 = require("./ThreeDTransform");
var Matrix4_1 = require("../../math/Matrix4");
var Vector3_1 = require("../../math/Vector3");
var cacheUtils_1 = require("../../utils/cacheUtils");
var ComponentSystem_1 = require("../ComponentSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var updateSystem_1 = require("./updateSystem");
var dirtySystem_1 = require("./dirtySystem");
var hierarchySystem_1 = require("./hierarchySystem");
var operateDataSystem_1 = require("./operateDataSystem");
var utils_1 = require("./utils");
var contractUtils_1 = require("./contractUtils");
var batchSystem_1 = require("./batchSystem");
var cacheSystem_1 = require("./cacheSystem");
var memoryUtils_1 = require("../../utils/memoryUtils");
var LinkList_1 = require("./LinkList");
var GlobalTempData_1 = require("../../definition/GlobalTempData");
var Quaternion_1 = require("../../math/Quaternion");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var wonder_expect_js_1 = require("wonder-expect.js");
var EventManagerSystem_1 = require("../../event/EventManagerSystem");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.create = contract_1.ensureFunc(function (transform, ThreeDTransformData) {
    contract_1.it("componentMap should has data", function () {
        wonder_expect_js_1.expect(hierarchySystem_1.getChildren(transform.uid, ThreeDTransformData)).exist;
    });
    contract_1.it("count should <= ThreeDTransformData.maxCount", function () {
        wonder_expect_js_1.expect(ThreeDTransformData.count).lte(ThreeDTransformData.maxCount);
    });
}, function (ThreeDTransformData) {
    var transform = new ThreeDTransform_1.ThreeDTransform(), index = _generateIndexInArrayBuffer(ThreeDTransformData), uid = _buildUId(ThreeDTransformData);
    transform.index = index;
    transform.uid = uid;
    ThreeDTransformData.count += 1;
    _createTempData(uid, ThreeDTransformData);
    _setTransformMap(index, transform, ThreeDTransformData);
    hierarchySystem_1.setChildren(uid, [], ThreeDTransformData);
    _setDefaultTypeArrData(index, ThreeDTransformData);
    ThreeDTransformData.aliveUIdArray.push(uid);
    return transform;
});
var _buildUId = function (ThreeDTransformData) {
    return ThreeDTransformData.uid++;
};
var _generateIndexInArrayBuffer = function (ThreeDTransformData) {
    return dirtySystem_1.generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
};
var _createTempData = function (uid, ThreeDTransformData) {
    ThreeDTransformData.tempMap[uid] = {
        position: Vector3_1.Vector3.create(),
        localPosition: Vector3_1.Vector3.create(),
        localToWorldMatrix: Matrix4_1.Matrix4.create()
    };
    return ThreeDTransformData;
};
exports.checkShouldAlive = function (component, ThreeDTransformData) {
    ComponentSystem_1.checkComponentShouldAlive(component, ThreeDTransformData, function (component, ThreeDTransformData) {
        return hierarchySystem_1.isChildrenExist(hierarchySystem_1.getChildren(component.uid, ThreeDTransformData));
    });
};
exports.init = function (GlobalTempData, ThreeDTransformData, state) {
    return exports.update(null, GlobalTempData, ThreeDTransformData, state);
};
exports.addComponent = function (transform, gameObject) {
    var index = transform.index, uid = transform.uid;
    ComponentSystem_1.addComponentToGameObjectMap(ThreeDTransformData_1.ThreeDTransformData.gameObjectMap, uid, gameObject);
    return dirtySystem_1.addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData_1.ThreeDTransformData);
};
exports.isAlive = function (transform, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(ThreeDTransformData.transformMap[transform.index]);
};
exports.isNotAlive = function (transform, ThreeDTransformData) {
    return !exports.isAlive(transform, ThreeDTransformData);
};
exports.disposeComponent = function (transform) {
    var index = transform.index, uid = transform.uid;
    if (dirtySystem_1.isNotDirty(index, ThreeDTransformData_1.ThreeDTransformData.firstDirtyIndex)) {
        _disposeFromNormalList(index, uid, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
    }
    else {
        _disposeFromDirtyList(index, uid, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
    }
    ThreeDTransformData_1.ThreeDTransformData.count -= 1;
    ThreeDTransformData_1.ThreeDTransformData.disposeCount += 1;
    if (memoryUtils_1.isDisposeTooManyComponents(ThreeDTransformData_1.ThreeDTransformData.disposeCount)) {
        memoryUtils_1.reAllocateThreeDTransform(ThreeDTransformData_1.ThreeDTransformData);
        ThreeDTransformData_1.ThreeDTransformData.disposeCount = 0;
    }
};
exports.getGameObject = function (uid, ThreeDTransformData) { return ComponentSystem_1.getComponentGameObject(ThreeDTransformData.gameObjectMap, uid); };
exports.getParent = function (transform, ThreeDTransformData) {
    var parent = hierarchySystem_1.getParent(transform.uid, ThreeDTransformData);
    if (objectUtils_1.isValidMapValue(parent)) {
        return parent;
    }
    return null;
};
exports.setParent = function (parent, child, ThreeDTransformData) { return hierarchySystem_1.setParent(parent, child, ThreeDTransformData); };
exports.getLocalToWorldMatrix = contract_1.requireCheckFunc(function (transform, mat, ThreeDTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheUtils_1.cacheFunc(function (transform, mat, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getLocalToWorldMatrixCache(transform.uid, ThreeDTransformData));
}, function (transform, mat, ThreeDTransformData) {
    return cacheSystem_1.getLocalToWorldMatrixCache(transform.uid, ThreeDTransformData);
}, function (transform, mat, ThreeDTransformData, returnedMat) {
    cacheSystem_1.setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeDTransformData);
}, function (transform, mat, ThreeDTransformData) {
    return typeArrayUtils_1.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, operateDataSystem_1.getMatrix4DataIndexInArrayBuffer(transform.index));
}));
exports.getPosition = contract_1.requireCheckFunc(function (transform, ThreeDTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheUtils_1.cacheFunc(function (transform, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getPositionCache(transform.uid, ThreeDTransformData));
}, function (transform, ThreeDTransformData) {
    return cacheSystem_1.getPositionCache(transform.uid, ThreeDTransformData);
}, function (transform, ThreeDTransformData, position) {
    cacheSystem_1.setPositionCache(transform.uid, position, ThreeDTransformData);
}, function (transform, ThreeDTransformData) {
    var index = operateDataSystem_1.getMatrix4DataIndexInArrayBuffer(transform.index), localToWorldMatrices = ThreeDTransformData.localToWorldMatrices;
    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
}));
exports.getNormalMatrix = contract_1.requireCheckFunc(function (transform, GlobalTempData, ThreeDTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheUtils_1.cacheFunc(function (transform, GlobalTempData, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getNormalMatrixCache(transform.uid, ThreeDTransformData));
}, function (transform, GlobalTempData, ThreeDTransformData) {
    return cacheSystem_1.getNormalMatrixCache(transform.uid, ThreeDTransformData);
}, function (transform, GlobalTempData, ThreeDTransformData, mat) {
    cacheSystem_1.setNormalMatrixCache(transform.uid, mat, ThreeDTransformData);
}, function (transform, GlobalTempData, ThreeDTransformData) {
    return exports.getLocalToWorldMatrix(transform, GlobalTempData.matrix4_1, ThreeDTransformData).invertTo3x3().transpose();
}));
var _setTransformMap = function (index, transform, ThreeDTransformData) { return ThreeDTransformData.transformMap[index] = transform; };
exports.setPosition = contract_1.requireCheckFunc(function (transform, position, GlobalTempData, ThreeDTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeDTransformData);
}, function (transform, position, GlobalTempData, ThreeDTransformData) {
    var index = transform.index, uid = transform.uid, parent = hierarchySystem_1.getParent(uid, ThreeDTransformData), vec3IndexInArrayBuffer = operateDataSystem_1.getVector3DataIndexInArrayBuffer(index);
    operateDataSystem_1.setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
    _triggerChangePositionEvent(uid, ThreeDTransformData);
    return dirtySystem_1.addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
});
exports.setBatchDatas = function (batchData, GlobalTempData, ThreeDTransformData) { return batchSystem_1.setBatchDatas(batchData, GlobalTempData, ThreeDTransformData); };
exports.getLocalPosition = contract_1.requireCheckFunc(function (transform, ThreeDTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeDTransformData);
}, cacheUtils_1.cacheFunc(function (transform, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getLocalPositionCache(transform.uid, ThreeDTransformData));
}, function (transform, ThreeDTransformData) {
    return cacheSystem_1.getLocalPositionCache(transform.uid, ThreeDTransformData);
}, function (transform, ThreeDTransformData, position) {
    cacheSystem_1.setLocalPositionCache(transform.uid, position, ThreeDTransformData);
}, function (transform, ThreeDTransformData) {
    return typeArrayUtils_1.createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, operateDataSystem_1.getVector3DataIndexInArrayBuffer(transform.index));
}));
exports.setLocalPosition = contract_1.requireCheckFunc(function (transform, position, ThreeDTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeDTransformData);
}, function (transform, position, ThreeDTransformData) {
    var index = transform.index, uid = transform.uid, vec3IndexInArrayBuffer = operateDataSystem_1.getVector3DataIndexInArrayBuffer(index);
    operateDataSystem_1.setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeDTransformData);
    _triggerChangePositionEvent(uid, ThreeDTransformData);
    return dirtySystem_1.addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
});
var _triggerChangePositionEvent = function (uid, ThreeDTransformData) {
    EventManagerSystem_1.triggerEvent("changePosition");
};
exports.update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return updateSystem_1.update(elapsed, GlobalTempData, ThreeDTransformData, state);
};
var _disposeItemInDataContainer = function (index, uid, GlobalTempData, ThreeDTransformData) {
    hierarchySystem_1.removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(index, uid, ThreeDTransformData);
    return ThreeDTransformData;
};
var _disposeMapDatas = function (index, uid, ThreeDTransformData) {
    objectUtils_1.deleteVal(index, ThreeDTransformData.transformMap);
};
var _disposeFromNormalList = function (index, uid, GlobalTempData, ThreeDTransformData) {
    dirtySystem_1.addNotUsedIndex(index, ThreeDTransformData.notUsedIndexLinkList);
    return _disposeItemInDataContainer(index, uid, GlobalTempData, ThreeDTransformData);
};
var _disposeFromDirtyList = function (index, uid, GlobalTempData, ThreeDTransformData) {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    operateDataSystem_1.swap(index, firstDirtyIndex, ThreeDTransformData);
    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);
    ThreeDTransformData.firstDirtyIndex = dirtySystem_1.addFirstDirtyIndex(ThreeDTransformData);
};
var _setDefaultTypeArrData = function (index, ThreeDTransformData) {
    operateDataSystem_1.setTransformDataInTypeArr(index, ThreeDTransformData.defaultLocalToWorldMatrice, ThreeDTransformData.defaultRotation, ThreeDTransformData.defaultPosition, ThreeDTransformData.defaultScale, ThreeDTransformData);
};
exports.getTempLocalToWorldMatrix = function (transform, ThreeDTransformData) { return _getTempData(transform.uid, ThreeDTransformData).localToWorldMatrix; };
var _getTempData = function (uid, ThreeDTransformData) {
    var tempData = ThreeDTransformData.tempMap[uid];
    if (objectUtils_1.isNotValidMapValue(tempData)) {
        tempData = {};
        ThreeDTransformData.tempMap[uid] = tempData;
    }
    return tempData;
};
exports.initData = function (GlobalTempData, ThreeDTransformData) {
    _initBufferData(ThreeDTransformData);
    ThreeDTransformData.defaultPosition = Vector3_1.Vector3.create(0, 0, 0);
    ThreeDTransformData.defaultRotation = Quaternion_1.Quaternion.create(0, 0, 0, 1);
    ThreeDTransformData.defaultScale = Vector3_1.Vector3.create(1, 1, 1);
    ThreeDTransformData.defaultLocalToWorldMatrice = Matrix4_1.Matrix4.create().setIdentity();
    ThreeDTransformData.notUsedIndexLinkList = LinkList_1.LinkList.create();
    ThreeDTransformData.parentMap = objectUtils_1.createMap();
    ThreeDTransformData.childrenMap = objectUtils_1.createMap();
    ThreeDTransformData.isTranslateMap = objectUtils_1.createMap();
    ThreeDTransformData.cacheMap = objectUtils_1.createMap();
    ThreeDTransformData.tempMap = objectUtils_1.createMap();
    ThreeDTransformData.transformMap = objectUtils_1.createMap();
    ThreeDTransformData.gameObjectMap = objectUtils_1.createMap();
    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.maxCount;
    ThreeDTransformData.index = utils_1.getStartIndexInArrayBuffer();
    ThreeDTransformData.uid = 0;
    ThreeDTransformData.disposeCount = 0;
    ThreeDTransformData.isClearCacheMap = false;
    ThreeDTransformData.count = 0;
    ThreeDTransformData.aliveUIdArray = [];
};
var _initBufferData = function (ThreeDTransformData) {
    var buffer = null, count = ThreeDTransformData.maxCount, size = Float32Array.BYTES_PER_ELEMENT * (typeArrayUtils_1.getMatrix4DataSize() + typeArrayUtils_1.getVector3DataSize() + typeArrayUtils_1.getQuaternionDataSize() + typeArrayUtils_1.getVector3DataSize());
    buffer = new ArrayBuffer(count * size);
    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * typeArrayUtils_1.getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * typeArrayUtils_1.getMatrix4DataSize(), count * typeArrayUtils_1.getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (typeArrayUtils_1.getMatrix4DataSize() + typeArrayUtils_1.getVector3DataSize()), count * typeArrayUtils_1.getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (typeArrayUtils_1.getMatrix4DataSize() + typeArrayUtils_1.getVector3DataSize() + typeArrayUtils_1.getQuaternionDataSize()), count * typeArrayUtils_1.getVector3DataSize());
    ThreeDTransformData.buffer = buffer;
};
//# sourceMappingURL=ThreeDTransformSystem.js.map