import { bindVAO } from "../../vao/vaoUtils";

export var init = (gl:any, DeferLightPassDataFromSystem:any) => {
    _setFullScreenQuadVAOData(gl, DeferLightPassDataFromSystem);
}

export var sendAttributeData = (gl:any, DeferLightPassDataFromSystem:any) => {
    bindVAO(gl, DeferLightPassDataFromSystem.fullScreenQuadVertexArray);
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

var _setFullScreenQuadVAOData = (gl:any, DeferLightPassDataFromSystem:any) => {
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

    //todo refactor position(here is 0= layout(location=0))
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(0);



    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, fullScreenQuadData.texCoords, gl.STATIC_DRAW);

    //todo refactor position(here is 1= layout(location=1))
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(1);







    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, fullScreenQuadData.indices, gl.STATIC_DRAW);

    gl.bindVertexArray(null);

    DeferLightPassDataFromSystem.fullScreenQuadVertexArray = fullScreenQuadVertexArray;
    DeferLightPassDataFromSystem.fullScreenQuadIndicesCount = fullScreenQuadData.indices.length;

    // DeferLightPassDataFromSystem.fullScreenQuadPositionBuffer = positionBuffer;
    // DeferLightPassDataFromSystem.fullScreenQuadIndexBuffer = indexBuffer;
}

var _createFullScreenQuadData = () => {
    var positions = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]),
        // var positions = new Float32Array([-1, 1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0]),
        indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    var texCoords = new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]);

    return {
        positions:positions,
        texCoords: texCoords,
        indices: indices
    }
}
