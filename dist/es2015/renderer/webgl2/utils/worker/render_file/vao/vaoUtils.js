import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";
export var createVao = function (gl) {
    return gl.createVertexArray();
};
export var bindVao = function (gl, vao) {
    gl.bindVertexArray(vao);
};
export var unbindVao = function (gl) {
    gl.bindVertexArray(null);
};
export var disposeVao = function (gl, geometryIndex, vaoMap, vboArrayMap) {
    gl.deleteVertexArray(vaoMap[geometryIndex]);
    removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
};
//# sourceMappingURL=vaoUtils.js.map