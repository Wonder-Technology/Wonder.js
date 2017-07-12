import { createMap, isNotValidMapValue } from "../../../../utils/objectUtils";
import {
    getIndexDataSize,
    getUIntArrayClass,
    getVertexDataSize,
    getDrawMode as getDrawModeUtils,
    getIndexType as getIndexTypeUtils,
    getIndicesCount as getIndicesCountUtils,
    getVerticesCount as getVerticesCountUtils,
    hasIndices as hasIndicesUtils, getIndexTypeSize as getIndexTypeSizeUtils, createBufferViews
} from "../../../utils/geometry/geometryUtils";
import { GeometryInfoList, GeometryWorkerInfoList } from "../../../../definition/type/geometryType";
import { EBufferType } from "../../../enum/EBufferType";
import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidVal } from "../../../../utils/arrayUtils";
import { EDrawMode } from "../../../enum/EDrawMode";
import { getSlice } from "../../../../utils/typeArrayUtils";

export var getVertices = ensureFunc((vertices: Float32Array, index: number, GeometryWorkerData: any) => {
    it("vertices should exist", () => {
        expect(vertices).exist;
    })
}, (index: number, GeometryWorkerData: any) => {
    return GeometryWorkerData.verticesCacheMap[index];
})

export var getNormals = ensureFunc((normals: Float32Array, index: number, GeometryWorkerData: any) => {
    it("normals should exist", () => {
        expect(normals).exist;
    })
}, (index: number, GeometryWorkerData: any) => {
    return GeometryWorkerData.normalsCacheMap[index];
})

export var getIndices = ensureFunc((indices: Uint16Array | Uint32Array, index: number, GeometryWorkerData: any) => {
    it("indices should exist", () => {
        expect(indices).exist;
    })
}, (index: number, GeometryWorkerData: any) => {
    return GeometryWorkerData.indicesCacheMap[index];
})

export var updatePointCacheDatas = (verticesInfoList: GeometryWorkerInfoList, normalsInfoList: GeometryWorkerInfoList, indicesInfoList: GeometryWorkerInfoList, GeometryWorkerData: any) => {
    _updatePointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _updatePointCacheData(normalsInfoList, GeometryWorkerData.normals, GeometryWorkerData.normalsCacheMap);
    _updatePointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
}

var _updatePointCacheData = (infoList: GeometryWorkerInfoList|undefined, points: Float32Array | Uint16Array | Uint32Array, cacheMap: object) => {
    if(infoList === void 0){
        return;
    }

    for (let info of infoList) {
        let index = info.index,
            dataArr = getSlice(points, info.startIndex, info.endIndex);

        cacheMap[index] = dataArr;
    }
}

export var resetPointCacheDatas = (verticesInfoList: GeometryInfoList, normalsInfoList: GeometryWorkerInfoList, indicesInfoList: GeometryInfoList, GeometryWorkerData: any) => {
    GeometryWorkerData.verticesCacheMap = createMap();
    GeometryWorkerData.normalsCacheMap = createMap();
    GeometryWorkerData.indicesCacheMap = createMap();

    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(normalsInfoList, GeometryWorkerData.normals, GeometryWorkerData.normalsCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
}

export var setPointCacheDatas = (verticesInfoList: GeometryInfoList, normalsInfoList: GeometryInfoList, indicesInfoList: GeometryInfoList, GeometryWorkerData: any) => {
    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(normalsInfoList, GeometryWorkerData.normals, GeometryWorkerData.normalsCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
}

var _setPointCacheData = requireCheckFunc((infoList: GeometryInfoList|undefined, points: Float32Array | Uint16Array | Uint32Array, cacheMap: object) => {
    it("infoList should has no invalid value", () => {
        for (let info of infoList) {
            expect(isValidVal(info)).true;
        }
    });
}, (infoList: GeometryInfoList|undefined, points: Float32Array | Uint16Array | Uint32Array, cacheMap: object) => {
    if(infoList === void 0){
        return;
    }

    for (let i = 0, len = infoList.length; i < len; i++) {
        let info = infoList[i],
            dataArr = getSlice(points, info.startIndex, info.endIndex);

        cacheMap[i] = dataArr;
    }
})

export var getIndexType = getIndexTypeUtils;

export var getIndexTypeSize = getIndexTypeSizeUtils;

export var hasIndices = (index: number, GeometryWorkerData: any) => hasIndicesUtils(index, getIndices, GeometryWorkerData);

export var getDrawMode = getDrawModeUtils;

export var getVerticesCount = (index: number, GeometryWorkerData: any) => getVerticesCountUtils(index, getVertices, GeometryWorkerData);

export var getIndicesCount = (index: number, GeometryWorkerData: any) => getIndicesCountUtils(index, getIndices, GeometryWorkerData);

export var initData = (buffer: SharedArrayBuffer, indexType: EBufferType, indexTypeSize: number, DataBufferConfig: any, GeometryWorkerData: any) => {
    // GeometryWorkerData.verticesWorkerInfoList = [];
    // GeometryWorkerData.indicesWorkerInfoList = [];

    GeometryWorkerData.verticesCacheMap = createMap();
    GeometryWorkerData.normalsCacheMap = createMap();
    GeometryWorkerData.indicesCacheMap = createMap();

    GeometryWorkerData.indexType = indexType;
    GeometryWorkerData.indexTypeSize = indexTypeSize;

    createBufferViews(buffer, DataBufferConfig.geometryDataBufferCount, getUIntArrayClass(indexType), GeometryWorkerData);
}
