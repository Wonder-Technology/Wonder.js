import "wonder-frp/dist/es2015/extend/root";
import {getWebGLContext, initShaders} from "./lib/cuon-utils";
import {intervalRequest} from "wonder-frp/dist/es2015/global/Operator";
import flow from "lodash-es/flow";
import {Matrix4} from "../../../src/math/Matrix4";

var gl:WebGLRenderingContext = null,
    n = null;



var position:number = null;

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


var _startLoop = () => {
    intervalRequest()
        .subscribe((time) => {
            _loopBody(time);
        });
}

/*! side effect */
var _init = () => {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

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

/*! side effect */
var _updateAction = (time:number) => {
    position = _getNewPosition(time);
}


var _getNewPosition = (time:number) => {
    var delta = (time % 1000 - 500) / 1000;

    return delta;
}


/*! side effect */
var _update = flow(_updateAction);



var _render = (time:number) => {
    _sendData(gl);

    // Specify the color for clearing <canvas>
    gl.clearColor(0, 0, 0, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}


var a_Position, vertices, vertexBuffer;

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

var _sendUniformData = (u_ModelMatrix, gl) => {
    var modelMatrix = Matrix4.create();

    modelMatrix.setTranslate(position, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.values);
}


var _sendData = (gl:WebGLRenderingContext) => {
    _sendVertexData(a_Position, vertices, vertexBuffer, gl);
    _sendUniformData(u_ModelMatrix, gl);
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



var u_ModelMatrix;

var _initUniformBuffers = (gl) => {
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }
}


var _loopBody = flow(_update, _render);


export var start = flow(_init, _startLoop);

