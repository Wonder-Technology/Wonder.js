import { GPUDetector } from "../../device/GPUDetector";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Geometry } from "./Geometry";
import { Map } from "immutable";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { deleteVal, isNotValidMapValue } from "../../utils/objectUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap
} from "../ComponentSystem";
import { deleteBySwap } from "../../utils/arrayUtils";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export var addAddComponentHandle = (_class: any, GeometryData:any) => {
    addAddComponentHandleToMap(_class, addComponent(GeometryData));
}

export var addDisposeHandle = (_class: any, GeometryData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(GeometryData));
}

//todo refactor: extract with MeshRenderer
export var create = requireCheckFunc((geometry:Geometry, GeometryData: any) => {
    it("GeometryData.index should === GeometryData.count", () => {
        expect(GeometryData.index).equal(GeometryData.count);
    });
    it("GeometryData.index should >= 0", () => {
        expect(GeometryData.index).gte(0);
    });
    it("GeometryData.count should >= 0", () => {
        expect(GeometryData.count).gte(0);
    });
}, (geometry:Geometry, GeometryData: any) => {
    var index = _generateIndex(GeometryData);

    geometry.index = index;

    GeometryData.count += 1;

    return geometry;
})

//todo refactor: extract with MeshRenderer
var _generateIndex = (BoxGeometryData: any) => {
    return BoxGeometryData.index++;
}

export var init = (GeometryData: any, state:Map<any, any>) => {
        var computeDataFuncMap = GeometryData.computeDataFuncMap,
            verticesMap = GeometryData.verticesMap,
            indicesMap = GeometryData.indicesMap,
            isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByData(GeometryData);

    for (let i = 0, count = GeometryData.count; i < count; i++) {
        let computeDataFunc = computeDataFuncMap[i],
            {
            vertices,
            indices
        } = computeDataFunc(i, GeometryData);

        verticesMap[i] = new Float32Array(vertices);

        if(isIndicesBufferNeed32Bits){
            indicesMap[i] = new Uint32Array(indices);
        }
        else{
            indicesMap[i] = new Uint16Array(indices);
        }
    }

    return state;
}

export var getDrawMode = (index:number, GeometryData:any) => {
    return GeometryData.drawModeMap[index];
}

export var setDrawMode = () => {

}

export var getVerticesCount = (index:number, GeometryData:any) => {
    // return GeometryData.verticesCountMap[index];

    return getVertices(index, GeometryData).length;
}

export var getIndicesCount = (index:number, GeometryData:any) => {
    // return GeometryData.indicesCountMap[index];
    return getIndices(index, GeometryData).length;
}

export var getIndexType = (GeometryData:any) => {
    return GeometryData.indexType;
}

export var getIndexTypeSize = (GeometryData:any) => {
    return GeometryData.indexTypeSize;
}

export var getVertices = (index:number, GeometryData:any) => {
    // return GeometryData.vertices.subarray(GeometryData.verticesIndexMap[index], GeometryData.verticesCountMap[index]);
    return GeometryData.verticesMap[index];
}

export var getIndices = (index:number, GeometryData:any) => {
    // return GeometryData.indices.subarray(GeometryData.indicesIndexMap[index], GeometryData.indicesCountMap[index]);
    return GeometryData.indicesMap[index];
}

export var hasIndices = (index:number, GeometryData:any) => {
    var indices = getIndices(index, GeometryData);

    if(isNotValidMapValue(indices)){
        return false;
    }

    return indices.length > 0;
}

export var addComponent = curry((GeometryData:any, geometryComponent:Geometry, gameObject:GameObject) => {
    GeometryData.gameObjectMap[geometryComponent.index] = gameObject;
})

export var disposeComponent = ensureFunc(curry((returnVal, GeometryData:any, geometry:Geometry) => {
    it("count should >= 0", () => {
        expect(GeometryData.count).gte(0);
    });
    it("index should >= 0", () => {
        expect(GeometryData.index).gte(0);
    });
    it("index should === count", () => {
        expect(GeometryData.index).equal(GeometryData.count);
    });
}), curry((GeometryData:any, geometry:Geometry) => {
    var index = geometry.index;

    deleteBySwap(GeometryData.verticesMap, index);
    deleteBySwap(GeometryData.indicesMap, index);

    GeometryData.count -= 1;
    GeometryData.index -= 1;

    deleteVal(index, GeometryData.configDataMap);
    deleteVal(index, GeometryData.computeDataFuncMap);
    deleteVal(index, GeometryData.drawModeMap);
}))

export var initData = (DataBufferConfig: any, GeometryData: any) => {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig),
        count = GeometryData.count,
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

    GeometryData.configDataMap = {};

    GeometryData.verticesMap = [];
    GeometryData.indicesMap = [];

    GeometryData.computeDataFuncMap = {};

    GeometryData.drawModeMap = {};

    GeometryData.gameObjectMap = {};

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

var _checkIsIndicesBufferNeed32BitsByData = (GeometryData:any) => {
    return GeometryData.indexType === EBufferType.UNSIGNED_INT;
}
