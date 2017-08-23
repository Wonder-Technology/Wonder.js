"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../../../../../utils/objectUtils");
var arrayUtils_1 = require("../../../../../../utils/arrayUtils");
exports.use = contract_1.requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    contract_1.it("program should exist", function () {
        wonder_expect_js_1.expect(exports.getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var program = exports.getProgram(shaderIndex, ProgramDataFromSystem);
    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return program;
    }
    ProgramDataFromSystem.lastUsedProgram = program;
    gl.useProgram(program);
    exports.disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;
    return program;
});
exports.disableVertexAttribArray = contract_1.requireCheckFunc(function (gl, GLSLSenderDataFromSystem) {
    contract_1.it("vertexAttribHistory should has not hole", function () {
        arrayUtils_1.forEach(GLSLSenderDataFromSystem.vertexAttribHistory, function (isEnable) {
            wonder_expect_js_1.expect(isEnable).exist;
            wonder_expect_js_1.expect(isEnable).be.a("boolean");
        });
    });
}, function (gl, GLSLSenderDataFromSystem) {
    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;
    for (var i = 0, len = vertexAttribHistory.length; i < len; i++) {
        var isEnable = vertexAttribHistory[i];
        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }
        gl.disableVertexAttribArray(i);
    }
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
});
exports.getProgram = contract_1.ensureFunc(function (program) {
}, function (shaderIndex, ProgramDataFromSystem) {
    return ProgramDataFromSystem.programMap[shaderIndex];
});
exports.initData = function (ProgramDataFromSystem) {
    ProgramDataFromSystem.programMap = objectUtils_1.createMap();
};
//# sourceMappingURL=programUtils.js.map