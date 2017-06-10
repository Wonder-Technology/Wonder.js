import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { IMaterialConfig } from "../../data/material_config";
import {
    ISendAttributeConfig, ISendUniformConfig
} from "../../data/shaderLib_generator";
import {
    getAttribLocation, isAttributeLocationNotExist
} from "../location/LocationSystem";
import { RenderCommand } from "../../command/RenderCommand";
import { EVariableType } from "../../enum/EVariableType";
import { error, info, log } from "../../../utils/Log";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../../buffer/ArrayBufferSystem";
import { createMap, isValidMapValue } from "../../../utils/objectUtils";
import {
    getUniformData, sendBuffer, sendFloat1, sendMatrix4,
    sendVector3
} from "../glslSender/GLSLSenderSystem";
import { forEach } from "../../../utils/arrayUtils";
import { ProgramData } from "./ProgramData";
import { RenderCommandUniformData } from "../../command/RenderCommandBufferData";

export var use = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, ProgramData: any, LocationData:any, GLSLSenderData:any) => {
    it("program should exist", () => {
        expect(getProgram(shaderIndex, ProgramData)).exist;
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, ProgramData: any, LocationData:any, GLSLSenderData:any) => {
    var program = getProgram(shaderIndex, ProgramData);

    if (ProgramData.lastUsedProgram === program) {
        return;
    }

    ProgramData.lastUsedProgram = program;

    gl.useProgram(program);

    disableVertexAttribArray(gl, GLSLSenderData);

    ProgramData.lastBindedArrayBuffer = null;
    ProgramData.lastBindedIndexBuffer = null;
})

export var disableVertexAttribArray = requireCheckFunc((gl: WebGLRenderingContext, GLSLSenderData: any) => {
    it("vertexAttribHistory should has not hole", () => {
        forEach(GLSLSenderData.vertexAttribHistory, (isEnable: boolean) => {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
        })
    });
}, (gl: WebGLRenderingContext, GLSLSenderData: any) => {
    var vertexAttribHistory = GLSLSenderData.vertexAttribHistory;

    for (let i = 0, len = vertexAttribHistory.length; i < len; i++) {
        let isEnable = vertexAttribHistory[i];

        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }

        // vertexAttribHistory[i] = false;
        gl.disableVertexAttribArray(i);
    }

    GLSLSenderData.vertexAttribHistory = [];
})

export var getMaterialShaderLibConfig = requireCheckFunc((materialClassName: string, material_config: IMaterialConfig) => {
    var materialData = material_config[materialClassName];

    it("materialClassName should be defined", () => {
        expect(materialData).exist;
    })
    it("shaderLib should be array", () => {
        expect(materialData.shader.shaderLib).be.a("array");
    });
}, (materialClassName: string, material_config: IMaterialConfig) => {
    return material_config[materialClassName].shader.shaderLib;
})

export var registerProgram = (shaderIndex: number, ProgramData: any, program: WebGLProgram) => {
    ProgramData.programMap[shaderIndex] = program;
}

export var getProgram = ensureFunc((program: WebGLProgram) => {
}, (shaderIndex: number, ProgramData: any) => {
    return ProgramData.programMap[shaderIndex];
})

export var isProgramExist = (program: WebGLProgram) => isValidMapValue(program);

export var initShader = (program: WebGLProgram, vsSource: string, fsSource: string, gl: WebGLRenderingContext) => {
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

var _linkProgram = ensureFunc((returnVal, gl: WebGLRenderingContext, program: WebGLProgram) => {
    it(`link program error:${gl.getProgramInfoLog(program)}`, () => {
        expect(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
    })
}, (gl: WebGLRenderingContext, program: WebGLProgram) => {
    gl.linkProgram(program);
})

var _compileShader = (gl: WebGLRenderingContext, glslSource: string, shader: WebGLShader) => {
    gl.shaderSource(shader, glslSource);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    else {
        log(gl.getShaderInfoLog(shader));
        // Log.log("attributes:\n", this.attributes);
        // Log.log("uniforms:\n", this.uniforms);
        log("source:\n", glslSource);
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData:any, LocationData: any, GLSLSenderData:any, GeometryWorkerData: any, ArrayBufferData: any) => {
    var sendDataArr = GLSLSenderData.sendAttributeConfigMap[shaderIndex],
        attributeLocationMap = LocationData.attributeLocationMap[shaderIndex],
        lastBindedArrayBuffer = ProgramData.lastBindedArrayBuffer;

    for (let sendData of sendDataArr) {
        let buffer = getOrCreateArrayBuffer(gl, geometryIndex, sendData.buffer, GeometryWorkerData, ArrayBufferData),
            pos = getAttribLocation(sendData.name, attributeLocationMap);

        if (isAttributeLocationNotExist(pos)) {
            return;
        }

        if (lastBindedArrayBuffer === buffer) {
            return;
        }

        lastBindedArrayBuffer = buffer;

        sendBuffer(gl, pos, buffer, geometryIndex, GLSLSenderData, ArrayBufferData);
    }

    ProgramData.lastBindedArrayBuffer = lastBindedArrayBuffer;
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialWorkerData: any, ProgramData:any, LocationData: any, GLSLSenderData:any, renderCommandUniformData:RenderCommandUniformData) => {
    var sendDataArr = GLSLSenderData.sendUniformConfigMap[shaderIndex],
        uniformLocationMap = LocationData.uniformLocationMap[shaderIndex],
        uniformCacheMap = GLSLSenderData.uniformCacheMap;

    for (let sendData of sendDataArr) {
        let name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = getUniformData(field, from, renderCommandUniformData, MaterialWorkerData);

        switch (type) {
            case EVariableType.MAT4:
                sendMatrix4(gl, name, data, uniformLocationMap);
                break;
            case EVariableType.VEC3:
                sendVector3(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap);
                break;
            case EVariableType.FLOAT:
                sendFloat1(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap);
                break;
            default:
                error(true, info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    }
}

export var initData = (ProgramData: any) => {
    ProgramData.programMap = createMap();
}
