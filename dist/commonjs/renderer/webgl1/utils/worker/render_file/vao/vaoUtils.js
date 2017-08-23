"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vaoUtils_1 = require("../../../../../utils/worker/render_file/vao/vaoUtils");
exports.createVao = function (extension) {
    return extension.createVertexArrayOES();
};
exports.bindVao = function (extension, vao) {
    extension.bindVertexArrayOES(vao);
};
exports.unbindVao = function (extension) {
    extension.bindVertexArrayOES(null);
};
exports.disposeVao = function (gl, extension, geometryIndex, vaoMap, vboArrayMap) {
    extension.deleteVertexArrayOES(vaoMap[geometryIndex]);
    vaoUtils_1.removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
};
//# sourceMappingURL=vaoUtils.js.map