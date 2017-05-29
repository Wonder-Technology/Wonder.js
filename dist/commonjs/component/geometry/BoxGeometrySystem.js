"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoxGeometry_1 = require("./BoxGeometry");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var Vector3_1 = require("../../math/Vector3");
var GeometrySystem_1 = require("./GeometrySystem");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var GlobalTempData_1 = require("../../definition/GlobalTempData");
exports.create = function (GeometryData) {
    var geometry = new BoxGeometry_1.BoxGeometry(), index = null;
    geometry = GeometrySystem_1.create(geometry, GeometryData);
    index = geometry.index;
    exports.setConfigData(index, {}, GeometryData);
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
        Vector3_1.Vector3.create(-width, -height, depth),
        Vector3_1.Vector3.create(width, -height, depth),
        Vector3_1.Vector3.create(width, height, depth),
        Vector3_1.Vector3.create(-width, height, depth),
        Vector3_1.Vector3.create(width, -height, -depth),
        Vector3_1.Vector3.create(-width, -height, -depth),
        Vector3_1.Vector3.create(-width, height, -depth),
        Vector3_1.Vector3.create(width, height, -depth)
    ];
    function generateFace(side, uSegments, vSegments) {
        var x, y, z, u, v;
        var i, j;
        var offset = vertices.length / 3;
        for (i = 0; i <= uSegments; i++) {
            for (j = 0; j <= vSegments; j++) {
                var temp1 = GlobalTempData_1.GlobalTempData.vector3_1, temp2 = GlobalTempData_1.GlobalTempData.vector3_2, temp3 = GlobalTempData_1.GlobalTempData.vector3_3, r = GlobalTempData_1.GlobalTempData.vector3_4;
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
        vertices: GeometrySystem_1.convertVerticesArrayToTypeArray(vertices),
        indices: GeometrySystem_1.convertIndicesArrayToTypeArray(indices, GeometryData)
    };
};
var _getConfigData = contract_1.ensureFunc(function (data) {
    contract_1.it("config data should be defined", function () {
        wonder_expect_js_1.expect(data).exist;
        wonder_expect_js_1.expect(data.width).exist;
        wonder_expect_js_1.expect(data.height).exist;
        wonder_expect_js_1.expect(data.depth).exist;
        wonder_expect_js_1.expect(data.widthSegments).exist;
        wonder_expect_js_1.expect(data.heightSegments).exist;
        wonder_expect_js_1.expect(data.depthSegments).exist;
    });
}, function (index, GeometryData) {
    return GeometryData.configDataMap[index];
});
exports.setConfigData = function (index, data, GeometryData) {
    GeometryData.configDataMap[index] = ExtendUtils_1.ExtendUtils.extend({
        width: 10,
        height: 10,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    }, data);
};
//# sourceMappingURL=BoxGeometrySystem.js.map