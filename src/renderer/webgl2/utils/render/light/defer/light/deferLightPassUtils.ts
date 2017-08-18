import { bindVao } from "../../../../worker/render_file/vao/vaoUtils";

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

//todo dispose buffers

