import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Geometry } from "./Geometry";
import { Map } from "immutable";
import { EBufferType } from "../../renderer/enum/EBufferType";
import {
    createMap, deleteVal, isNotValidMapValue,
    isValidMapValue
} from "../../utils/objectUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponent,
    generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { GeometryData } from "./GeometryData";
import {
    getIndexDataSize,
    getUIntArrayClass,
    getVertexDataSize,
    getIndexTypeSize as getIndexTypeSizeUtils,
    getDrawMode as getDrawModeUtils,
    getIndexType as getIndexTypeUtils,
    getIndicesCount as getIndicesCountUtils,
    getVerticesCount as getVerticesCountUtils,
    hasIndices as hasIndicesUtils, createBufferViews, getNormalDataSize, getTexCoordsDataSize
} from "../../renderer/utils/geometry/geometryUtils";
import { GeometryInfoList, GeometryWorkerInfoList } from "../../definition/type/geometryType";
import { isDisposeTooManyComponents, reAllocateGeometry } from "../../utils/memoryUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import {

} from "../../renderer/utils/geometry/geometryUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { fillTypeArr, getSubarray } from "../../utils/typeArrayUtils";
import { isNotValidVal } from "../../utils/arrayUtils";
import { expect } from "wonder-expect.js";
import { ArrayBufferData } from "../../renderer/buffer/ArrayBufferData";
import { IndexBufferData } from "../../renderer/buffer/IndexBufferData";
import { disposeGeometryBuffers } from "../../renderer/worker/both_file/buffer/BufferSystem";
import { disposeBuffer as disposeArrayBuffer } from "../../renderer/buffer/ArrayBufferSystem";
import { disposeBuffer as disposeIndexBuffer } from "../../renderer/buffer/IndexBufferSystem";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
import { hasExtensionUintIndices } from "../../renderer/utils/device/gpuDetectUtils";

export var addAddComponentHandle = (BoxGeometry: any, CustomGeometry: any) => {
    addAddComponentHandleToMap(BoxGeometry, addComponent);
    addAddComponentHandleToMap(CustomGeometry, addComponent);
}

export var addDisposeHandle = (BoxGeometry: any, CustomGeometry: any) => {
    addDisposeHandleToMap(BoxGeometry, disposeComponent);
    addDisposeHandleToMap(CustomGeometry, disposeComponent);
}

export var addInitHandle = (BoxGeometry: any, CustomGeometry: any) => {
    addInitHandleToMap(BoxGeometry, initGeometry);
    addInitHandleToMap(CustomGeometry, initGeometry);
}

export var create = requireCheckFunc((geometry: Geometry, GeometryData: any) => {
    // checkIndexShouldEqualCount(GeometryData);
}, (geometry: Geometry, GeometryData: any) => {
    var index = generateComponentIndex(GeometryData);

    geometry.index = index;

    GeometryData.count += 1;

    GeometryData.geometryMap[index] = geometry;

    return geometry;
})

export var init = (GeometryData: any, state: Map<any, any>) => {
    for (let i = 0, count = GeometryData.count; i < count; i++) {
        initGeometry(i, state);
    }

    _markIsInit(GeometryData);

    return state;
}

export var initGeometry = (index: number, state: Map<any, any>) => {
    var computeDataFunc = GeometryData.computeDataFuncMap[index];

    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }

    let {
        vertices,
        normals,
        texCoords,
        indices
    } = computeDataFunc(index, GeometryData);

    //todo compute normals

    setVertices(index, vertices, GeometryData);

    setNormals(index, normals, GeometryData);

    setTexCoords(index, texCoords, GeometryData);

    setIndices(index, indices, GeometryData);
}

var _isComputeDataFuncNotExist = (func: Function) => isNotValidMapValue(func);

export var getVertices = (index: number, GeometryData: any) => {
    return _getPointData(index, GeometryData.vertices, GeometryData.verticesCacheMap, GeometryData.verticesInfoList);
}

export var setVertices = requireCheckFunc((index: number, vertices: Array<number>, GeometryData: any) => {
    // it("vertices should not already exist", () => {
    //     expect(GeometryData.verticesCacheMap[index]).not.exist;
    // });
}, (index: number, vertices: Array<number>, GeometryData: any) => {
    GeometryData.verticesOffset = _setPointData(index, vertices, getVertexDataSize(), GeometryData.vertices, GeometryData.verticesCacheMap, GeometryData.verticesInfoList, GeometryData.verticesWorkerInfoList, GeometryData.verticesOffset, GeometryData);
})

