import "wonder-frp/dist/es2015/stream/FilterStream";
import "wonder-frp/dist/es2015/stream/MapStream";
import "wonder-frp/dist/es2015/extend/root";
import { getWebGLContext, initShaders } from "./lib/cuon-utils";
import { intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
import flow from "lodash-es/flow";
import { Matrix4 } from "../../../src/math/Matrix4";
var gl = null, n = null;
var gameLoop = null;
var position = null;
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '}\n';
var FSHADER_SOURCE = 'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';
var _startLoop = function () {
    gameLoop = intervalRequest()
        .subscribe(function (time) {
        _loopBody(time);
    });
};
var _init = function () {
    var canvas = document.getElementById('webgl');
    gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    n = _initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    _initUniformBuffers(gl);
};
var _updateAction = function (time) {
    position = _getNewPosition(time);
};
var _getNewPosition = function (time) {
    var delta = (time % 1000 - 500) / 1000;
    return delta;
};
var _beginRecord = function (time) {
    recordData.beginTime = time;
};
var _stopRecord = function (time) {
    recordData.endTime = time;
    stop();
};
var RecordData = (function () {
    function RecordData() {
    }
    RecordData.create = function () {
        var obj = new this();
        return obj;
    };
    return RecordData;
}());
var recordData = RecordData.create();
var isBeginRecord = false, isEndRecord = false;
var _record = function (time) {
    if (isBeginRecord) {
        isBeginRecord = false;
        _beginRecord(time);
    }
    if (isEndRecord) {
        isEndRecord = false;
        _stopRecord(time);
    }
    return time;
};
var _update = flow(_record, _updateAction);
var _render = function (time) {
    _sendData(gl);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
};
var a_Position, vertices, vertexBuffer;
var _sendVertexData = function (a_Position, vertices, vertexBuffer, gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
};
var _sendUniformData = function (u_ModelMatrix, gl) {
    var modelMatrix = Matrix4.create();
    modelMatrix.setTranslate(position, 0, 0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.values);
};
var _sendData = function (gl) {
    _sendVertexData(a_Position, vertices, vertexBuffer, gl);
    _sendUniformData(u_ModelMatrix, gl);
};
var _initVertexBuffers = function (gl) {
    vertices = new Float32Array([
        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
    ]);
    var n = 4;
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    return n;
};
var u_ModelMatrix;
var _initUniformBuffers = function (gl) {
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }
};
var _loopBody = flow(_update, _render);
export var start = flow(_init, _startLoop);
export var beginRecord = function (time) {
    isBeginRecord = true;
    isEndRecord = false;
};
export var endRecord = function (time) {
    isBeginRecord = false;
    isEndRecord = true;
};
export var stop = function () {
    gameLoop.dispose();
};
export var rePlay = function () {
    var startTime = null;
    gameLoop = intervalRequest()
        .map(function (time) {
        if (startTime === null) {
            startTime = time;
        }
        return time - (startTime - recordData.beginTime);
    })
        .filter(function (time) {
        return time <= recordData.endTime;
    })
        .subscribe(function (time) {
        _loopBody(time);
    });
};
//# sourceMappingURL=main.js.map