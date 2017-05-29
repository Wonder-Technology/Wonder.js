"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GPUDetector_1 = require("../../device/GPUDetector");
var contract_1 = require("../../definition/typescript/decorator/contract");
var EBufferType_1 = require("../../renderer/enum/EBufferType");
var objectUtils_1 = require("../../utils/objectUtils");
var ComponentSystem_1 = require("../ComponentSystem");
var arrayUtils_1 = require("../../utils/arrayUtils");
var EDrawMode_1 = require("../../renderer/enum/EDrawMode");
var contractUtils_1 = require("../utils/contractUtils");
var wonder_expect_js_1 = require("wonder-expect.js");
var GeometryData_1 = require("./GeometryData");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.addInitHandle = function (_class) {
    ComponentSystem_1.addInitHandle(_class, exports.initGeometry);
};
exports.create = contract_1.requireCheckFunc(function (geometry, GeometryData) {
    contractUtils_1.checkIndexShouldEqualCount(GeometryData);
}, function (geometry, GeometryData) {
    var index = ComponentSystem_1.generateComponentIndex(GeometryData);
    geometry.index = index;
    GeometryData.count += 1;
    GeometryData.geometryMap[index] = geometry;
    return geometry;
});
exports.init = function (GeometryData, state) {
    for (var i = 0, count = GeometryData.count; i < count; i++) {
        exports.initGeometry(i, state);
    }
    return state;
};
exports.initGeometry = function (index, state) {
    var computeDataFunc = GeometryData_1.GeometryData.computeDataFuncMap[index];
    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }
    var _a = computeDataFunc(index, GeometryData_1.GeometryData), vertices = _a.vertices, indices = _a.indices;
    exports.setVertices(index, vertices, GeometryData_1.GeometryData);
    exports.setIndices(index, indices, GeometryData_1.GeometryData);
};
var _isComputeDataFuncNotExist = function (func) { return objectUtils_1.isNotValidMapValue(func); };
exports.getDrawMode = function (index, GeometryData) {
    return EDrawMode_1.EDrawMode.TRIANGLES;
};
exports.getVerticesCount = function (index, GeometryData) {
    return exports.getVertices(index, GeometryData).length;
};
exports.getIndicesCount = function (index, GeometryData) {
    return exports.getIndices(index, GeometryData).length;
};
exports.getIndexType = function (GeometryData) {
    return GeometryData.indexType;
};
exports.getIndexTypeSize = function (GeometryData) {
    return GeometryData.indexTypeSize;
};
exports.getVertices = function (index, GeometryData) {
    return GeometryData.verticesMap[index];
};
exports.setVertices = contract_1.requireCheckFunc(function (index, vertices, GeometryData) {
    contract_1.it("vertices should not already exist", function () {
        wonder_expect_js_1.expect(GeometryData.verticesMap[index]).not.exist;
    });
}, function (index, vertices, GeometryData) {
    GeometryData.verticesMap[index] = vertices;
});
exports.getIndices = function (index, GeometryData) {
    return GeometryData.indicesMap[index];
};
exports.setIndices = contract_1.requireCheckFunc(function (index, indices, GeometryData) {
    contract_1.it("indices should not already exist", function () {
        wonder_expect_js_1.expect(GeometryData.indicesMap[index]).not.exist;
    });
}, function (index, indices, GeometryData) {
    GeometryData.indicesMap[index] = indices;
});
exports.hasIndices = function (index, GeometryData) {
    var indices = exports.getIndices(index, GeometryData);
    if (objectUtils_1.isNotValidMapValue(indices)) {
        return false;
    }
    return indices.length > 0;
};
exports.addComponent = function (component, gameObject) {
    ComponentSystem_1.addComponentToGameObjectMap(GeometryData_1.GeometryData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = contract_1.ensureFunc(function (returnVal, component) {
    contractUtils_1.checkIndexShouldEqualCount(GeometryData_1.GeometryData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    arrayUtils_1.deleteBySwap(sourceIndex, GeometryData_1.GeometryData.verticesMap);
    arrayUtils_1.deleteBySwap(sourceIndex, GeometryData_1.GeometryData.indicesMap);
    GeometryData_1.GeometryData.count -= 1;
    GeometryData_1.GeometryData.index -= 1;
    lastComponentIndex = GeometryData_1.GeometryData.count;
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, GeometryData_1.GeometryData.configDataMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, GeometryData_1.GeometryData.computeDataFuncMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, GeometryData_1.GeometryData.gameObjectMap);
    ComponentSystem_1.deleteComponentBySwap(sourceIndex, lastComponentIndex, GeometryData_1.GeometryData.geometryMap);
});
exports.getGameObject = function (index, Data) {
    return ComponentSystem_1.getComponentGameObject(Data.gameObjectMap, index);
};
exports.getConfigData = function (index, GeometryData) {
    return GeometryData.configDataMap[index];
};
exports.initData = function (DataBufferConfig, GeometryData) {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig), indicesArrayBytes = null;
    if (isIndicesBufferNeed32Bits) {
        indicesArrayBytes = Uint32Array.BYTES_PER_ELEMENT;
        GeometryData.indexType = EBufferType_1.EBufferType.UNSIGNED_INT;
    }
    else {
        indicesArrayBytes = Uint16Array.BYTES_PER_ELEMENT;
        GeometryData.indexType = EBufferType_1.EBufferType.UNSIGNED_SHORT;
    }
    GeometryData.indexTypeSize = indicesArrayBytes;
    GeometryData.configDataMap = objectUtils_1.createMap();
    GeometryData.verticesMap = [];
    GeometryData.indicesMap = [];
    GeometryData.computeDataFuncMap = objectUtils_1.createMap();
    GeometryData.gameObjectMap = objectUtils_1.createMap();
    GeometryData.geometryMap = objectUtils_1.createMap();
    GeometryData.index = 0;
    GeometryData.count = 0;
};
var _checkIsIndicesBufferNeed32BitsByConfig = function (DataBufferConfig) {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }
    return GPUDetector_1.GPUDetector.getInstance().extensionUintIndices === true;
};
exports.isIndicesBufferNeed32BitsByData = function (GeometryData) {
    return GeometryData.indexType === EBufferType_1.EBufferType.UNSIGNED_INT;
};
exports.convertVerticesArrayToTypeArray = function (vertices) {
    return new Float32Array(vertices);
};
exports.convertIndicesArrayToTypeArray = function (indices, GeometryData) {
    return exports.isIndicesBufferNeed32BitsByData(GeometryData) ? new Uint32Array(indices) : new Uint16Array(indices);
};
//# sourceMappingURL=GeometrySystem.js.map