export var bindUniformBlock = function (gl, program, blockName, bindingPoint) {
    var uniformLocation = gl.getUniformBlockIndex(program, blockName);
    gl.uniformBlockBinding(program, uniformLocation, bindingPoint);
};
export var bindUniformBufferBase = function (gl, buffer, bindingPoint) {
    gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPoint, buffer);
};
export var bufferStaticData = function (gl, data) {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
};
export var bufferDynamicData = function (gl, data) {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.DYNAMIC_DRAW);
};
export var bufferSubDynamicData = function (gl, offset, data) {
    gl.bufferSubData(gl.UNIFORM_BUFFER, offset, data);
};
//# sourceMappingURL=uboUtils.js.map