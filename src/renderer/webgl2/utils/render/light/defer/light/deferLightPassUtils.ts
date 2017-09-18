import { ensureFunc, it } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { bindVao } from "../../../../worker/render_file/shader/shaderUtils";

export const sendAttributeData = (gl: any, ProgramDataFromSystem: any, {
    fullScreenQuadVertexArray
}) => {
    bindVao(gl, fullScreenQuadVertexArray, ProgramDataFromSystem);
}

export const drawFullScreenQuad = (gl: any, {
    fullScreenQuadIndicesCount
}) => {
    gl.drawElements(gl.TRIANGLES, fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
}

export const getScissorRegionArrayCache = ensureFunc((scissorRegionArray: Array<number>) => {
    it("scissorRegionArray shouldn't be undefined", () => {
        expect(scissorRegionArray !== void 0).true;
    });
}, (pointLightIndex: number, DeferPointLightPassDataFromSystem: any) => DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex]);

export const setScissorRegionArrayCache = (pointLightIndex: number, DeferPointLightPassDataFromSystem: any, scissorRegionArrayCache: Array<number> | number) => DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex] = scissorRegionArrayCache;

//todo dispose buffers

