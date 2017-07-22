import { GPUDetector } from "../../renderer/device/GPUDetector";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { createMap, deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponent, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { GeometryData } from "./GeometryData";
import { getIndexDataSize, getUIntArrayClass, getVertexDataSize, getIndexTypeSize as getIndexTypeSizeUtils, getDrawMode as getDrawModeUtils, getIndexType as getIndexTypeUtils, getIndicesCount as getIndicesCountUtils, getVerticesCount as getVerticesCountUtils, hasIndices as hasIndicesUtils, createBufferViews, getNormalDataSize, getTexCoordsDataSize } from "../../renderer/utils/geometry/geometryUtils";
import { isDisposeTooManyComponents, reAllocateGeometry } from "../../utils/memoryUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { fillTypeArr, getSubarray } from "../../utils/typeArrayUtils";
import { isNotValidVal } from "../../utils/arrayUtils";
import { expect } from "wonder-expect.js";
import { ArrayBufferData } from "../../renderer/buffer/ArrayBufferData";
import { IndexBufferData } from "../../renderer/buffer/IndexBufferData";
import { disposeGeometryBuffers } from "../../renderer/worker/both_file/buffer/BufferSystem";
import { disposeBuffer as disposeArrayBuffer } from "../../renderer/buffer/ArrayBufferSystem";
import { disposeBuffer as disposeIndexBuffer } from "../../renderer/buffer/IndexBufferSystem";
export var addAddComponentHandle = function (BoxGeometry, CustomGeometry) {
    addAddComponentHandleToMap(BoxGeometry, addComponent);
    addAddComponentHandleToMap(CustomGeometry, addComponent);
};
export var addDisposeHandle = function (BoxGeometry, CustomGeometry) {
    addDisposeHandleToMap(BoxGeometry, disposeComponent);
    addDisposeHandleToMap(CustomGeometry, disposeComponent);
};
export var addInitHandle = function (BoxGeometry, CustomGeometry) {
    addInitHandleToMap(BoxGeometry, initGeometry);
    addInitHandleToMap(CustomGeometry, initGeometry);
};
export var create = requireCheckFunc(function (geometry, GeometryData) {
}, function (geometry, GeometryData) {
    var index = generateComponentIndex(GeometryData);
    geometry.index = index;
    GeometryData.count += 1;
    GeometryData.geometryMap[index] = geometry;
    return geometry;
});
export var init = function (GeometryData, state) {
    for (var i = 0, count = GeometryData.count; i < count; i++) {
        initGeometry(i, state);
    }
    _markIsInit(GeometryData);
    return state;
};
export var initGeometry = function (index, state) {
    var computeDataFunc = GeometryData.computeDataFuncMap[index];
    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }
    var _a = computeDataFunc(index, GeometryData), vertices = _a.vertices, normals = _a.normals, texCoords = _a.texCoords, indices = _a.indices;
    setVertices(index, vertices, GeometryData);
    setNormals(index, normals, GeometryData);
    setTexCoords(index, texCoords, GeometryData);
    setIndices(index, indices, GeometryData);
};
var _isComputeDataFuncNotExist = function (func) { return isNotValidMapValue(func); };
export var getVertices = function (index, GeometryData) {
    return _getPointData(index, GeometryData.vertices, GeometryData.verticesCacheMap, GeometryData.verticesInfoList);
};
export var setVertices = requireCheckFunc(function (index, vertices, GeometryData) {
}, function (index, vertices, GeometryData) {
    GeometryData.verticesOffset = _setPointData(index, vertices, getVertexDataSize(), GeometryData.vertices, GeometryData.verticesCacheMap, GeometryData.verticesInfoList, GeometryData.verticesWorkerInfoList, GeometryData.verticesOffset, GeometryData);
});
export var getNormals = function (index, GeometryData) {
    return _getPointData(index, GeometryData.normals, GeometryData.normalsCacheMap, GeometryData.normalsInfoList);
};
export var setNormals = requireCheckFunc(function (index, normals, GeometryData) {
}, function (index, normals, GeometryData) {
    GeometryData.normalsOffset = _setPointData(index, normals, getNormalDataSize(), GeometryData.normals, GeometryData.normalsCacheMap, GeometryData.normalsInfoList, GeometryData.normalsWorkerInfoList, GeometryData.normalsOffset, GeometryData);
});
export var getTexCoords = function (index, GeometryData) {
    return _getPointData(index, GeometryData.texCoords, GeometryData.texCoordsCacheMap, GeometryData.texCoordsInfoList);
};
export var setTexCoords = requireCheckFunc(function (index, texCoords, GeometryData) {
}, function (index, texCoords, GeometryData) {
    GeometryData.texCoordsOffset = _setPointData(index, texCoords, getTexCoordsDataSize(), GeometryData.texCoords, GeometryData.texCoordsCacheMap, GeometryData.texCoordsInfoList, GeometryData.texCoordsWorkerInfoList, GeometryData.texCoordsOffset, GeometryData);
});
export var getIndices = function (index, GeometryData) {
    return _getPointData(index, GeometryData.indices, GeometryData.indicesCacheMap, GeometryData.indicesInfoList);
};
export var setIndices = requireCheckFunc(function (index, indices, GeometryData) {
}, function (index, indices, GeometryData) {
    GeometryData.indicesOffset = _setPointData(index, indices, getIndexDataSize(), GeometryData.indices, GeometryData.indicesCacheMap, GeometryData.indicesInfoList, GeometryData.indicesWorkerInfoList, GeometryData.indicesOffset, GeometryData);
});
var _getPointData = requireCheckFunc(function (index, points, cacheMap, infoList) {
    it("infoList[index] should exist", function () {
        expect(infoList[index]).exist;
    });
}, function (index, points, cacheMap, infoList) {
    var dataArr = cacheMap[index];
    if (isValidMapValue(dataArr)) {
        return dataArr;
    }
    var info = infoList[index];
    dataArr = getSubarray(points, info.startIndex, info.endIndex);
    cacheMap[index] = dataArr;
    return dataArr;
});
var _setPointData = function (index, dataArr, dataSize, points, cacheMap, infoList, workerInfoList, offset, GeometryData) {
    var count = dataArr.length, startIndex = offset;
    offset += count;
    infoList[index] = _buildInfo(startIndex, offset);
    fillTypeArr(points, dataArr, startIndex, count);
    _removeCache(index, cacheMap);
    if (_isInit(GeometryData)) {
        _addWorkerInfo(workerInfoList, index, startIndex, offset);
    }
    return offset;
};
var _removeCache = function (index, cacheMap) {
    deleteVal(index, cacheMap);
};
var _buildInfo = function (startIndex, endIndex) {
    return {
        startIndex: startIndex,
        endIndex: endIndex
    };
};
export var addComponent = function (component, gameObject) {
    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = function (component) {
    var sourceIndex = component.index;
    deleteComponent(sourceIndex, GeometryData.geometryMap);
    GeometryData.count -= 1;
    GeometryData.disposeCount += 1;
    GeometryData.isReallocate = false;
    if (isDisposeTooManyComponents(GeometryData.disposeCount) || _isBufferNearlyFull(GeometryData)) {
        var disposedIndexArray = reAllocateGeometry(GeometryData);
        _disposeBuffers(disposedIndexArray);
        clearWorkerInfoList(GeometryData);
        GeometryData.isReallocate = true;
        GeometryData.disposeCount = 0;
    }
};
var _disposeBuffers = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeBuffers = requireCheckFunc(function (disposedIndexArray) {
        it("should not add data twice in one frame", function () {
            expect(GeometryData.disposedGeometryIndexArray.length).equal(0);
        });
    }, function (disposedIndexArray) {
        GeometryData.disposedGeometryIndexArray = disposedIndexArray;
    });
}
else {
    _disposeBuffers = function (disposedIndexArray) {
        disposeGeometryBuffers(disposedIndexArray, ArrayBufferData, IndexBufferData, disposeArrayBuffer, disposeIndexBuffer);
    };
}
export var isReallocate = function (GeometryData) {
    return GeometryData.isReallocate;
};
var _isBufferNearlyFull = function (GeometryData) {
    var infoList = GeometryData.indicesInfoList, lastInfo = infoList[infoList.length - 1];
    if (isNotValidVal(lastInfo)) {
        return false;
    }
    return lastInfo.endIndex >= GeometryData.maxDisposeIndex;
};
export var getGameObject = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
export var getConfigData = function (index, GeometryData) {
    return GeometryData.configDataMap[index];
};
var _checkIsIndicesBufferNeed32BitsByConfig = function (DataBufferConfig) {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }
    return GPUDetector.getInstance().extensionUintIndices === true;
};
export var isIndicesBufferNeed32BitsByData = function (GeometryData) {
    return GeometryData.indexType === EBufferType.UNSIGNED_INT;
};
var _markIsInit = function (GeometryData) {
    GeometryData.isInit = true;
};
var _isInit = function (GeometryData) {
    return GeometryData.isInit;
};
export var clearWorkerInfoList = function (GeometryData) {
    GeometryData.verticesWorkerInfoList = [];
    GeometryData.normalsWorkerInfoList = [];
    GeometryData.texCoordsWorkerInfoList = [];
    GeometryData.indicesWorkerInfoList = [];
};
export var hasNewPointData = function (GeometryData) {
    return GeometryData.verticesWorkerInfoList.length > 0;
};
export var hasDisposedGeometryIndexArrayData = function (GeometryData) {
    return GeometryData.disposedGeometryIndexArray.length > 0;
};
export var clearDisposedGeometryIndexArray = function (GeometryData) {
    GeometryData.disposedGeometryIndexArray = [];
};
var _addWorkerInfo = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _addWorkerInfo = function (infoList, index, startIndex, endIndex) {
        infoList.push(_buildWorkerInfo(index, startIndex, endIndex));
    };
}
else {
    _addWorkerInfo = function (infoList, index, startIndex, endIndex) {
    };
}
var _buildWorkerInfo = function (index, startIndex, endIndex) {
    return {
        index: index,
        startIndex: startIndex,
        endIndex: endIndex
    };
};
export var initData = function (DataBufferConfig, GeometryData) {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig), indicesArrayBytes = null;
    if (isIndicesBufferNeed32Bits) {
        indicesArrayBytes = Uint32Array.BYTES_PER_ELEMENT;
        GeometryData.indexType = EBufferType.UNSIGNED_INT;
    }
    else {
        indicesArrayBytes = Uint16Array.BYTES_PER_ELEMENT;
        GeometryData.indexType = EBufferType.UNSIGNED_SHORT;
    }
    GeometryData.indexTypeSize = indicesArrayBytes;
    GeometryData.configDataMap = createMap();
    GeometryData.verticesCacheMap = createMap();
    GeometryData.normalsCacheMap = createMap();
    GeometryData.texCoordsCacheMap = createMap();
    GeometryData.indicesCacheMap = createMap();
    GeometryData.computeDataFuncMap = createMap();
    GeometryData.gameObjectMap = createMap();
    GeometryData.geometryMap = createMap();
    GeometryData.index = 0;
    GeometryData.count = 0;
    _initBufferData(indicesArrayBytes, getUIntArrayClass(GeometryData.indexType), DataBufferConfig, GeometryData);
    GeometryData.verticesInfoList = [];
    GeometryData.normalsInfoList = [];
    GeometryData.texCoordsInfoList = [];
    GeometryData.indicesInfoList = [];
    GeometryData.verticesWorkerInfoList = [];
    GeometryData.normalsWorkerInfoList = [];
    GeometryData.texCoordsWorkerInfoList = [];
    GeometryData.indicesWorkerInfoList = [];
    GeometryData.disposedGeometryIndexArray = [];
    GeometryData.verticesOffset = 0;
    GeometryData.normalsOffset = 0;
    GeometryData.texCoordsOffset = 0;
    GeometryData.indicesOffset = 0;
    GeometryData.disposeCount = 0;
    GeometryData.isReallocate = false;
};
var _initBufferData = function (indicesArrayBytes, UintArray, DataBufferConfig, GeometryData) {
    var buffer = null, count = DataBufferConfig.geometryDataBufferCount, size = Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize() + getTexCoordsDataSize()) + indicesArrayBytes * getIndexDataSize();
    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
    createBufferViews(buffer, count, UintArray, GeometryData);
    GeometryData.buffer = buffer;
    GeometryData.maxDisposeIndex = GeometryData.indices.length * 0.9;
};
export var getIndexType = null;
export var getIndexTypeSize = null;
export var hasIndices = null;
export var getDrawMode = null;
export var getVerticesCount = null;
export var getIndicesCount = null;
if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    getIndexType = getIndexTypeUtils;
    getIndexTypeSize = getIndexTypeSizeUtils;
    hasIndices = function (index, GeometryData) { return hasIndicesUtils(index, getIndices, GeometryData); };
    getDrawMode = getDrawModeUtils;
    getVerticesCount = function (index, GeometryData) { return getVerticesCountUtils(index, getVertices, GeometryData); };
    getIndicesCount = function (index, GeometryData) { return getIndicesCountUtils(index, getIndices, GeometryData); };
}
//# sourceMappingURL=GeometrySystem.js.map