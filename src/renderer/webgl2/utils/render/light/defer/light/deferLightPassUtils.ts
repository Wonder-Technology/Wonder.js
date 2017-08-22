import { bindVao } from "../../../../worker/render_file/vao/vaoUtils";
import { ensureFunc, it } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var sendAttributeData = (gl:any, {
    fullScreenQuadVertexArray
}) => {
    bindVao(gl, fullScreenQuadVertexArray);
}

export var drawFullScreenQuad = (gl:any, {
    fullScreenQuadIndicesCount
}) => {
    gl.drawElements(gl.TRIANGLES, fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
}

export var getScissorRegionArrayCache = ensureFunc((scissorRegionArray:Array<number>) =>{
    it("scissorRegionArray shouldn't be undefined", () => {
        expect(scissorRegionArray !== void 0).true;
    });
}, (pointLightIndex:number, DeferPointLightPassDataFromSystem:any) => DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex]);

export var setScissorRegionArrayCache = (pointLightIndex:number, DeferPointLightPassDataFromSystem:any, scissorRegionArrayCache:Array<number>) => DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex] = scissorRegionArrayCache;

//todo dispose buffers

