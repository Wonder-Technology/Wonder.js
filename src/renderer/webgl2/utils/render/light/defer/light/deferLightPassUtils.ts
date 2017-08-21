import { bindVao } from "../../../../worker/render_file/vao/vaoUtils";
import { ensureFunc, it } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var sendAttributeData = (gl:any, DeferLightPassDataFromSystem:any) => {
    bindVao(gl, DeferLightPassDataFromSystem.fullScreenQuadVertexArray);
    // gl.bindBuffer(gl.ARRAY_BUFFER, DeferLightPassDataFromSystem.fullScreenQuadPositionBuffer);
    //
    // gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    //
    // gl.enableVertexAttribArray(0);
}

export var drawFullScreenQuad = (gl:any, DeferLightPassDataFromSystem:any) => {
    // gl.bindBuffer(gl.ARRAY_BUFFER, DeferLightPassDataFromSystem.fullScreenQuadPositionBuffer);
    //
    // gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    //
    // gl.enableVertexAttribArray(0);


    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, DeferLightPassDataFromSystem.fullScreenQuadIndexBuffer);

    gl.drawElements(gl.TRIANGLES, DeferLightPassDataFromSystem.fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export var getScissorRegionArrayCache = ensureFunc((scissorRegionArray:Array<number>) =>{
    it("scissorRegionArray shouldn't be undefined", () => {
        expect(scissorRegionArray !== void 0).true;
    });
}, (pointLightIndex:number, DeferLightPassDataFromSystem:any) => DeferLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex]);

export var setScissorRegionArrayCache = (pointLightIndex:number, DeferLightPassDataFromSystem:any, scissorRegionArrayCache:Array<number>) => DeferLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex] = scissorRegionArrayCache;

//todo dispose buffers

