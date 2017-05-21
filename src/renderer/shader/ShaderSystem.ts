import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Shader } from "./Shader";
import { IMaterialConfig, MaterialShaderLibConfig } from "../data/material_config";
import forEach from "wonder-lodash/forEach";
import { IGLSLConfig, IShaderLibContentGenerator, IShaderLibGenerator } from "../data/shaderLib_generator";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { isValidMapValue } from "../../utils/objectUtils";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { Log } from "../../utils/Log";
import {
    AttributeLocationMap, SendAttributeConfig, SendAttributeConfigMap, SendUniformConfig, SendUniformConfigMap,
    UniformLocationMap
} from "./ShaderData";
import { hasDuplicateItems } from "../../utils/arrayUtils";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../buffer/ArrayBufferSystem";
import { getOrCreateBuffer as getOrCreateIndexBuffer } from "../buffer/IndexBufferSystem";
import { RenderCommand } from "../command/RenderCommand";
import { Matrix4 } from "../../math/Matrix4";
import { EVariableType } from "../enum/EVariableType";

//todo refactor: with Shader
export var create = (ShaderData: any) => {
    var shader = new Shader(),
        index = _generateIndex(ShaderData);

    shader.index = index;

    ShaderData.count += 1;

    return shader;
}

//todo extract
var _generateIndex = (ShaderData: any) => {
    return ShaderData.index++;
}

export var init = (state: Map<any, any>, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, ShaderData: any) => {
    var materialShaderLibConfig = _getMaterialShaderLibConfig(materialClassName, material_config),
        shaderLibData = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = _buildGLSLSource(materialShaderLibConfig, shaderLibData),
        program = _getProgram(shaderIndex, ShaderData),
        gl = getGL(state);

    if (!_isProgramExist(program)) {
        program = gl.createProgram();

        _registerProgram(shaderIndex, ShaderData, program);
    }

    _initShader(program, vsSource, fsSource, gl);

    _setAttributeLocationMap(gl, program, ShaderData.attributeLocationMap);
    _setUniformLocationMap(gl, program, ShaderData.uniformLocationMap);

    _addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendAttributeConfigMap);
    _addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendUniformConfigMap);
}

var _getMaterialShaderLibConfig = requireCheckFunc((materialClassName: string, material_config: IMaterialConfig) => {
    var materialData = material_config[materialClassName];

    it("materialClassName should be defined", () => {
        expect(materialData).exist;
    })
    it("shaderLib should be array", () => {
        expect(materialData.shader.shaderLib).be.a("array");
    });
}, (materialClassName: string, material_config: IMaterialConfig) => {
    return material_config.materials[materialClassName].shader.shaderLib;
})

var _setAttributeLocationMap = ensureFunc((returnVal, gl: WebGLRenderingContext, program: WebGLProgram, attributeLocationMap: AttributeLocationMap) => {
    it("attribute should contain position at least", () => {
        expect(attributeLocationMap.position).be.a("number");
    });
}, (gl: WebGLRenderingContext, program: WebGLProgram, attributeLocationMap: AttributeLocationMap) => {
    var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES),
        info: any = null,
        name: string = null;

    for (let i = 0; i < n; i++) {
        info = gl.getActiveAttrib(program, i);
        name = info.name;

        attributeLocationMap[name] = gl.getAttribLocation(program, name);
    }
})

var _setUniformLocationMap = ensureFunc((returnVal, gl: WebGLRenderingContext, program: WebGLProgram, uniformLocationMap: UniformLocationMap) => {
    it("uniform should contain position at least", () => {
        expect(uniformLocationMap.position).be.a("number");
    });
}, (gl: WebGLRenderingContext, program: WebGLProgram, uniformLocationMap: UniformLocationMap) => {
    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS),
        info: any = null,
        name: string = null;

    for (let i = 0; i < n; i++) {
        info = gl.getActiveUniform(program, i);
        name = info.name;

        uniformLocationMap[name] = gl.getUniformLocation(program, name);
    }
})

var _registerProgram = (shaderIndex: number, ShaderData: any, program: WebGLProgram) => {
    ShaderData.programMap[shaderIndex] = program;
}

var _getProgram = ensureFunc((program: WebGLProgram) => {
    it("program should exist", () => {
        expect(program).exist;
    });
}, (shaderIndex: number, ShaderData: any) => {
    return ShaderData.programMap[shaderIndex];
})

var _isProgramExist = (program: WebGLProgram) => isValidMapValue(program);

