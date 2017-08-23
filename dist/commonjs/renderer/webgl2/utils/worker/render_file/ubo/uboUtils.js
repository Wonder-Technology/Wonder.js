"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindUniformBlock = function (gl, program, blockName, bindingPoint) {
    var uniformLocation = gl.getUniformBlockIndex(program, blockName);
    gl.uniformBlockBinding(program, uniformLocation, bindingPoint);
};
exports.bindUniformBufferBase = function (gl, buffer, bindingPoint) {
    gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPoint, buffer);
};
exports.bufferStaticData = function (gl, data) {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
};
exports.bufferDynamicData = function (gl, data) {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.DYNAMIC_DRAW);
};
exports.bufferSubDynamicData = function (gl, offset, data) {
    gl.bufferSubData(gl.UNIFORM_BUFFER, offset, data);
};
//# sourceMappingURL=uboUtils.js.map