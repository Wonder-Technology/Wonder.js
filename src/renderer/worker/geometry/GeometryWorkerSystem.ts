import { createMap, isNotValidMapValue } from "../../../utils/objectUtils";
import { getIndexDataSize, getUIntArrayClass, getVertexDataSize } from "../../../utils/geometryUtils";
import { GeometryInfoList, GeometryWorkerInfoList } from "../../../definition/type/geometryType";
import { EBufferType } from "../../enum/EBufferType";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidVal } from "../../../utils/arrayUtils";
import { EDrawMode } from "../../enum/EDrawMode";
import { getSlice } from "../../../utils/typeArrayUtils";

export var hasNewPointData = (GeometryWorkerData:any) => {
    return GeometryWorkerData.verticesWorkerInfoList.length > 0;
}

export var getVertices = ensureFunc((vertices:Float32Array, index: number, GeometryWorkerData: any) => {
    it("vertices should exist", () => {
        expect(vertices).exist;
    })
}, (index: number, GeometryWorkerData: any) => {
    return GeometryWorkerData.verticesCacheMap[index];
})

export var getIndices = ensureFunc((indices:Uint16Array | Uint32Array, index: number, GeometryWorkerData: any) => {
    it("indices should exist", () => {
        expect(indices).exist;
    })
}, (index: number, GeometryWorkerData: any) => {
    return GeometryWorkerData.indicesCacheMap[index];
})

export var updatePointCacheDatas = (verticesInfoList:GeometryWorkerInfoList, indicesInfoList:GeometryWorkerInfoList, GeometryWorkerData:any) => {
    _updatePointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _updatePointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
}

var _updatePointCacheData = (infoList:GeometryWorkerInfoList, points:Float32Array | Uint16Array | Uint32Array, cacheMap:object) => {
    for(let info of infoList){
        let index = info.index,
            dataArr = getSlice(points, info.startIndex, info.endIndex);

        cacheMap[index] = dataArr;
    }
}

export var setPointCacheDatas = (verticesInfoList:GeometryInfoList, indicesInfoList:GeometryInfoList, GeometryWorkerData:any) => {
    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
}

var _setPointCacheData = requireCheckFunc((infoList:GeometryInfoList, points:Float32Array | Uint16Array | Uint32Array, cacheMap:object) => {
    it("infoList should has no invalid value", () => {
        for(let info of infoList){
            expect(isValidVal(info)).true;
        }
    });
}, (infoList:GeometryInfoList, points:Float32Array | Uint16Array | Uint32Array, cacheMap:object) => {
    for(let i = 0, len = infoList.length; i < len; i++){
        let info = infoList[i],
            dataArr = getSlice(points, info.startIndex, info.endIndex);

        cacheMap[i] = dataArr;
    }
})

export var getIndexType = (GeometryWorkerData: any) => {
    // return GeometryWorkerData.indexType;
    //todo restore
    return "UNSIGNED_SHORT";
}

export var getIndexTypeSize = (GeometryWorkerData: any) => {
    // return GeometryWorkerData.indexTypeSize;
    //todo restore
    return Uint16Array.BYTES_PER_ELEMENT;
}

export var hasIndices = (index: number, GeometryWorkerData: any) => {
    var indices = getIndices(index, GeometryWorkerData);

    if (isNotValidMapValue(indices)) {
        return false;
    }

    return indices.length > 0;
}

export var getDrawMode = (index: number, GeometryWorkerData: any) => {
    return EDrawMode.TRIANGLES;
}

export var getVerticesCount = (index: number, GeometryWorkerData: any) => {
    return getVertices(index, GeometryWorkerData).length;
}

export var getIndicesCount = (index: number, GeometryWorkerData: any) => {
    return getIndices(index, GeometryWorkerData).length;
}

export var initData = (buffer:SharedArrayBuffer, indexType:EBufferType, DataBufferConfig:any, GeometryWorkerData: any) => {
    GeometryWorkerData.verticesWorkerInfoList = [];
    GeometryWorkerData.indicesWorkerInfoList = [];

    GeometryWorkerData.isInit = false;

    GeometryWorkerData.verticesCacheMap = createMap();
    GeometryWorkerData.indicesCacheMap = createMap();

    _initBufferViewData(buffer, getUIntArrayClass(indexType), DataBufferConfig, GeometryWorkerData);

}

var _initBufferViewData = (buffer:any, UintArray:any, DataBufferConfig: any, GeometryWorkerData: any) => {
    var count = DataBufferConfig.geometryDataBufferCount;

    GeometryWorkerData.vertices = new Float32Array(buffer, 0, count * getVertexDataSize());
    GeometryWorkerData.indices = new UintArray(buffer, count * getVertexDataSize(), count * getIndexDataSize());
}
