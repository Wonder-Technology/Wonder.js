import { bindVAO } from "../../vao/VAOSystem";

export var init = (gl:any, DeferLightPassData:any) => {
    _setFullScreenQuadVAOData(gl, DeferLightPassData);
}

export var sendAttributeData = (gl:any, DeferLightPassData:any) => {
    bindVAO(gl, DeferLightPassData.fullScreenQuadVertexArray);
}

export var drawFullScreenQuad = (gl:any, DeferLightPassData:any) => {
    gl.drawElements(gl.TRIANGLES, DeferLightPassData.fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
}

var _setFullScreenQuadVAOData = (gl:any, DeferLightPassData:any) => {
    //todo refactor: extract to VAOSystem
    var fullScreenQuadVertexArray = gl.createVertexArray();
    gl.bindVertexArray(fullScreenQuadVertexArray);

    //todo create point light sphere for optimze(then no need to use scissor optimize)?
    // var sphere = createSphere({
    //     radius: 100
    // });

    var fullScreenQuadData = _createFullScreenQuadData();


    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, fullScreenQuadData.positions, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, fullScreenQuadData.indices, gl.STATIC_DRAW);

    gl.bindVertexArray(null);

    DeferLightPassData.fullScreenQuadVertexArray = fullScreenQuadVertexArray;
    DeferLightPassData.fullScreenQuadIndicesCount = fullScreenQuadData.indices.length;

}

var _createFullScreenQuadData = () => {
    var positions = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]),
        indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    // var textures = new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]);

    return {
        positions:positions,
        indices: indices
    }
}
