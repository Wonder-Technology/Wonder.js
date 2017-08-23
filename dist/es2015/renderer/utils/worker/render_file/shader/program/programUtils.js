import { ensureFunc, it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap } from "../../../../../../utils/objectUtils";
import { forEach } from "../../../../../../utils/arrayUtils";
export var use = requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    it("program should exist", function () {
        expect(getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var program = getProgram(shaderIndex, ProgramDataFromSystem);
    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return program;
    }
    ProgramDataFromSystem.lastUsedProgram = program;
    gl.useProgram(program);
    disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;
    return program;
});
export var disableVertexAttribArray = requireCheckFunc(function (gl, GLSLSenderDataFromSystem) {
    it("vertexAttribHistory should has not hole", function () {
        forEach(GLSLSenderDataFromSystem.vertexAttribHistory, function (isEnable) {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
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
export var getProgram = ensureFunc(function (program) {
}, function (shaderIndex, ProgramDataFromSystem) {
    return ProgramDataFromSystem.programMap[shaderIndex];
});
export var initData = function (ProgramDataFromSystem) {
    ProgramDataFromSystem.programMap = createMap();
};
//# sourceMappingURL=programUtils.js.map