import { GPUDetector } from "../../device/GPUDetector";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { createMap, deleteBySwap as deleteObjectBySwap, isNotValidMapValue } from "../../utils/objectUtils";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwap, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { deleteBySwap } from "../../utils/arrayUtils";
import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { expect } from "wonder-expect.js";
import { GeometryData } from "./GeometryData";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var addInitHandle = function (_class) {
    addInitHandleToMap(_class, initGeometry);
};
export var create = requireCheckFunc(function (geometry, GeometryData) {
    checkIndexShouldEqualCount(GeometryData);
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
    return state;
};
export var initGeometry = function (index, state) {
    var computeDataFunc = GeometryData.computeDataFuncMap[index];
    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }
    var _a = computeDataFunc(index, GeometryData), vertices = _a.vertices, indices = _a.indices;
    setVertices(index, vertices, GeometryData);
    setIndices(index, indices, GeometryData);
};
var _isComputeDataFuncNotExist = function (func) { return isNotValidMapValue(func); };
export var getDrawMode = function (index, GeometryData) {
    return EDrawMode.TRIANGLES;
};
export var getVerticesCount = function (index, GeometryData) {
    return getVertices(index, GeometryData).length;
};
export var getIndicesCount = function (index, GeometryData) {
    return getIndices(index, GeometryData).length;
};
export var getIndexType = function (GeometryData) {
    return GeometryData.indexType;
};
export var getIndexTypeSize = function (GeometryData) {
    return GeometryData.indexTypeSize;
};
export var getVertices = function (index, GeometryData) {
    return GeometryData.verticesMap[index];
};
export var setVertices = requireCheckFunc(function (index, vertices, GeometryData) {
    it("vertices should not already exist", function () {
        expect(GeometryData.verticesMap[index]).not.exist;
    });
}, function (index, vertices, GeometryData) {
    GeometryData.verticesMap[index] = vertices;
});
export var getIndices = function (index, GeometryData) {
    return GeometryData.indicesMap[index];
};
export var setIndices = requireCheckFunc(function (index, indices, GeometryData) {
    it("indices should not already exist", function () {
        expect(GeometryData.indicesMap[index]).not.exist;
    });
}, function (index, indices, GeometryData) {
    GeometryData.indicesMap[index] = indices;
});
export var hasIndices = function (index, GeometryData) {
    var indices = getIndices(index, GeometryData);
    if (isNotValidMapValue(indices)) {
        return false;
    }
    return indices.length > 0;
};
export var addComponent = function (component, gameObject) {
    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = ensureFunc(function (returnVal, component) {
    checkIndexShouldEqualCount(GeometryData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    deleteBySwap(sourceIndex, GeometryData.verticesMap);
    deleteBySwap(sourceIndex, GeometryData.indicesMap);
    GeometryData.count -= 1;
    GeometryData.index -= 1;
    lastComponentIndex = GeometryData.count;
    deleteObjectBySwap(sourceIndex, lastComponentIndex, GeometryData.configDataMap);
    deleteObjectBySwap(sourceIndex, lastComponentIndex, GeometryData.computeDataFuncMap);
    deleteObjectBySwap(sourceIndex, lastComponentIndex, GeometryData.gameObjectMap);
    deleteComponentBySwap(sourceIndex, lastComponentIndex, GeometryData.geometryMap);
});
export var getGameObject = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
export var getConfigData = function (index, GeometryData) {
    return GeometryData.configDataMap[index];
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
    GeometryData.verticesMap = [];
    GeometryData.indicesMap = [];
    GeometryData.computeDataFuncMap = createMap();
    GeometryData.gameObjectMap = createMap();
    GeometryData.geometryMap = createMap();
    GeometryData.index = 0;
    GeometryData.count = 0;
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
export var convertVerticesArrayToTypeArray = function (vertices) {
    return new Float32Array(vertices);
};
export var convertIndicesArrayToTypeArray = function (indices, GeometryData) {
    return isIndicesBufferNeed32BitsByData(GeometryData) ? new Uint32Array(indices) : new Uint16Array(indices);
};
//# sourceMappingURL=GeometrySystem.js.map