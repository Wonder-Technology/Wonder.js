import { isValidMapValue } from "../../../../utils/objectUtils";
import { ensureFunc, it } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Log } from "../../../../utils/Log";
export var registerProgram = function (shaderIndex, ProgramDataFromSystem, program) {
    ProgramDataFromSystem.programMap[shaderIndex] = program;
};
export var isProgramExist = function (program) { return isValidMapValue(program); };
export var initShader = function (program, vsSource, fsSource, gl) {
    var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER)), fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "a_position");
    _linkProgram(gl, program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
};
var _linkProgram = ensureFunc(function (returnVal, gl, program) {
    it("link program error:" + gl.getProgramInfoLog(program), function () {
        expect(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
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
        Log.log(gl.getShaderInfoLog(shader));
        Log.log("source:\n", glslSource);
    }
};
//# sourceMappingURL=programUtils.js.map