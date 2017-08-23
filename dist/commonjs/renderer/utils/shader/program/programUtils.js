"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("../../../../utils/objectUtils");
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var Log_1 = require("../../../../utils/Log");
exports.registerProgram = function (shaderIndex, ProgramDataFromSystem, program) {
    ProgramDataFromSystem.programMap[shaderIndex] = program;
};
exports.isProgramExist = function (program) { return objectUtils_1.isValidMapValue(program); };
exports.initShader = function (program, vsSource, fsSource, gl) {
    var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER)), fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "a_position");
    _linkProgram(gl, program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
};
var _linkProgram = contract_1.ensureFunc(function (returnVal, gl, program) {
    contract_1.it("link program error:" + gl.getProgramInfoLog(program), function () {
        wonder_expect_js_1.expect(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
    });
}, function (gl, program) {
    gl.linkProgram(program);
});
var _compileShader = function (gl, glslSource, shader) {
    gl.shaderSource(shader, glslSource);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    else {
        Log_1.Log.log(gl.getShaderInfoLog(shader));
        Log_1.Log.log("source:\n", glslSource);
    }
};
//# sourceMappingURL=programUtils.js.map