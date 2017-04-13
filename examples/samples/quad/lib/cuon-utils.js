export function initShaders(gl, vshader, fshader) {
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
export function getWebGLContext(canvas) {
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
//# sourceMappingURL=cuon-utils.js.map