var _initShader = (program: WebGLProgram, vsSource: string, fsSource: string, gl: WebGLRenderingContext) => {
    var vs = _compileShader(gl, fsSource, gl.createShader(gl.VERTEX_SHADER)),
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
    it(`link program error ${gl.getProgramInfoLog(program)}`, () => {
        expect(gl.getProgramParameter(program, gl.LINK_STATUS)).false;
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

// var _initShaderLibs = (index:number, materialClassName:string, material_config) => {
//     var shaderConfig = _getShaderConfig(materialClassName, material_config);
//
//      shaderConfig.shaderLib
// }

var _buildGLSLSource = requireCheckFunc((materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    // var materialData = material_config.materials[materialClassName];

    it("shaderLib should be defined", () => {
        // var shaderLibData = shaderLib_generator.shaderLibs;

        forEach(materialShaderLibConfig, (shaderLibName: string) => {
            expect(shaderLibData[shaderLibName]).exist;
        })
    });
}, (materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    var vsTop: string = "",
        vsVarDeclare: string = "",
        vsFuncDeclare: string = "",
        vsFuncDefine: string = "",
        vsBody: string = "",
        fsTop: string = "",
        fsVarDeclare: string = "",
        fsFuncDeclare: string = "",
        fsFuncDefine: string = "",
        fsBody: string = "";


    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var glslData = shaderLibData[shaderLibName].glsl,
            vs = glslData.vs,
            fs = glslData.fs;

        vsTop += _getGLSLPartData(vs, "top");
        vsVarDeclare += _getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += _getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += _getGLSLPartData(vs, "funcDefine");
        vsBody += _getGLSLPartData(vs, "body");

        fsTop += _getGLSLPartData(fs, "top");
        fsVarDeclare += _getGLSLPartData(fs, "varDeclare");
        fsFuncDeclare += _getGLSLPartData(fs, "funcDeclare");
        fsFuncDefine += _getGLSLPartData(fs, "funcDefine");
        fsBody += _getGLSLPartData(fs, "body");
    })

    return {
        vsSource: vsTop + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    }
})

var _isGLSLPartConfigExist = (part: string) => isNotUndefined(part);

var _getGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    var partConfig = glslConfig[partName];

    if (_isGLSLPartConfigExist(partConfig)) {
        return partConfig;
    }

    return glslConfig.source[partName];
}

// var _buildShaderGLSLSource = (glslConfig:IGLSLConfig, top:string, varDeclare:string, funcDeclare:string, funcDefine:string, body:string) => {
//     top += glslConfig.top || "";
// }

var _addSendAttributeConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", () => {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    var sendDataArr: Array<SendAttributeConfig> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        sendDataArr = sendDataArr.concat(shaderLibData[shaderLibName].send.attribute);
    })

    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}))

var _addSendUniformConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendUniformConfigMap: SendUniformConfigMap) => {
    it("sendUniformConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendUniformConfigMap: SendUniformConfigMap) => {
    it("sendUniformConfigMap[shaderIndex] should not be defined", () => {
        expect(sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendUniformConfigMap: SendUniformConfigMap) => {
    var sendDataArr: Array<SendUniformConfig> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        sendDataArr = sendDataArr.concat(shaderLibData[shaderLibName].send.uniform);
    })

    sendUniformConfigMap[shaderIndex] = sendDataArr;
}))

