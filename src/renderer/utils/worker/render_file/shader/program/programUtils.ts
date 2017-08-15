import { ensureFunc, it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap } from "../../../../../../utils/objectUtils";
import { forEach } from "../../../../../../utils/arrayUtils";

export var use = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    it("program should exist", () => {
        expect(getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
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
})

export var disableVertexAttribArray = requireCheckFunc((gl: WebGLRenderingContext, GLSLSenderDataFromSystem: any) => {
    it("vertexAttribHistory should has not hole", () => {
        forEach(GLSLSenderDataFromSystem.vertexAttribHistory, (isEnable: boolean) => {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
        })
    });
}, (gl: WebGLRenderingContext, GLSLSenderDataFromSystem: any) => {
    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;

    for (let i = 0, len = vertexAttribHistory.length; i < len; i++) {
        let isEnable = vertexAttribHistory[i];

        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }

        // vertexAttribHistory[i] = false;
        gl.disableVertexAttribArray(i);
    }

    GLSLSenderDataFromSystem.vertexAttribHistory = [];
})

export var getProgram = ensureFunc((program: WebGLProgram) => {
}, (shaderIndex: number, ProgramDataFromSystem: any) => {
    return ProgramDataFromSystem.programMap[shaderIndex];
})

export var initData = (ProgramDataFromSystem: any) => {
    ProgramDataFromSystem.programMap = createMap();
}