export var getNormals = (index: number, GeometryData: any) => {
    return _getPointData(index, GeometryData.normals, GeometryData.normalsCacheMap, GeometryData.normalsInfoList);
}

export var setNormals = requireCheckFunc((index: number, normals: Array<number>, GeometryData: any) => {
}, (index: number, normals: Array<number>, GeometryData: any) => {
    GeometryData.normalsOffset = _setPointData(index, normals, getNormalDataSize(), GeometryData.normals, GeometryData.normalsCacheMap, GeometryData.normalsInfoList, GeometryData.normalsWorkerInfoList, GeometryData.normalsOffset, GeometryData);
})

export var getTexCoords = (index: number, GeometryData: any) => {
    return _getPointData(index, GeometryData.texCoords, GeometryData.texCoordsCacheMap, GeometryData.texCoordsInfoList);
}

export var setTexCoords = requireCheckFunc((index: number, texCoords: Array<number>, GeometryData: any) => {
}, (index: number, texCoords: Array<number>, GeometryData: any) => {
    GeometryData.texCoordsOffset = _setPointData(index, texCoords, getTexCoordsDataSize(), GeometryData.texCoords, GeometryData.texCoordsCacheMap, GeometryData.texCoordsInfoList, GeometryData.texCoordsWorkerInfoList, GeometryData.texCoordsOffset, GeometryData);
})

export var getIndices = (index: number, GeometryData: any) => {
    return _getPointData(index, GeometryData.indices, GeometryData.indicesCacheMap, GeometryData.indicesInfoList);
}

export var setIndices = requireCheckFunc((index: number, indices: Array<number>, GeometryData: any) => {
    // it("indices should not already exist", () => {
    //     expect(GeometryData.indicesCacheMap[index]).not.exist;
    // });
}, (index: number, indices: Array<number>, GeometryData: any) => {
    GeometryData.indicesOffset = _setPointData(index, indices, getIndexDataSize(), GeometryData.indices, GeometryData.indicesCacheMap, GeometryData.indicesInfoList, GeometryData.indicesWorkerInfoList, GeometryData.indicesOffset, GeometryData);
})

var _getPointData = requireCheckFunc((index: number, points: Float32Array | Uint16Array | Uint32Array, cacheMap: object, infoList: object) => {
    it("infoList[index] should exist", () => {
        expect(infoList[index]).exist;
    });
}, (index: number, points: Float32Array | Uint16Array | Uint32Array, cacheMap: object, infoList: object) => {
    var dataArr = cacheMap[index];

    if (isValidMapValue(dataArr)) {
        return dataArr;
    }

    let info = infoList[index];

    dataArr = getSubarray(points, info.startIndex, info.endIndex);

    cacheMap[index] = dataArr;

    return dataArr;
})

var _setPointData = (index: number, dataArr: Array<number>, dataSize: number, points: Float32Array | Uint16Array | Uint32Array, cacheMap: object, infoList: GeometryInfoList, workerInfoList: GeometryWorkerInfoList, offset: number, GeometryData: any) => {
    var count = dataArr.length,
        startIndex = offset;

    offset += count;

    infoList[index] = _buildInfo(startIndex, offset);

    fillTypeArr(points, dataArr, startIndex, count);

    _removeCache(index, cacheMap);

    if (_isInit(GeometryData)) {
        _addWorkerInfo(workerInfoList, index, startIndex, offset);
    }

    return offset;
}

var _removeCache = (index: number, cacheMap: object) => {
    deleteVal(index, cacheMap);
}

var _buildInfo = (startIndex: number, endIndex: number) => {
    return {
        startIndex: startIndex,
        endIndex: endIndex
    }
}

export var addComponent = (component: Geometry, gameObject: GameObject) => {
    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = (component: Geometry) => {
    var sourceIndex = component.index;

    deleteComponent(sourceIndex, GeometryData.geometryMap);

    GeometryData.count -= 1;
    GeometryData.disposeCount += 1;
    GeometryData.isReallocate = false;

    if (isDisposeTooManyComponents(GeometryData.disposeCount) || _isBufferNearlyFull(GeometryData)) {
        let disposedIndexArray = reAllocateGeometry(GeometryData);

        _disposeBuffers(disposedIndexArray);

        clearWorkerInfoList(GeometryData);
        GeometryData.isReallocate = true;

        GeometryData.disposeCount = 0;
    }
}

var _disposeBuffers = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeBuffers = requireCheckFunc((disposedIndexArray: Array<number>) => {
        it("should not add data twice in one frame", () => {
            expect(GeometryData.disposedGeometryIndexArray.length).equal(0);
        });
    }, (disposedIndexArray: Array<number>) => {
        GeometryData.disposedGeometryIndexArray = disposedIndexArray;
    })
}
else {
    _disposeBuffers = (disposedIndexArray: Array<number>) => {
        disposeGeometryBuffers(disposedIndexArray, ArrayBufferData, IndexBufferData, disposeArrayBuffer, disposeIndexBuffer);
    }
}

