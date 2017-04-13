(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fp = global.fp || {})));
}(this, (function (exports) { 'use strict';

	function initShaders(gl, vshader, fshader) {
	    var program = createProgram(gl, vshader, fshader);
	    if (!program) {
	        console.log('Failed to create program');
	        return false;
	    }
	    gl.useProgram(program);
	    gl.program = program;
	    return true;
	}
	function createProgram(gl, vshader, fshader) {
	    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
	    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
	    if (!vertexShader || !fragmentShader) {
	        return null;
	    }
	    var program = gl.createProgram();
	    if (!program) {
	        return null;
	    }
	    gl.attachShader(program, vertexShader);
	    gl.attachShader(program, fragmentShader);
	    gl.linkProgram(program);
	    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	    if (!linked) {
	        var error = gl.getProgramInfoLog(program);
	        console.log('Failed to link program: ' + error);
	        gl.deleteProgram(program);
	        gl.deleteShader(fragmentShader);
	        gl.deleteShader(vertexShader);
	        return null;
	    }
	    return program;
	}
	function loadShader(gl, type, source) {
	    var shader = gl.createShader(type);
	    if (shader == null) {
	        console.log('unable to create shader');
	        return null;
	    }
	    gl.shaderSource(shader, source);
	    gl.compileShader(shader);
	    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	    if (!compiled) {
	        var error = gl.getShaderInfoLog(shader);
	        console.log('Failed to compile shader: ' + error);
	        gl.deleteShader(shader);
	        return null;
	    }
	    return shader;
	}
	function getWebGLContext(canvas) {
	    var gl = setupWebGL(canvas);
	    if (!gl)
	        return null;
	    return gl;
	}
	var setupWebGL = function (canvas) {
	    if (canvas.addEventListener) {
	        canvas.addEventListener("webglcontextcreationerror", function (event) {
	            throw new Error(event.statusMessage);
	        }, false);
	    }
	    var context = create3DContext(canvas);
	    if (!context) {
	        throw new Error("error");
	    }
	    return context;
	};
	var create3DContext = function (canvas) {
	    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	    var context = null;
	    for (var ii = 0; ii < names.length; ++ii) {
	        try {
	            context = canvas.getContext(names[ii]);
	        }
	        catch (e) { }
	        if (context) {
	            break;
	        }
	    }
	    return context;
	};

	var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
	    'void main() {\n' +
	    '  gl_Position = a_Position;\n' +
	    '}\n';
	var FSHADER_SOURCE = 'void main() {\n' +
	    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	    '}\n';
	var main = function () {
	    var canvas = document.getElementById('webgl');
	    var gl = getWebGLContext(canvas);
	    if (!gl) {
	        console.log('Failed to get the rendering context for WebGL');
	        return;
	    }
	    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	        console.log('Failed to intialize shaders.');
	        return;
	    }
	    var n = initVertexBuffers(gl);
	    if (n < 0) {
	        console.log('Failed to set the positions of the vertices');
	        return;
	    }
	    gl.clearColor(0, 0, 0, 1);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	};
	function initVertexBuffers(gl) {
	    var vertices = new Float32Array([
	        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
	    ]);
	    var n = 4;
	    var vertexBuffer = gl.createBuffer();
	    if (!vertexBuffer) {
	        console.log('Failed to create the buffer object');
	        return -1;
	    }
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	    if (a_Position < 0) {
	        console.log('Failed to get the storage location of a_Position');
	        return -1;
	    }
	    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(a_Position);
	    return n;
	}

	exports.main = main;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=main.js.map
