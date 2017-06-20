import { BoxGeometry } from "./BoxGeometry";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Vector3 } from "../../math/Vector3";
import { create as createGeometry } from "./GeometrySystem";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { GlobalTempData } from "../../definition/GlobalTempData";
export var create = function (GeometryData) {
    var geometry = new BoxGeometry(), index = null;
    geometry = createGeometry(geometry, GeometryData);
    index = geometry.index;
    setConfigData(index, {}, GeometryData);
    GeometryData.computeDataFuncMap[index] = _computeData;
    return geometry;
};
var _computeData = function (index, GeometryData) {
    var _a = _getConfigData(index, GeometryData), width = _a.width, height = _a.height, depth = _a.depth, widthSegments = _a.widthSegments, heightSegments = _a.heightSegments, depthSegments = _a.depthSegments, sides = {
        FRONT: 0,
        BACK: 1,
        TOP: 2,
        BOTTOM: 3,
        RIGHT: 4,
        LEFT: 5
    }, vertices = [], indices = [];
    var faceAxes = [
        [0, 1, 3],
        [4, 5, 7],
        [3, 2, 6],
        [1, 0, 4],
        [1, 4, 2],
        [5, 0, 6]
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
                var temp1 = GlobalTempData.vector3_1, temp2 = GlobalTempData.vector3_2, temp3 = GlobalTempData.vector3_3, r = GlobalTempData.vector3_4;
                temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                temp3.sub2(temp2, corners[faceAxes[side][0]]);
                r.add2(temp1, temp3);
                u = i / uSegments;
                v = j / vSegments;
                vertices.push(r.x, r.y, r.z);
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
        indices: indices
    };
};
var _getConfigData = ensureFunc(function (data) {
    it("config data should be defined", function () {
        expect(data).exist;
        expect(data.width).exist;
        expect(data.height).exist;
        expect(data.depth).exist;
        expect(data.widthSegments).exist;
        expect(data.heightSegments).exist;
        expect(data.depthSegments).exist;
    });
}, function (index, GeometryData) {
    return GeometryData.configDataMap[index];
});
export var setConfigData = function (index, data, GeometryData) {
    GeometryData.configDataMap[index] = ExtendUtils.extend({
        width: 10,
        height: 10,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    }, data);
};
//# sourceMappingURL=BoxGeometrySystem.js.map