export var isReallocate = (GeometryData: any) => {
    return GeometryData.isReallocate;
}

var _isBufferNearlyFull = (GeometryData: any) => {
    var infoList = GeometryData.indicesInfoList,
        lastInfo = infoList[infoList.length - 1];

    if (isNotValidVal(lastInfo)) {
        return false;
    }

    return lastInfo.endIndex >= GeometryData.maxDisposeIndex;
}

export var getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var getConfigData = (index: number, GeometryData: any) => {
    return GeometryData.configDataMap[index];
}

// var _createVerticesTypeArray = () => {
//     var count = DataBufferConfig.geometryDataBufferCount,
//         size = Float32Array.BYTES_PER_ELEMENT * 3 + indicesArrayBytes * 1;
//
//     GeometryData.vertices = new Float32Array(buffer, 0, count * getVertexDataSize());
// }

var _checkIsIndicesBufferNeed32BitsByConfig = (DataBufferConfig: any, GPUDetectData:any) => {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }

    return hasExtensionUintIndices(GPUDetectData) === true;
}

export var isIndicesBufferNeed32BitsByData = (GeometryData: any) => {
    return GeometryData.indexType === EBufferType.UNSIGNED_INT;
}


var _markIsInit = (GeometryData: any) => {
    GeometryData.isInit = true;
}

var _isInit = (GeometryData: any) => {
    return GeometryData.isInit;
}

export var clearWorkerInfoList = (GeometryData: any) => {
    GeometryData.verticesWorkerInfoList = [];
    GeometryData.normalsWorkerInfoList = [];
    GeometryData.texCoordsWorkerInfoList = [];
    GeometryData.indicesWorkerInfoList = [];
};

export var hasNewPointData = (GeometryData: any) => {
    return GeometryData.verticesWorkerInfoList.length > 0;
}

export var hasDisposedGeometryIndexArrayData = (GeometryData: any) => {
    return GeometryData.disposedGeometryIndexArray.length > 0;
}

export var clearDisposedGeometryIndexArray = (GeometryData: any) => {
    GeometryData.disposedGeometryIndexArray = [];
}

var _addWorkerInfo = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _addWorkerInfo = (infoList: GeometryWorkerInfoList, index: number, startIndex: number, endIndex: number) => {
        infoList.push(_buildWorkerInfo(index, startIndex, endIndex));
    }
}
else {
    _addWorkerInfo = (infoList: GeometryWorkerInfoList, index: number, startIndex: number, endIndex: number) => {
    };
}

var _buildWorkerInfo = (index: number, startIndex: number, endIndex: number) => {
    return {
        index: index,
        startIndex: startIndex,
        endIndex: endIndex
    }
}

export var initData = (DataBufferConfig: any, GeometryData: any, GPUDetectData:any) => {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig, GPUDetectData),
        indicesArrayBytes: number = null;

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
}

var _initBufferData = (indicesArrayBytes: number, UintArray: any, DataBufferConfig: any, GeometryData: any) => {
    var buffer: any = null,
        count = DataBufferConfig.geometryDataBufferCount,
        size = Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize() + getTexCoordsDataSize()) + indicesArrayBytes * getIndexDataSize();

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    createBufferViews(buffer, count, UintArray, GeometryData);

    GeometryData.buffer = buffer;

    GeometryData.maxDisposeIndex = GeometryData.indices.length * 0.9;
}

export var getIndexType = null;

export var getIndexTypeSize = null;

export var hasIndices = null;

export var getDrawMode = null;

export var getVerticesCount = null;

export var getIndicesCount = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    getIndexType = getIndexTypeUtils;

    getIndexTypeSize = getIndexTypeSizeUtils;

    hasIndices = (index: number, GeometryData: any) => hasIndicesUtils(index, getIndices, GeometryData);

    getDrawMode = getDrawModeUtils;

    getVerticesCount = (index: number, GeometryData: any) => getVerticesCountUtils(index, getVertices, GeometryData);

    getIndicesCount = (index: number, GeometryData: any) => getIndicesCountUtils(index, getIndices, GeometryData);
}
