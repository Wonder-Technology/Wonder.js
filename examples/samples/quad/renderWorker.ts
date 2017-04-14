import {getWebGLContext, initShaders} from "./lib/cuon-utils";
import {Matrix4} from "../../../src/math/Matrix4";



onmessage = function (e) {
    if (e.data.rAF) {
        _render(e.data.renderData);
    }
    else if (e.data.canvas) {
        _init(e.data.canvas);
    }
};


var a_Position, vertices, vertexBuffer;
var u_ModelMatrix;
var gl;
var n;




var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';





var _init = (canvas) => {
// Get the rendering context for WebGL
    gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

// Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Write the positions of vertices to a vertex shader
    n = _initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    _initUniformBuffers(gl);
}





var _initVertexBuffers = (gl) => {
    vertices = new Float32Array([
        -0.5, 0.5,   -0.5, -0.5,   0.5, 0.5,　0.5, -0.5
    ]);
    var n = 4; // The number of vertices

    // Create a buffer object
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    return n;
}




var _initUniformBuffers = (gl) => {
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }
}








var _render = ({position}) => {
    _sendData(gl, position);

    // Specify the color for clearing <canvas>
    gl.clearColor(0, 0, 0, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);



    gl.commit(); // new for webgl in workers
}




var _sendVertexData = (a_Position, vertices, vertexBuffer, gl) => {
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
}

var _sendUniformData = (position, u_ModelMatrix, gl) => {
    var modelMatrix = Matrix4.create();

    modelMatrix.setTranslate(position, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.values);
}


var _sendData = (gl:WebGLRenderingContext, position) => {
    _sendVertexData(a_Position, vertices, vertexBuffer, gl);
    _sendUniformData(position, u_ModelMatrix, gl);
}




