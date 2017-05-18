import { GPUDetector } from "../../device/GPUDetector";
import { BoxGeometry } from "./BoxGeometry";
import { BoxGeometryConfigData } from "./BoxGeometryData";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Vector3 } from "../../math/Vector3";
import { Map } from "immutable";

//todo refactor: extract with MeshRenderer
export var create = requireCheckFunc((BoxGeometryData: any) => {
    it("BoxGeometryData.index should === BoxGeometryData.count", () => {
        expect(BoxGeometryData.index).equal(BoxGeometryData.count);
    });
    it("BoxGeometryData.index should >= 0", () => {
        expect(BoxGeometryData.index).gte(0);
    });
    it("BoxGeometryData.count should >= 0", () => {
        expect(BoxGeometryData.count).gte(0);
    });
}, (BoxGeometryData: any) => {
    var geometry = new BoxGeometry(),
        index = _generateIndex(BoxGeometryData);

    geometry.index = index;

    BoxGeometryData.count += 1;

    // _setGeometryMap(geometry, index, BoxGeometryData);

    return geometry;
})

// var _getGeometryMap = (index:number, BoxGeometryData:any) => {
//     return BoxGeometryData.geometryMap[index];
// }
//
// var _setGeometryMap = requireCheckFunc ((geometry:BoxGeometry, index:number, BoxGeometryData:any) => {
//     it("geometry should not exist in geometryMap", () => {
//         expect(BoxGeometryData.geometryMap[index]).not.exist;
//     });
// }, (geometry:BoxGeometry, index:number, BoxGeometryData:any) => {
//     BoxGeometryData.geometryMap[index] = geometry;
// })

var _setVerticesIndexMap = (index: number, verticesIndex: number, BoxGeometryData: any) => {
    BoxGeometryData.verticesIndexMap[index] = verticesIndex;
}

var _setIndicesIndexMap = (index: number, indicesIndex: number, BoxGeometryData: any) => {
    BoxGeometryData.indicesIndexMap[index] = indicesIndex;
}

//todo refactor: extract with MeshRenderer
var _generateIndex = (BoxGeometryData: any) => {
    return BoxGeometryData.index++;
}

export var init = (BoxGeometryData: any, state:Map<any, any>) => {
    var verticesData = BoxGeometryData.vertices,
        verticesDataLength = verticesData.length,
        indicesData = BoxGeometryData.indices,
        indicesLength = BoxGeometryData.indices.length;

    // var verticesDataStartIndex = verticesDataLength,
    //     verticesDataEndIndex = null;

    for (let i = 0, count = BoxGeometryData.count; i < count; i++) {
        let {
            vertices,
            indices
        } = _computeData(i, BoxGeometryData);
        // geometry = _getGeometryMap(i, BoxGeometryData);

        // let verticesLength = vertices.length;
        //
        // verticesDataStartIndex = verticesDataEndIndex;
        //
        // verticesDataEndIndex = verticesDataStartIndex + verticesLength;


        // for (let j = verticesDataStartIndex; j < verticesDataEndIndex; j++) {
        //     verticesData[j] = vertices[j - verticesLength];
        // }

        // _setPointData(verticesDataStartIndex, verticesDataEndIndex, verticesData, vertices);
        let endVerticesIndex = _setPointData(verticesData, vertices);

        // verticesDataStartIndex = verticesDataEndIndex;

        _setVerticesIndexMap(i, endVerticesIndex, BoxGeometryData);

        let endIndicesIndex = _setPointData(indicesData, indices);

        // verticesDataStartIndex = verticesDataEndIndex;

        _setIndicesIndexMap(i, endIndicesIndex, BoxGeometryData);
    }

    return state;
}

// var _setPointData = (pointsDataStartIndex:number, pointsDataEndIndex:number, pointsData:Float32Array|Uint16Array|Uint32Array, targetData:Array<number>) => {
var _setPointData = (pointsData: Float32Array | Uint16Array | Uint32Array, targetData: Array<number>) => {
    var pointDataLength = pointsData.length,
        targetDataLength = targetData.length,
        endIndex = pointDataLength + targetDataLength;

    // for (let j = pointsDataStartIndex; j < pointsDataEndIndex; j++) {
    for (let j = pointDataLength; j < endIndex; j++) {
        pointsData[j] = targetData[j - pointDataLength];
    }

    return endIndex;
}

export var setData = requireCheckFunc((geometry: BoxGeometry, data: BoxGeometryConfigData, BoxGeometryData: any) => {
    it("should set all config data", () => {
        expect(data.width).exist;
        expect(data.height).exist;
        expect(data.depth).exist;
        expect(data.widthSegments).exist;
        expect(data.heightSegments).exist;
        expect(data.depthSegments).exist;
    })
}, (geometry: BoxGeometry, data: BoxGeometryConfigData, BoxGeometryData: any) => {
    BoxGeometryData.configDataMap[geometry.index] = data;
})

