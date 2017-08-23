"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("../../../../utils/objectUtils");
var geometryUtils_1 = require("../../../utils/worker/render_file/geometry/geometryUtils");
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../../../utils/arrayUtils");
var typeArrayUtils_1 = require("../../../../utils/typeArrayUtils");
exports.getVertices = contract_1.ensureFunc(function (vertices, index, GeometryWorkerData) {
    contract_1.it("vertices should exist", function () {
        wonder_expect_js_1.expect(vertices).exist;
    });
}, function (index, GeometryWorkerData) {
    return GeometryWorkerData.verticesCacheMap[index];
});
exports.getNormals = contract_1.ensureFunc(function (normals, index, GeometryWorkerData) {
    contract_1.it("normals should exist", function () {
        wonder_expect_js_1.expect(normals).exist;
    });
}, function (index, GeometryWorkerData) {
    return GeometryWorkerData.normalsCacheMap[index];
});
exports.getTexCoords = contract_1.ensureFunc(function (texCoords, index, GeometryWorkerData) {
    contract_1.it("texCoords should exist", function () {
        wonder_expect_js_1.expect(texCoords).exist;
    });
}, function (index, GeometryWorkerData) {
    return GeometryWorkerData.texCoordsCacheMap[index];
});
exports.getIndices = contract_1.ensureFunc(function (indices, index, GeometryWorkerData) {
    contract_1.it("indices should exist", function () {
        wonder_expect_js_1.expect(indices).exist;
    });
}, function (index, GeometryWorkerData) {
    return GeometryWorkerData.indicesCacheMap[index];
});
exports.updatePointCacheDatas = function (verticesInfoList, normalsInfoList, texCoordsInfoList, indicesInfoList, GeometryWorkerData) {
    _updatePointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _updatePointCacheData(normalsInfoList, GeometryWorkerData.normals, GeometryWorkerData.normalsCacheMap);
    _updatePointCacheData(texCoordsInfoList, GeometryWorkerData.texCoords, GeometryWorkerData.texCoordsCacheMap);
    _updatePointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
};
var _updatePointCacheData = function (infoList, points, cacheMap) {
    if (infoList === void 0) {
        return;
    }
    for (var _i = 0, infoList_1 = infoList; _i < infoList_1.length; _i++) {
        var info = infoList_1[_i];
        var index = info.index, dataArr = typeArrayUtils_1.getSlice(points, info.startIndex, info.endIndex);
        cacheMap[index] = dataArr;
    }
};
exports.resetPointCacheDatas = function (verticesInfoList, normalsInfoList, texCoordsInfoList, indicesInfoList, GeometryWorkerData) {
    GeometryWorkerData.verticesCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.normalsCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.texCoordsCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.indicesCacheMap = objectUtils_1.createMap();
    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(normalsInfoList, GeometryWorkerData.normals, GeometryWorkerData.normalsCacheMap);
    _setPointCacheData(texCoordsInfoList, GeometryWorkerData.texCoords, GeometryWorkerData.texCoordsCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
};
exports.setPointCacheDatas = function (verticesInfoList, normalsInfoList, texCoordsInfoList, indicesInfoList, GeometryWorkerData) {
    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(normalsInfoList, GeometryWorkerData.normals, GeometryWorkerData.normalsCacheMap);
    _setPointCacheData(texCoordsInfoList, GeometryWorkerData.texCoords, GeometryWorkerData.texCoordsCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
};
var _setPointCacheData = contract_1.requireCheckFunc(function (infoList, points, cacheMap) {
    contract_1.it("infoList should has no invalid value", function () {
        if (infoList === void 0) {
            return;
        }
        for (var _i = 0, infoList_2 = infoList; _i < infoList_2.length; _i++) {
            var info = infoList_2[_i];
            wonder_expect_js_1.expect(arrayUtils_1.isValidVal(info)).true;
        }
    });
}, function (infoList, points, cacheMap) {
    if (infoList === void 0) {
        return;
    }
    for (var i = 0, len = infoList.length; i < len; i++) {
        var info = infoList[i], dataArr = typeArrayUtils_1.getSlice(points, info.startIndex, info.endIndex);
        cacheMap[i] = dataArr;
    }
});
exports.getIndexType = geometryUtils_1.getIndexType;
exports.getIndexTypeSize = geometryUtils_1.getIndexTypeSize;
exports.hasIndices = function (index, GeometryWorkerData) { return geometryUtils_1.hasIndices(index, exports.getIndices, GeometryWorkerData); };
exports.getDrawMode = geometryUtils_1.getDrawMode;
exports.getVerticesCount = function (index, GeometryWorkerData) { return geometryUtils_1.getVerticesCount(index, exports.getVertices, GeometryWorkerData); };
exports.getIndicesCount = function (index, GeometryWorkerData) { return geometryUtils_1.getIndicesCount(index, exports.getIndices, GeometryWorkerData); };
exports.initData = function (buffer, indexType, indexTypeSize, DataBufferConfig, GeometryWorkerData) {
    GeometryWorkerData.verticesCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.normalsCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.texCoordsCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.indicesCacheMap = objectUtils_1.createMap();
    GeometryWorkerData.indexType = indexType;
    GeometryWorkerData.indexTypeSize = indexTypeSize;
    geometryUtils_1.createBufferViews(buffer, DataBufferConfig.geometryDataBufferCount, geometryUtils_1.getUIntArrayClass(indexType), GeometryWorkerData);
};
//# sourceMappingURL=GeometryWorkerSystem.js.map