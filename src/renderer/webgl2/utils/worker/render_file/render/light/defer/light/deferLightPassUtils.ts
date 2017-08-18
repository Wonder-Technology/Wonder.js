import { bindVao, createVao, unbindVao } from "../../../../vao/vaoUtils";

export var init = (gl:any, DeferLightPassDataFromSystem:any) => {
    _setFullScreenQuadVaoData(gl, DeferLightPassDataFromSystem);
}

var _setFullScreenQuadVaoData = (gl:any, DeferLightPassDataFromSystem:any) => {
    //todo refactor: extract to VaoSystem
    var fullScreenQuadVertexArray = createVao(gl);

    bindVao(gl, fullScreenQuadVertexArray);

    //todo create point light sphere for optimize(then no need to use scissor optimize)?
    // var sphere = createSphere({
    //     radius: 100
    // });

    let fullScreenQuadData = _createFullScreenQuadData();

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, fullScreenQuadData.positions, gl.STATIC_DRAW);

    //todo refactor position(here is 0= layout(location=0))
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(0);



    let texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, fullScreenQuadData.texCoords, gl.STATIC_DRAW);

    //todo refactor position(here is 1= layout(location=1))
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(1);


    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, fullScreenQuadData.indices, gl.STATIC_DRAW);

    unbindVao(gl);

    DeferLightPassDataFromSystem.fullScreenQuadVertexArray = fullScreenQuadVertexArray;
    DeferLightPassDataFromSystem.fullScreenQuadIndicesCount = fullScreenQuadData.indices.length;
}

var _createFullScreenQuadData = () => {
    var positions = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]),
        indices = new Uint16Array([0, 1, 2, 0, 2, 3]),
        texCoords = new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]);

    return {
        positions:positions,
        texCoords: texCoords,
        indices: indices
    }
}