var _computeData = (index: number, BoxGeometryData: any) => {
    var {
            width,
            height,
            depth,
            widthSegments,
            heightSegments,
            depthSegments
        } = _getConfigData(index, BoxGeometryData),
        sides = {
            FRONT: 0,
            BACK: 1,
            TOP: 2,
            BOTTOM: 3,
            RIGHT: 4,
            LEFT: 5
        };
    var faceAxes = [
        [0, 1, 3], // FRONT
        [4, 5, 7], // BACK
        [3, 2, 6], // TOP
        [1, 0, 4], // BOTTOM
        [1, 4, 2], // RIGHT
        [5, 0, 6]  // LEFT
    ];

    // var faceNormals = [
    //     [  0,  0,  1 ], // FRONT
    //     [  0,  0, -1 ], // BACK
    //     [  0,  1,  0 ], // TOP
    //     [  0, -1,  0 ], // BOTTOM
    //     [  1,  0,  0 ], // RIGHT
    //     [ -1,  0,  0 ]  // LEFT
    // ];
    var corners = [
        Vector3.create(-width, -height, depth),
        Vector3.create(width, -height, depth),
        Vector3.create(width, height, depth),
        Vector3.create(-width, height, depth),
        Vector3.create(width, -height, -depth),
        Vector3.create(-width, -height, -depth),
        Vector3.create(-width, height, -depth),
        Vector3.create(width, height, -depth)
    ];

    var vertices = [];
    // var normals = [];
    // var texCoords = [];
    var indices = [];

    function generateFace(side, uSegments, vSegments) {
        var x, y, z, u, v;
        var i, j;
        var offset = vertices.length / 3;

        for (i = 0; i <= uSegments; i++) {
            for (j = 0; j <= vSegments; j++) {
                let temp1 = Vector3.create()
                var temp2 = Vector3.create();
                var temp3 = Vector3.create();
                var r = Vector3.create();
                temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                temp3.sub2(temp2, corners[faceAxes[side][0]]);
                r.add2(temp1, temp3);
                u = i / uSegments;
                v = j / vSegments;

                vertices.push(r.x, r.y, r.z);
                // normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
                // texCoords.push(u, v);

                if ((i < uSegments) && (j < vSegments)) {
                    indices.push(offset + j + i * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1), offset + j + i * (uSegments + 1) + 1);
                    indices.push(offset + j + (i + 1) * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1) + 1, offset + j + i * (uSegments + 1) + 1);

                }
            }
        }
    }

    generateFace(sides.FRONT, widthSegments, heightSegments);
    generateFace(sides.BACK, widthSegments, heightSegments);
    generateFace(sides.TOP, widthSegments, depthSegments);
    generateFace(sides.BOTTOM, widthSegments, depthSegments);
    generateFace(sides.RIGHT, depthSegments, heightSegments);
    generateFace(sides.LEFT, depthSegments, heightSegments);

    return {
        vertices: vertices,
        //todo direct add to faces, remove indices,normals
        // faces: GeometryUtils.convertToFaces(indices, normals)
        // faces: GeometryUtils.convertToFaces(indices)
        indices: indices
        // texCoords: texCoords
    };
}

var _getConfigData = ensureFunc((data: BoxGeometryConfigData) => {
    it("config data should be defined", () => {
        expect(data.width).exist;
        expect(data.height).exist;
        expect(data.depth).exist;
        expect(data.widthSegments).exist;
        expect(data.heightSegments).exist;
        expect(data.depthSegments).exist;
    })
}, (index: number, BoxGeometryData: any) => {
    return BoxGeometryData.configDataMap[index];
})

export var getVertices = () => {

}

export var getIndices = () => {

}

var _checkIsIndicesBufferNeed32Bits = (DataBufferConfig: any) => {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }

    //todo refactor: use function
    return GPUDetector.getInstance().extensionUintIndices === true;
}

export var initData = (DataBufferConfig: any, BoxGeometryData: any) => {
    // var verticesBuffer: ArrayBuffer = null,
    //     indicesBuffer: ArrayBuffer = null,
    var buffer: ArrayBuffer = null,
        isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32Bits(DataBufferConfig),
        count = BoxGeometryData.count,
        // size = null,
        indicesArrayBytes = null;

    // verticesBuffer = new ArrayBuffer(count * Float32Array.BYTES_PER_ELEMENT);
    if (isIndicesBufferNeed32Bits) {
        indicesArrayBytes = Uint32Array.BYTES_PER_ELEMENT;
    }
    else {
        indicesArrayBytes = Uint16Array.BYTES_PER_ELEMENT;
    }

    buffer = new ArrayBuffer(count * (Float32Array.BYTES_PER_ELEMENT + indicesArrayBytes));

    BoxGeometryData.buffer = buffer;

    BoxGeometryData.indices = new Uint32Array(buffer, 0, count * indicesArrayBytes);
    // BoxGeometryData.vertices = new Float32Array(verticesBuffer);
    BoxGeometryData.vertices = new Float32Array(buffer, count * indicesArrayBytes, count * Float32Array.BYTES_PER_ELEMENT);

    // if (isIndicesBufferNeed32Bits) {
    //     indicesBuffer = new ArrayBuffer(count * Uint32Array.BYTES_PER_ELEMENT);
    //
    //     BoxGeometryData.indices = new Uint32Array(indicesBuffer);
    // }
    // else {
    //     indicesBuffer = new ArrayBuffer(count * Uint16Array.BYTES_PER_ELEMENT);
    //
    //     BoxGeometryData.indices = new Uint16Array(indicesBuffer);
    // }

    // BoxGeometryData.verticesBuffer = verticesBuffer;
    // BoxGeometryData.indicesBuffer = indicesBuffer;

    BoxGeometryData.configData = {};

    // BoxGeometryData.geometryMap = {};
    BoxGeometryData.verticesIndexMap = {};
    BoxGeometryData.indicesIndexMap = {};

    BoxGeometryData.index = 0;
    BoxGeometryData.count = 0;
}

