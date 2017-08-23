"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vaoUtils_1 = require("../../../../../utils/worker/render_file/vao/vaoUtils");
exports.createVao = function (gl) {
    return gl.createVertexArray();
};
exports.bindVao = function (gl, vao) {
    gl.bindVertexArray(vao);
};
exports.unbindVao = function (gl) {
    gl.bindVertexArray(null);
};
exports.disposeVao = function (gl, geometryIndex, vaoMap, vboArrayMap) {
    gl.deleteVertexArray(vaoMap[geometryIndex]);
    vaoUtils_1.removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
};
//# sourceMappingURL=vaoUtils.js.map