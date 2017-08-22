import { bindVao } from "../../../../worker/render_file/vao/vaoUtils";
import { ensureFunc, it } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var sendAttributeData = (gl:any, DeferLightPassDataFromSystem:any) => {
    bindVao(gl, DeferLightPassDataFromSystem.fullScreenQuadVertexArray);
}

export var drawFullScreenQuad = (gl:any, DeferLightPassDataFromSystem:any) => {
    gl.drawElements(gl.TRIANGLES, DeferLightPassDataFromSystem.fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
}

export var getScissorRegionArrayCache = ensureFunc((scissorRegionArray:Array<number>) =>{
    it("scissorRegionArray shouldn't be undefined", () => {
        expect(scissorRegionArray !== void 0).true;
    });
}, (pointLightIndex:number, DeferLightPassDataFromSystem:any) => DeferLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex]);

export var setScissorRegionArrayCache = (pointLightIndex:number, DeferLightPassDataFromSystem:any, scissorRegionArrayCache:Array<number>) => DeferLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex] = scissorRegionArrayCache;

//todo dispose buffers

