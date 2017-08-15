import { ensureFunc, it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { createMap, isValidMapValue } from "../../../../../../utils/objectUtils";
import { expect } from "wonder-expect.js";
import { AttributeLocationMap, UniformLocationMap } from "../../../../../type/dataType";

export var getUniformLocation = ensureFunc((pos: number, gl: WebGLRenderingContext, name: string, uniformLocationMap: UniformLocationMap) => {
    // it(`${name}'s uniform location should exist in map`, () => {
    //     expect(isValidMapValue(pos)).true;
    // });
}, (gl: WebGLRenderingContext, program: WebGLProgram, name: string, uniformLocationMap: UniformLocationMap) => {
    var pos: WebGLUniformLocation = null;

    pos = uniformLocationMap[name];

    if (isValidMapValue(pos)) {
        return pos;
    }

    pos = gl.getUniformLocation(program, name);
    uniformLocationMap[name] = pos;

    return pos;
})

export var isUniformLocationNotExist = (pos: WebGLUniformLocation) => {
    return pos === null;
}

//todo separate LocationDataFromSystem

export var initData = (LocationDataFromSystem: any) => {
    LocationDataFromSystem.attributeLocationMap = createMap();
    LocationDataFromSystem.uniformLocationMap = createMap();
}
