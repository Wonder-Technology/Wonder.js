import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";
export var createVao = function (extension) {
    return extension.createVertexArrayOES();
};
export var bindVao = function (extension, vao) {
    extension.bindVertexArrayOES(vao);
};
export var unbindVao = function (extension) {
    extension.bindVertexArrayOES(null);
};
export var disposeVao = function (gl, extension, geometryIndex, vaoMap, vboArrayMap) {
    extension.deleteVertexArrayOES(vaoMap[geometryIndex]);
    removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
};
//# sourceMappingURL=vaoUtils.js.map