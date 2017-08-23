"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var programUtils_1 = require("./program/programUtils");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../../../../utils/arrayUtils");
exports.use = function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    return programUtils_1.use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
};
exports.getVao = function (geometryIndex, vaoMap) {
    return vaoMap[geometryIndex];
};
exports.isVaoExist = function (vao) { return arrayUtils_1.isValidVal(vao); };
exports.createAndInitArrayBuffer = contract_1.requireCheckFunc(function (gl, data, location, size) {
    contract_1.it("location should be defined", function () {
        wonder_expect_js_1.expect(location).exist;
    });
}, function (gl, data, location, size) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    return buffer;
});
exports.createAndInitIndexBuffer = function (gl, data) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
};
//# sourceMappingURL=shaderUtils.js.map