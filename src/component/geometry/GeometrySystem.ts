import { GPUDetector } from "../../device/GPUDetector";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Geometry } from "./Geometry";
import { Map } from "immutable";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { createMap, deleteBySwap as deleteObjectBySwap, isNotValidMapValue } from "../../utils/objectUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwap,
    generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import { deleteBySwap } from "../../utils/arrayUtils";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { expect } from "wonder-expect.js";
import { GeometryData } from "./GeometryData";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export var addInitHandle = (_class: any) => {
    addInitHandleToMap(_class, initGeometry);
}

export var create = requireCheckFunc((geometry: Geometry, GeometryData: any) => {
    checkIndexShouldEqualCount(GeometryData);
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

    return state;
}

export var initGeometry = (index: number, state: Map<any, any>) => {
    var computeDataFunc = GeometryData.computeDataFuncMap[index];

    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }

    let {
        vertices,
        indices
    } = computeDataFunc(index, GeometryData);

    setVertices(index, vertices, GeometryData);

    setIndices(index, indices, GeometryData);
}

var _isComputeDataFuncNotExist = (func: Function) => isNotValidMapValue(func);

export var getDrawMode = (index: number, GeometryData: any) => {
    return EDrawMode.TRIANGLES;
}

export var getVerticesCount = (index: number, GeometryData: any) => {
    return getVertices(index, GeometryData).length;
}

export var getIndicesCount = (index: number, GeometryData: any) => {
    return getIndices(index, GeometryData).length;
}

export var getIndexType = (GeometryData: any) => {
    // return GeometryData.indexType;
    //todo restore
    return "UNSIGNED_SHORT";
}

export var getIndexTypeSize = (GeometryData: any) => {
    // return GeometryData.indexTypeSize;
    //todo restore
    return Uint16Array.BYTES_PER_ELEMENT;
}


var vertices = new Float32Array([
                    -5, -5, 5, -5, 5, 5, 5, -5, 5, 5, 5, 5, 5, -5, -5, 5, 5, -5, -5, -5, -5, -5, 5, -5, -5, 5, 5, -5, 5, -5, 5, 5, 5, 5, 5, -5, 5, -5, 5, 5, -5, -5, -5, -5, 5, -5, -5, -5, 5, -5, 5, 5, 5, 5, 5, -5, -5, 5, 5, -5, -5, -5, -5, -5, 5, -5, -5, -5, 5, -5, 5, 5
                ]);

export var getVertices = (index: number, GeometryData: any) => {
    // return GeometryData.verticesMap[index];

    //todo pass vertices data to worker
    //todo cache geometry data in render worker(add render-gemetry Data?)
    return vertices;
}

export var setVertices = requireCheckFunc((index: number, vertices: Float32Array, GeometryData: any) => {
    it("vertices should not already exist", () => {
        expect(GeometryData.verticesMap[index]).not.exist;
    });
}, (index: number, vertices: Float32Array, GeometryData: any) => {
    GeometryData.verticesMap[index] = vertices;
})

var indices = new Uint16Array([
    0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21, 22, 23, 21
]);

export var getIndices = (index: number, GeometryData: any) => {
    // return GeometryData.indicesMap[index];
    //todo pass indices data to worker
    return indices;
}

export var setIndices = requireCheckFunc((index: number, indices: Uint16Array | Uint32Array, GeometryData: any) => {
    it("indices should not already exist", () => {
        expect(GeometryData.indicesMap[index]).not.exist;
    });
}, (index: number, indices: Uint16Array | Uint32Array, GeometryData: any) => {
    GeometryData.indicesMap[index] = indices;
})

export var hasIndices = (index: number, GeometryData: any) => {
    var indices = getIndices(index, GeometryData);

    if (isNotValidMapValue(indices)) {
        return false;
    }

    return indices.length > 0;
}

export var addComponent = (component: Geometry, gameObject: GameObject) => {
    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = ensureFunc((returnVal, component: Geometry) => {
    checkIndexShouldEqualCount(GeometryData);
}, (component: Geometry) => {
    var sourceIndex = component.index,
        lastComponentIndex: number = null;

    deleteBySwap(sourceIndex, GeometryData.verticesMap);

    deleteBySwap(sourceIndex, GeometryData.indicesMap);

    GeometryData.count -= 1;
    GeometryData.index -= 1;

    lastComponentIndex = GeometryData.count;

    deleteObjectBySwap(sourceIndex, lastComponentIndex, GeometryData.configDataMap);
    deleteObjectBySwap(sourceIndex, lastComponentIndex, GeometryData.computeDataFuncMap);
    deleteObjectBySwap(sourceIndex, lastComponentIndex, GeometryData.gameObjectMap);

    deleteComponentBySwap(sourceIndex, lastComponentIndex, GeometryData.geometryMap);
})

export var getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var getConfigData = (index: number, GeometryData: any) => {
    return GeometryData.configDataMap[index];
}

export var initData = (DataBufferConfig: any, GeometryData: any) => {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig),
        indicesArrayBytes = null;

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
}

var _checkIsIndicesBufferNeed32BitsByConfig = (DataBufferConfig: any) => {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }

    //todo refactor: use function
    return GPUDetector.getInstance().extensionUintIndices === true;
}

export var isIndicesBufferNeed32BitsByData = (GeometryData: any) => {
    return GeometryData.indexType === EBufferType.UNSIGNED_INT;
}

export var convertVerticesArrayToTypeArray = (vertices: Array<number>) => {
    return new Float32Array(vertices);
}

export var convertIndicesArrayToTypeArray = (indices: Array<number>, GeometryData: any) => {
    return isIndicesBufferNeed32BitsByData(GeometryData) ? new Uint32Array(indices) : new Uint16Array(indices)
}
