import { use as useProgram } from "./program/programUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidVal } from "../../../../../utils/arrayUtils";
export var use = function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    return useProgram(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
};
export var getVao = function (geometryIndex, vaoMap) {
    return vaoMap[geometryIndex];
};
export var isVaoExist = function (vao) { return isValidVal(vao); };
export var createAndInitArrayBuffer = requireCheckFunc(function (gl, data, location, size) {
    it("location should be defined", function () {
        expect(location).exist;
    });
}, function (gl, data, location, size) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    return buffer;
});
export var createAndInitIndexBuffer = function (gl, data) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
};
//# sourceMappingURL=shaderUtils.js.map