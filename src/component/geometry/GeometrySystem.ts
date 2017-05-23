import { GPUDetector } from "../../device/GPUDetector";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Geometry } from "./Geometry";
import { Map } from "immutable";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { deleteVal, isNotValidMapValue } from "../../utils/objectUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, getComponentGameObject
} from "../ComponentSystem";
import { deleteBySwap } from "../../utils/arrayUtils";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { GeometryComputeDataFuncMap, GeometryIndicesMap, GeometryVerticesMap } from "./GeometryData";

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

    setDrawMode(geometry.index, EDrawMode.TRIANGLES, GeometryData);

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
        isIndicesBufferNeed32Bits = isIndicesBufferNeed32BitsByData(GeometryData);

    for (let i = 0, count = GeometryData.count; i < count; i++) {
        initGeometry(i, isIndicesBufferNeed32Bits, computeDataFuncMap, verticesMap, indicesMap, GeometryData);
    }

    return state;
}

export var initGeometry = (index:number, isIndicesBufferNeed32Bits:boolean, computeDataFuncMap:GeometryComputeDataFuncMap, verticesMap:GeometryVerticesMap, indicesMap:GeometryIndicesMap, GeometryData:any) => {
    var computeDataFunc = computeDataFuncMap[index],
        {
            vertices,
            indices
        } = computeDataFunc(index, GeometryData);

    verticesMap[index] = new Float32Array(vertices);

    if(isIndicesBufferNeed32Bits){
        indicesMap[index] = new Uint32Array(indices);
    }
    else{
        indicesMap[index] = new Uint16Array(indices);
    }
}

export var getDrawMode = (index:number, GeometryData:any) => {
    return GeometryData.drawModeMap[index];
}

export var setDrawMode = (index:number, drawMode:EDrawMode, GeometryData:any) => {
    GeometryData.drawModeMap[index] = drawMode;
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

export var addComponent = curry((GeometryData:any, component:Geometry, gameObject:GameObject) => {
    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
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
    deleteVal(index, GeometryData.gameObjectMap);
}))

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var getConfigData = (index:number, GeometryData: any) => {
    return GeometryData.configDataMap[index];
}

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

export var isIndicesBufferNeed32BitsByData = (GeometryData:any) => {
    return GeometryData.indexType === EBufferType.UNSIGNED_INT;
}
