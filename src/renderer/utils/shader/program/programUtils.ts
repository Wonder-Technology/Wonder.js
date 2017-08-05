import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../../data/material_config";
import { EVariableType } from "../../../enum/EVariableType";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../../buffer/arrayBufferUtils";
import { createMap, isValidMapValue } from "../../../../utils/objectUtils";
import { forEach } from "../../../../utils/arrayUtils";
import { RenderCommandUniformData, UniformCacheMap, UniformLocationMap } from "../../../type/dataType";
import { Log } from "../../../../utils/Log";
import { DrawDataMap, SendUniformDataDataMap, SendUniformDataGLSLSenderDataMap } from "../../../type/utilsType";
import { GetArrayBufferDataFuncMap } from "../../../../definition/type/geometryType";
import { isNotUndefined } from "../../../../utils/JudgeUtils";
import { sendData } from "../../texture/mapManagerUtils";

export var use = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    it("program should exist", () => {
        expect(getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    var program = getProgram(shaderIndex, ProgramDataFromSystem);

    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return program;
    }

    ProgramDataFromSystem.lastUsedProgram = program;

    gl.useProgram(program);

    disableVertexAttribArray(gl, GLSLSenderDataFromSystem);

    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;

    return program;
})

export var disableVertexAttribArray = requireCheckFunc((gl: WebGLRenderingContext, GLSLSenderDataFromSystem: any) => {
    it("vertexAttribHistory should has not hole", () => {
        forEach(GLSLSenderDataFromSystem.vertexAttribHistory, (isEnable: boolean) => {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
        })
    });
}, (gl: WebGLRenderingContext, GLSLSenderDataFromSystem: any) => {
    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;

    for (let i = 0, len = vertexAttribHistory.length; i < len; i++) {
        let isEnable = vertexAttribHistory[i];

        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }

        // vertexAttribHistory[i] = false;
        gl.disableVertexAttribArray(i);
    }

    GLSLSenderDataFromSystem.vertexAttribHistory = [];
})

export var registerProgram = (shaderIndex: number, ProgramDataFromSystem: any, program: WebGLProgram) => {
    ProgramDataFromSystem.programMap[shaderIndex] = program;
}

export var getProgram = ensureFunc((program: WebGLProgram) => {
}, (shaderIndex: number, ProgramDataFromSystem: any) => {
    return ProgramDataFromSystem.programMap[shaderIndex];
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
        Log.log(gl.getShaderInfoLog(shader));
        // Log.log("attributes:\n", this.attributes);
        // Log.log("uniforms:\n", this.uniforms);
        Log.log("source:\n", glslSource);
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex],
        attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex],
        lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;

    for (let sendData of sendDataArr) {
        let bufferName = sendData.buffer,
            buffer = _getOrCreateArrayBuffer(gl, geometryIndex, bufferName, getArrayBufferDataFuncMap, GeometryDataFromSystem, ArrayBufferDataFromSystem),
            pos: number = null;

        if (lastBindedArrayBuffer === buffer) {
            continue;
        }

        pos = getAttribLocation(gl, program, sendData.name, attributeLocationMap);

        if (isAttributeLocationNotExist(pos)) {
            continue;
        }

        lastBindedArrayBuffer = buffer;

        sendBuffer(gl, sendData.type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferDataFromSystem);
    }

    ProgramDataFromSystem.lastBindedArrayBuffer = lastBindedArrayBuffer;
}

var _getOrCreateArrayBuffer = (gl: WebGLRenderingContext, geometryIndex: number, bufferName: string, {
    getVertices,
    getNormals,
    getTexCoords
}, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var buffer: WebGLBuffer = null;

    switch (bufferName) {
        case "vertex":
            buffer = getOrCreateArrayBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffer, getVertices, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "normal":
            buffer = getOrCreateArrayBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "texCoord":
            buffer = getOrCreateArrayBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID(`bufferName:${bufferName}`));
            break;
    }

    return buffer;
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData, sendDataMap:SendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, drawDataMap, uniformLocationMap, uniformCacheMap, renderCommandUniformData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);

    //todo refactor in front render
    //todo move out(and move mapCount out)
    // sendData(gl, mapCount, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, drawDataMap.TextureDataFromSystem, drawDataMap.MapManagerDataFromSystem);
}

var _sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, {
                            MaterialDataFromSystem,
    BasicMaterialDataFromSystem,
    LightMaterialDataFromSystem,
                        }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, renderCommandUniformData: RenderCommandUniformData) => {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformDataArr.length; i < len; i++) {
        let sendData = sendUniformDataArr[i],
            name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = glslSenderData.getUniformData(field, from, renderCommandUniformData, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem);

        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
}

export var directlySendUniformData = (gl: WebGLRenderingContext, name: string, shaderIndex: number, program: WebGLProgram, type: EVariableType, data: any, {
    // getUniformData,
    sendMatrix3,
    sendMatrix4,
    sendVector3,
    sendInt,
    sendFloat1,
    sendFloat3,
    // GLSLSenderDataFromSystem,
}, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    switch (type) {
        case EVariableType.MAT3:
            sendMatrix3(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.MAT4:
            sendMatrix4(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.VEC3:
            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.INT:
        case EVariableType.SAMPLER_2D:
            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT:
            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT3:
            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
            break;
    }
}

var _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: SendUniformDataDataMap, drawDataMap: DrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}

export var initData = (ProgramDataFromSystem: any) => {
    ProgramDataFromSystem.programMap = createMap();
}
