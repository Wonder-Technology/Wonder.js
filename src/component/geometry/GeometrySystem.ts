import { GPUDetector } from "../../device/GPUDetector";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Geometry } from "./Geometry";
import { Map } from "immutable";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { isValidMapValue } from "../../utils/objectUtils";

//todo refactor: extract with MeshRenderer
export var create = requireCheckFunc((GeometryData: any) => {
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
    var verticesData = GeometryData.vertices,
        indicesData = GeometryData.indices,
        computeDataFuncMap = GeometryData.computeDataFuncMap,
        verticesCountMap = GeometryData.verticesCountMap,
        indicesCountMap = GeometryData.verticesCountMap;

    for (let i = 0, count = GeometryData.count; i < count; i++) {
        let computeDataFunc = computeDataFuncMap[i],
            {
            vertices,
            indices
        } = computeDataFunc(i, GeometryData),
            startVerticesIndex = verticesData.length,
            verticesCount = vertices.length,
            startIndicesIndex = indicesData.length,
            indicesCount = indices.length;

        _setPointData(startVerticesIndex, verticesCount, verticesData, vertices);

        _setVerticesIndexMap(i, startVerticesIndex, GeometryData);
        verticesCountMap[i] = verticesCount;

        _setPointData(startIndicesIndex, indicesCount, indicesData, indices);

        _setIndicesIndexMap(i, startIndicesIndex, GeometryData);
        indicesCountMap[i] = indicesCount;
    }

    return state;
}

var _setPointData = (startVerticesIndex:number, verticesCount:number, pointsData: Float32Array | Uint16Array | Uint32Array, targetData: Array<number>) => {
    var endIndex = startVerticesIndex + verticesCount;

    for (let j = startVerticesIndex; j < endIndex; j++) {
        pointsData[j] = targetData[j - startVerticesIndex];
    }
}

var _setVerticesIndexMap = (index: number, verticesIndex: number, GeometryData: any) => {
    GeometryData.verticesIndexMap[index] = verticesIndex;
}

var _setIndicesIndexMap = (index: number, indicesIndex: number, GeometryData: any) => {
    GeometryData.indicesIndexMap[index] = indicesIndex;
}

export var getDrawMode = (index:number, GeometryData:any) => {
    return GeometryData.drawModeMap[index];
}

export var setDrawMode = () => {

}

export var getVerticesCount = (index:number, GeometryData:any) => {
    return GeometryData.verticesCountMap[index];
}

export var getIndicesCount = (index:number, GeometryData:any) => {
    return GeometryData.indicesCountMap[index];
}

export var getIndexType = (GeometryData:any) => {
    return GeometryData.indexType;
}

export var getIndexTypeSize = (GeometryData:any) => {
    return GeometryData.indexTypeSize;
}

export var getVertices = requireCheckFunc ((index:number, GeometryData:any) => {
    it("verticesIndex should exist", () => {
        expect(GeometryData.verticesIndexMap[index]).exist;
    });
    it("verticesCount should exist", () => {
        expect(GeometryData.verticesCountMap[index]).exist;
    });
}, (index:number, GeometryData:any) => {
    return GeometryData.vertices.subarray(GeometryData.verticesIndexMap[index], GeometryData.verticesCountMap[index]);
})

export var getIndices = requireCheckFunc ((index:number, GeometryData:any) => {
    it("indicesIndex should exist", () => {
        expect(GeometryData.indicesIndexMap[index]).exist;
    });
    it("indicesCount should exist", () => {
        expect(GeometryData.indicesCountMap[index]).exist;
    });
}, (index:number, GeometryData:any) => {
    return GeometryData.indices.subarray(GeometryData.indicesIndexMap[index], GeometryData.indicesCountMap[index]);
})

export var hasIndices = (index:number, GeometryData:any) => {
    return isValidMapValue(GeometryData.indicesIndexMap[index]);
}

export var initData = (DataBufferConfig: any, GeometryData: any) => {
    var buffer: ArrayBuffer = null,
        isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32Bits(DataBufferConfig),
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

    buffer = new ArrayBuffer(count * (Float32Array.BYTES_PER_ELEMENT + indicesArrayBytes));

    GeometryData.buffer = buffer;

    GeometryData.indices = new Uint32Array(buffer, 0, count * indicesArrayBytes);
    GeometryData.vertices = new Float32Array(buffer, count * indicesArrayBytes, count * Float32Array.BYTES_PER_ELEMENT);

    GeometryData.configDataMap = {};

    GeometryData.verticesIndexMap = {};
    GeometryData.indicesIndexMap = {};

    GeometryData.verticesCountMap = {};
    GeometryData.indicesCountMap = {};

    GeometryData.computeDataFuncMap = {};

    GeometryData.drawModeMap = {};

    GeometryData.index = 0;
    GeometryData.count = 0;
}

var _checkIsIndicesBufferNeed32Bits = (DataBufferConfig: any) => {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }

    //todo refactor: use function
    return GPUDetector.getInstance().extensionUintIndices === true;
}
