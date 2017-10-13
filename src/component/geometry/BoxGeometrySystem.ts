import { BoxGeometry, BoxGeometryConfigData } from "./BoxGeometry";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Vector3 } from "../../math/Vector3";
import {
    create as createGeometry,
    isIndicesBufferNeed32BitsByData
} from "./GeometrySystem";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { GlobalTempData } from "../../definition/GlobalTempData";

export const create = (GeometryData: any) => {
    var geometry = new BoxGeometry(),
        index: number = null;

    geometry = createGeometry(geometry, GeometryData);

    index = geometry.index;

    setConfigData(index, {}, GeometryData);

    GeometryData.computeDataFuncMap[index] = _computeData;

    return geometry;
}

const _computeData = (index: number, GeometryData: any) => {
    var {
            width,
        height,
        depth,
        widthSegments,
        heightSegments,
        depthSegments
        } = _getConfigData(index, GeometryData),
        sides = {
            FRONT: 0,
            BACK: 1,
            TOP: 2,
            BOTTOM: 3,
            RIGHT: 4,
            LEFT: 5
        },
        vertices = [],
        normals = [],
        texCoords = [],
        indices = [];

    var faceAxes = [
        [0, 1, 3], // FRONT
        [4, 5, 7], // BACK
        [3, 2, 6], // TOP
        [1, 0, 4], // BOTTOM
        [1, 4, 2], // RIGHT
        [5, 0, 6]  // LEFT
    ];

    var faceNormals = [
        [0, 0, 1], // FRONT
        [0, 0, -1], // BACK
        [0, 1, 0], // TOP
        [0, -1, 0], // BOTTOM
        [1, 0, 0], // RIGHT
        [-1, 0, 0]  // LEFT
    ];
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

    function generateFace(side, uSegments, vSegments) {
        var x, y, z, u, v;
        var i, j;
        var offset = vertices.length / 3;

        for (i = 0; i <= uSegments; i++) {
            for (j = 0; j <= vSegments; j++) {
                let temp1 = GlobalTempData.vector3_1,
                    temp2 = GlobalTempData.vector3_2,
                    temp3 = GlobalTempData.vector3_3,
                    r = GlobalTempData.vector3_4;

                temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                temp3.sub2(temp2, corners[faceAxes[side][0]]);
                r.add2(temp1, temp3);
                u = i / uSegments;
                v = j / vSegments;

                vertices.push(r.x, r.y, r.z);
                normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
                texCoords.push(u, v);

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
        normals: normals,
        texCoords: texCoords,
        indices: indices
    };
}

const _getConfigData = ensureFunc((data: BoxGeometryConfigData) => {
    it("config data should be defined", () => {
        expect(data).exist;
        expect(data.width).exist;
        expect(data.height).exist;
        expect(data.depth).exist;
        expect(data.widthSegments).exist;
        expect(data.heightSegments).exist;
        expect(data.depthSegments).exist;
    })
}, (index: number, GeometryData: any) => {
    return GeometryData.configDataMap[index];
})

export const setConfigData = (index: number, data: BoxGeometryConfigData, GeometryData: any) => {
    GeometryData.configDataMap[index] = ExtendUtils.extend({
        width: 10,
        height: 10,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    },
        data
    );
}