// var _getShaderConfig = requireCheckFunc((materialClassName: string, material_config) => {
//     it("materialClassName should be defined in material_config", () => {
//         expect(material_config[materialClassName]).exist;
//     })
// }, (materialClassName: string, material_config) => {
//     return material_config[materialClassName].shader;
// })

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ShaderData: any, GeometryData: any, ArrayBufferData: any) => {
    var sendDataArr = ShaderData.sendAttributeConfigMap[shaderIndex],
        attributeLocationMap = ShaderData.attributeLocationMap,
        lastBindedArrayBuffer = ShaderData.lastBindedArrayBuffer;

    forEach(sendDataArr, (sendData: SendAttributeConfig) => {
        var buffer = getOrCreateArrayBuffer(gl, geometryIndex, sendData.buffer, GeometryData, ArrayBufferData),
            pos = _getAttribLocation(sendData.name, attributeLocationMap);

        if (_isAttributeLocationNotExist(pos)) {
            return;
        }

        if (lastBindedArrayBuffer === buffer) {
            return;
        }

        lastBindedArrayBuffer = buffer;

        _sendBuffer(gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData);
    })

    ShaderData.lastBindedArrayBuffer = lastBindedArrayBuffer;
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any, renderCommand:RenderCommand) => {
    var sendDataArr = ShaderData.sendUniformConfigMap[shaderIndex];

    forEach(sendDataArr, (sendData: SendUniformConfig) => {
        var name = sendData.name,
            field = sendData.field,
            type = sendData.type;

        switch (type) {
            case EVariableType.MAT4:
                _sendMatrix4(gl, name, renderCommand[field], ShaderData);
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    })
}

var _getAttribLocation = ensureFunc((pos: number, name: string, attributeLocationMap: AttributeLocationMap) => {
    it(`${name}'s attrib location should exist`, () => {
        expect(pos).be.a("number");
    });
}, (name: string, attributeLocationMap: AttributeLocationMap) => {
    return attributeLocationMap[name];
})

var _getUniformLocation = ensureFunc((pos: number, name: string, attributeLocationMap: UniformLocationMap) => {
    it(`${name}'s uniform location should exist`, () => {
        expect(pos).be.a("number");
    });
}, (name: string, uniformLocationMap: UniformLocationMap) => {
    return uniformLocationMap[name];
})

var _sendBuffer = (gl: WebGLRenderingContext, pos: number, buffer: WebGLBuffer, geometryIndex: number, ShaderData: any, ArrayBufferData: any) => {
    var {
            size,
            type
        } = ArrayBufferData.bufferDataMap[geometryIndex],
        vertexAttribHistory = ShaderData.vertexAttribHistory;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);

    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);

        vertexAttribHistory[pos] = true;
    }
}

var _sendMatrix4 = (gl:WebGLRenderingContext, name: string, data: Matrix4, ShaderData:any) => {
    _sendUniformData(gl, name, data, ShaderData, (pos, data) => {
        gl.uniformMatrix4fv(pos, false, data.values);
    })
}

var _sendUniformData = (gl:WebGLRenderingContext, name: string, data: Matrix4, ShaderData:any, sendFunc:(pos:WebGLUniformLocation, data:Float32Array) => void) => {
    var pos = _getUniformLocation(name, ShaderData.uniformLocationMap);

    if (_isUniformLocationNotExist(pos)) {
        return;
    }

    sendFunc(pos, data);
}

var _isUniformLocationNotExist = (pos:WebGLUniformLocation) => {
    return pos === null;
}

var _isAttributeLocationNotExist = (pos:number) => {
    return pos === -1;
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ShaderData: any, GeometryData: any, IndexBufferData: any) => {
    var buffer = getOrCreateIndexBuffer(gl, geometryIndex, GeometryData, IndexBufferData);

    if(ShaderData.lastBindedIndexBuffer === buffer){
        return;
    }

    ShaderData.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

// export var getProgram = (index:number, ShaderData:any) => {
//     return ShaderData.programMap[index];
// }


// export var use = (state: Map<any, any>, shaderIndex: number, ShaderData: any) => {
//
// }
export var use = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
    var program = _getProgram(shaderIndex, ShaderData);

    // if (JudgeUtils.isEqual(this, ProgramTable.lastUsedProgram)) {
    if (ShaderData.lastUsedProgram === program) {
        return;
    }

    ShaderData.lastUsedProgram = program;

    gl.useProgram(program);

    // this._sender.disableVertexAttribArray();
    disableVertexAttribArray(gl, ShaderData);

    //todo optimize
    // BufferTable.lastBindedArrayBufferListUidStr = null;
}

export var disableVertexAttribArray = requireCheckFunc((gl: WebGLRenderingContext, ShaderData: any) => {
    it("vertexAttribHistory should has not hole", () => {
        forEach(ShaderData.vertexAttribHistory, (isEnable: boolean) => {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
        })
    });
}, (gl: WebGLRenderingContext, ShaderData: any) => {
    var vertexAttribHistory = ShaderData.vertexAttribHistory;

    for (let i = 0, len = vertexAttribHistory.length; i < len; i++) {
        let isEnable = vertexAttribHistory[i];

        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }

        // vertexAttribHistory[i] = false;
        gl.disableVertexAttribArray(i);
    }

    ShaderData.vertexAttribHistory = [];
})

export var dispose = () => {
    //todo directly remove from map
}

export var initData = (ShaderData: any) => {
    ShaderData.index = 0;
    ShaderData.count = 0;

    ShaderData.programMap = {};
    ShaderData.attributeLocationMap = {};
    ShaderData.uniformLocationMap = {};
    ShaderData.sendAttributeConfigMap = {};
    ShaderData.sendUniformConfigMap = {};
    ShaderData.vertexAttribHistory = []
}
