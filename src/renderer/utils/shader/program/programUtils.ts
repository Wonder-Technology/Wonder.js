import { isValidMapValue } from "../../../../utils/objectUtils";
import { ensureFunc, it } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Log } from "../../../../utils/Log";

export const registerProgram = (shaderIndex: number, ProgramDataFromSystem: any, program: WebGLProgram) => {
    ProgramDataFromSystem.programMap[shaderIndex] = program;
}

export const isProgramExist = (program: WebGLProgram) => isValidMapValue(program);

export const initShader = (program: WebGLProgram, vsSource: string, fsSource: string, gl: WebGLRenderingContext) => {
    var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER)),
        fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));

    //dispose?
    // if (this.glProgram) {
    //     this.dispose();
    // }


    gl.attachShader(program, vs);
    gl.attachShader(program, fs);


    /*!
     if warn:"Attribute 0 is disabled. This has significant performance penalty" when run,
     then do this before linkProgram:
     gl.bindAttribLocation( this.glProgram, 0, "a_position");



     can reference here:
     http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


     OpenGL requires attribute zero to be enabled otherwise it will not render anything.
     On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
     attach it to attribute zero, and enable it.

     It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
     if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

     require your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.
     */
    /*!
     Always have vertex attrib 0 array enabled. If you draw with vertex attrib 0 array disabled, you will force the browser to do complicated emulation when running on desktop OpenGL (e.g. on Mac OSX). This is because in desktop OpenGL, nothing gets drawn if vertex attrib 0 is not array-enabled. You can use bindAttribLocation() to force a vertex attribute to use location 0, and use enableVertexAttribArray() to make it array-enabled.
     */
    gl.bindAttribLocation(program, 0, "a_position");


    _linkProgram(gl, program);

    /*!
     should detach and delete shaders after linking the program

     explain:
     The shader object, due to being attached to the program object, will continue to exist even if you delete the shader object. It will only be deleted by the system when it is no longer attached to any program object (and when the user has asked to delete it, of course).

     "Deleting" the shader, as with all OpenGL objects, merely sets a flag that says you don't need it any more. OpenGL will keep it around for as long as it needs it itself, and will do the actual delete any time later (most likely, but not necessarily, after the program is deleted).
     */
    gl.deleteShader(vs);
    gl.deleteShader(fs);
}

const _linkProgram = ensureFunc((returnVal, gl: WebGLRenderingContext, program: WebGLProgram) => {
    it(`link program error:${gl.getProgramInfoLog(program)}`, () => {
        expect(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
    })
}, (gl: WebGLRenderingContext, program: WebGLProgram) => {
    gl.linkProgram(program);
})

const _compileShader = (gl: WebGLRenderingContext, glslSource: string, shader: WebGLShader) => {
    gl.shaderSource(shader, glslSource);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    else {
        Log.log(gl.getShaderInfoLog(shader));
        // Log.log("attributes:\n", this.attributes);
        // Log.log("uniforms:\n", this.uniforms);
        Log.log("source:\n", glslSource);
    }
}
