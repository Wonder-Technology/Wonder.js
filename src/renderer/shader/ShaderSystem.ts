import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Shader } from "./Shader";
import { IMaterialConfig, MaterialShaderLibConfig } from "../data/material_config";
import forEach from "wonder-lodash/forEach";
import {
    IGLSLConfig, IGLSLFuncConfig, ISendAttributeConfig, ISendUniformConfig, IShaderLibContentGenerator,
    IShaderLibGenerator, IShaderLibSendConfig
} from "../data/shaderLib_generator";
import { deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { error, Log } from "../../utils/Log";
import {
    AttributeLocationMap, SendAttributeConfigMap, SendUniformConfigMap, UniformCacheMap,
    UniformLocationMap, UniformShaderLocationMap
} from "./ShaderData";
import { hasDuplicateItems } from "../../utils/arrayUtils";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../buffer/ArrayBufferSystem";
import { getOrCreateBuffer as getOrCreateIndexBuffer } from "../buffer/IndexBufferSystem";
import { RenderCommand } from "../command/RenderCommand";
import { Matrix4 } from "../../math/Matrix4";
import { EVariableType } from "../enum/EVariableType";
import { main_begin, main_end } from "./snippet/ShaderSnippet";
import { GLSLChunk, highp_fragment, lowp_fragment, mediump_fragment } from "./chunk/ShaderChunk";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { EGPUPrecision, GPUDetector } from "../../device/GPUDetector";
import { getColor, getOpacity } from "../../component/renderComponent/material/MaterialSystem";
import { Vector3 } from "../../math/Vector3";
import { compose, filterArray, forEachArray } from "../../utils/functionalUtils";

//todo refactor: with Shader
export var create = (ShaderData: any) => {
    var shader = new Shader(),
        index = _generateIndex(ShaderData);

    shader.index = index;

    ShaderData.count += 1;

    ShaderData.uniformCacheMap[index] = {};

    return shader;
}

//todo extract
var _generateIndex = (ShaderData: any) => {
    return ShaderData.index++;
}

export var init = (state: Map<any, any>, materialIndex:number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, ShaderData: any) => {
    var materialShaderLibConfig = _getMaterialShaderLibConfig(materialClassName, material_config),
        shaderLibData = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = _buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData),
        program = _getProgram(shaderIndex, ShaderData),
        gl = getGL(state);

    if (!_isProgramExist(program)) {
        program = gl.createProgram();

        _registerProgram(shaderIndex, ShaderData, program);
    }

    _initShader(program, vsSource, fsSource, gl);

    _setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData);

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
    return material_config[materialClassName].shader.shaderLib;
})

var _setLocationMap = ensureFunc((returnVal, gl: WebGLRenderingContext, shaderIndex:number, program: WebGLProgram, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, ShaderData:any) => {
    it("attribute should contain position at least", () => {
        expect(ShaderData.attributeLocationMap[shaderIndex]["a_position"]).be.a("number");
    });
}, requireCheckFunc ((gl: WebGLRenderingContext, shaderIndex:number, program: WebGLProgram,materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, ShaderData:any) => {
    it("not setted location before", () => {
        expect(isValidMapValue(ShaderData.attributeLocationMap[shaderIndex])).false;
        expect(isValidMapValue(ShaderData.uniformLocationMap[shaderIndex])).false;
    });
}, (gl: WebGLRenderingContext, shaderIndex:number, program: WebGLProgram,materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, ShaderData:any) => {
    var attributeLocationMap = {},
        uniformLocationMap = {},
        sendData:IShaderLibSendConfig = null,
        attributeName:string = null,
        uniformName:string = null;

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        sendData = shaderLibData[shaderLibName].send;

        if(!_isConfigDataExist(sendData)){
            return;
        }

        forEach(sendData.attribute, (data:ISendAttributeConfig) => {
            attributeName = data.name;

            attributeLocationMap[attributeName] = gl.getAttribLocation(program, attributeName);
        })

        forEach(sendData.uniform, (data:ISendUniformConfig) => {
            uniformName = data.name;

            uniformLocationMap[uniformName] = gl.getUniformLocation(program, uniformName);
        })
    })

    ShaderData.attributeLocationMap[shaderIndex] = attributeLocationMap;
    ShaderData.uniformLocationMap[shaderIndex] = uniformLocationMap;
}))

var _registerProgram = (shaderIndex: number, ShaderData: any, program: WebGLProgram) => {
    ShaderData.programMap[shaderIndex] = program;
}

var _getProgram = ensureFunc((program: WebGLProgram) => {
    // it("program should exist", () => {
    //     expect(program).exist;
    // });
}, (shaderIndex: number, ShaderData: any) => {
    return ShaderData.programMap[shaderIndex];
})

var _isProgramExist = (program: WebGLProgram) => isValidMapValue(program);

var _initShader = (program: WebGLProgram, vsSource: string, fsSource: string, gl: WebGLRenderingContext) => {
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

var _buildGLSLSource = requireCheckFunc((materialIndex:number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    // var materialData = material_config.materials[materialClassName];

    it("shaderLib should be defined", () => {
        // var shaderLibData = shaderLib_generator.shaderLibs;

        forEach(materialShaderLibConfig, (shaderLibName: string) => {
            expect(shaderLibData[shaderLibName]).exist;
        })
    });
}, (materialIndex:number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    var vsTop: string = "",
        vsDefine: string = "",
        vsVarDeclare: string = "",
        vsFuncDeclare: string = "",
        vsFuncDefine: string = "",
        vsBody: string = "",
        fsTop: string = "",
        fsDefine: string = "",
        fsVarDeclare: string = "",
        fsFuncDeclare: string = "",
        fsFuncDefine: string = "",
        fsBody: string = "";

    vsBody += main_begin;
    fsBody += main_begin;

    fsTop += _getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment);

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var glslData = shaderLibData[shaderLibName].glsl,
            vs = null,
            fs = null,
            func = null;

        if(!_isConfigDataExist(glslData)){
            return;
        }

        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;

        if(_isConfigDataExist(vs)){
            vsTop += _getGLSLPartData(vs, "top");
            vsDefine += _getGLSLPartData(vs, "define");
            vsVarDeclare += _getGLSLPartData(vs, "varDeclare");
            vsFuncDeclare += _getGLSLPartData(vs, "funcDeclare");
            vsFuncDefine += _getGLSLPartData(vs, "funcDefine");
            vsBody += _getGLSLPartData(vs, "body");
        }

        if(_isConfigDataExist(fs)){
            fsTop += _getGLSLPartData(fs, "top");
            fsDefine += _getGLSLPartData(fs, "define");
            fsVarDeclare += _getGLSLPartData(fs, "varDeclare");
            fsFuncDeclare += _getGLSLPartData(fs, "funcDeclare");
            fsFuncDefine += _getGLSLPartData(fs, "funcDefine");
            fsBody += _getGLSLPartData(fs, "body");
        }

        if(_isConfigDataExist(func)){
            let funcConfig:IGLSLFuncConfig = func(materialIndex);

            if(_isConfigDataExist(funcConfig)){
                let vs = funcConfig.vs,
                    fs = funcConfig.fs;

                if(_isConfigDataExist(vs)){
                    vs = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs);

                    vsTop += _getFuncGLSLPartData(vs, "top");
                    vsDefine += _getFuncGLSLPartData(vs, "define");
                    vsVarDeclare += _getFuncGLSLPartData(vs, "varDeclare");
                    vsFuncDeclare += _getFuncGLSLPartData(vs, "funcDeclare");
                    vsFuncDefine += _getFuncGLSLPartData(vs, "funcDefine");
                    vsBody += _getFuncGLSLPartData(vs, "body");
                }

                if(_isConfigDataExist(fs)){
                    fs = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs);

                    fsTop += _getFuncGLSLPartData(fs, "top");
                    fsDefine += _getFuncGLSLPartData(fs, "define");
                    fsVarDeclare += _getFuncGLSLPartData(fs, "varDeclare");
                    fsFuncDeclare += _getFuncGLSLPartData(fs, "funcDeclare");
                    fsFuncDefine += _getFuncGLSLPartData(fs, "funcDefine");
                    fsBody += _getFuncGLSLPartData(fs, "body");
                }
            }
        }
    })

    vsBody += main_end;
    fsBody += main_end;

    vsTop += _generateAttributeSource(materialShaderLibConfig, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);

    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    }
})

var _generateAttributeSource = (materialShaderLibConfig:MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    var result = "";

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            attributeData = null;

        if (!_isConfigDataExist(sendData) || !_isConfigDataExist(sendData.attribute)) {
            return;
        }

        attributeData = sendData.attribute;

        forEach(attributeData, (data: ISendAttributeConfig) => {
            result += `attribute ${data.type} ${data.name};\n`;
        });
    });

    return result;
}

var _generateUniformSource = (materialShaderLibConfig:MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sourceVarDeclare: string, sourceFuncDefine: string, sourceBody: string) => {
    var result = "",
        generateFunc = compose(
            forEachArray((data: ISendAttributeConfig) => {
                result += `uniform ${data.type} ${data.name};\n`;
            }),
            filterArray((data: ISendAttributeConfig) => {
                var name = data.name;

                return _isInSource(name, sourceVarDeclare) || _isInSource(name,sourceFuncDefine) || _isInSource(name, sourceBody);
            })
        );

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            uniformData = null;

        if (!_isConfigDataExist(sendData) || !_isConfigDataExist(sendData.uniform)) {
            return;
        }

        uniformData = sendData.uniform;

        generateFunc(uniformData);
    });

    return result;
}

var _isInSource = (key: string, source: string) => {
    return source.indexOf(key) > -1;
}

var _isConfigDataExist = (configData:any) => {
    return isValidMapValue(configData);
}

var _getEmptyFuncGLSLConfig = () => {
    return {
        "top":"",
        "varDeclare":"",
        "funcDeclare":"",
        "funcDefine":"",
        "body":""
    }
}

var _getPrecisionSource = (lowp_fragment:GLSLChunk, mediump_fragment:GLSLChunk, highp_fragment:GLSLChunk) => {
    var precision = GPUDetector.getInstance().precision,
        result = null;

    switch (precision) {
        case EGPUPrecision.HIGHP:
            result = highp_fragment.top;
            break;
        case EGPUPrecision.MEDIUMP:
            result = mediump_fragment.top;
            break;
        case EGPUPrecision.LOWP:
            result = lowp_fragment.top;
            break;
        default:
            result = "";
            break;
    }

    return result;
}

var _getGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    var partConfig = glslConfig[partName];

    if (_isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if(_isConfigDataExist(glslConfig.source)){
        return glslConfig.source[partName];
    }

    return "";
}

var _getFuncGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    return glslConfig[partName];
}

var _addSendAttributeConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", () => {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    var sendDataArr: Array<ISendAttributeConfig> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if(_isConfigDataExist(sendData) && _isConfigDataExist(sendData.attribute)){
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
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
    var sendDataArr: Array<ISendUniformConfig> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if(_isConfigDataExist(sendData) && _isConfigDataExist(sendData.uniform)){
            sendDataArr = sendDataArr.concat(sendData.uniform);
        }
    })

    sendUniformConfigMap[shaderIndex] = sendDataArr;
}))

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ShaderData: any, GeometryData: any, ArrayBufferData: any) => {
    var sendDataArr = ShaderData.sendAttributeConfigMap[shaderIndex],
        attributeLocationMap = ShaderData.attributeLocationMap[shaderIndex],
        lastBindedArrayBuffer = ShaderData.lastBindedArrayBuffer;

    forEach(sendDataArr, (sendData: ISendAttributeConfig) => {
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

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialData:any, ShaderData: any, renderCommand:RenderCommand) => {
    var sendDataArr = ShaderData.sendUniformConfigMap[shaderIndex],
        uniformLocationMap = ShaderData.uniformLocationMap[shaderIndex],
        uniformCacheMap = ShaderData.uniformCacheMap;

    forEach(sendDataArr, (sendData: ISendUniformConfig) => {
        var name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = _getUniformData(field, from , renderCommand, MaterialData);

        switch (type) {
            case EVariableType.MAT4:
                _sendMatrix4(gl, name, data, uniformLocationMap);
                break;
            case EVariableType.VEC3:
                _sendVector3(gl, shaderIndex, name ,data, uniformCacheMap, uniformLocationMap);
                break;
            case EVariableType.FLOAT:
                _sendFloat1(gl, shaderIndex, name ,data, uniformCacheMap, uniformLocationMap);
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    })
}

var _getUniformData = (field:string, from:string, renderCommand:RenderCommand, MaterialData:any) => {
    var data:any = null;

    switch (from){
        case "cmd":
            data = renderCommand[field];
            break;
        case "material":
            data = _getUnifromDataFromMaterial(field, renderCommand.materialIndex, MaterialData);
            break;
        default:
            error(true, `unknow from:${from}`);
            break;
    }

    return data;
}

var _getUnifromDataFromMaterial = (field:string, materialIndex:number, MaterialData:any) => {
    var data:any = null;

    switch (field){
        case "color":
           data = getColor(materialIndex, MaterialData).toVector3();
           break;
        case "opacity":
            data = getOpacity(materialIndex, MaterialData);
            break;
        default:
            error(true, `unknow field:${field}`);
            break;
    }

    return data;
}

var _getAttribLocation = ensureFunc((pos: number, name: string, attributeLocationMap: AttributeLocationMap) => {
    it(`${name}'s attrib location should be number`, () => {
        expect(pos).be.a("number");
    });
}, (name: string, attributeLocationMap: AttributeLocationMap) => {
    return attributeLocationMap[name];
})

var _getUniformLocation = ensureFunc((pos: number, name: string, uniformLocationMap: UniformLocationMap) => {
    it(`${name}'s uniform location should exist in map`, () => {
        expect(isValidMapValue(pos)).true;
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

var _sendMatrix4 = (gl:WebGLRenderingContext, name: string, data: Matrix4, uniformLocationMap:UniformShaderLocationMap) => {
    _sendUniformData<Matrix4>(gl, name, data, uniformLocationMap, (pos, data) => {
        gl.uniformMatrix4fv(pos, false, data.values);
    })
}

var _sendVector3 = (gl:WebGLRenderingContext, shaderIndex:number, name: string, data: Vector3, uniformCacheMap:UniformCacheMap, uniformLocationMap:UniformShaderLocationMap) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData && recordedData.x == data.x && recordedData.y == data.y && recordedData.z == data.z) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<Vector3>(gl, name, data, uniformLocationMap, (pos, data) => {
        gl.uniform3f(pos, data.x, data.y, data.z);
    })
}

var _sendFloat1 = requireCheckFunc ((gl:WebGLRenderingContext, shaderIndex:number, name: string, data: number, uniformCacheMap:UniformCacheMap, uniformLocationMap:UniformShaderLocationMap) => {
    it("data should be number", () => {
        expect(data).be.a("number");
    });
}, (gl:WebGLRenderingContext, shaderIndex:number, name: string, data: number, uniformCacheMap:UniformCacheMap, uniformLocationMap:UniformShaderLocationMap) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData === data) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<number>(gl, name, data, uniformLocationMap, (pos, data) => {
        gl.uniform1f(pos, data);
    })
})

var _getUniformCache = (shaderIndex:number, name:string, uniformCacheMap:UniformCacheMap) => {
    return uniformCacheMap[shaderIndex][name];
}

var _setUniformCache = (shaderIndex:number, name:string, data:any, uniformCacheMap:UniformCacheMap) => {
    uniformCacheMap[shaderIndex][name] = data;
}

var _sendUniformData = <T>(gl:WebGLRenderingContext, name: string, data: T, uniformLocationMap:UniformShaderLocationMap, sendFunc:(pos:WebGLUniformLocation, data:T) => void) => {
    var pos = _getUniformLocation(name, uniformLocationMap);

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

export var use = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
    it("program should exist", () => {
        expect(_getProgram(shaderIndex, ShaderData)).exist;
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
    var program = _getProgram(shaderIndex, ShaderData);

    if (ShaderData.lastUsedProgram === program) {
        return;
    }

    ShaderData.lastUsedProgram = program;

    gl.useProgram(program);

    disableVertexAttribArray(gl, ShaderData);

    ShaderData.lastBindedArrayBuffer = null;
    ShaderData.lastBindedIndexBuffer = null;
})

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

export var dispose = (gl: WebGLRenderingContext, shaderIndex:number, ShaderData: any) => {
    //todo finish

    // _disposeProgram(gl, ShaderData.programMap[shaderIndex]);
    // deleteVal(shaderIndex, ShaderData.programMap);


    // deleteVal(shaderIndex, ShaderData.attributeLocationMap);
    // deleteVal(shaderIndex, ShaderData.uniformLocationMap);
    // deleteVal(shaderIndex, ShaderData.sendAttributeConfigMap);
    // deleteVal(shaderIndex, ShaderData.sendUniformConfigMap);
    // deleteVal(shaderIndex, ShaderData.vertexAttribHistory);
    // deleteVal(shaderIndex, ShaderData.shaderMap);
}

// var _disposeProgram = (gl:WebGLRenderingContext, program:WebGLProgram) => {
//     gl.deleteProgram(this.glProgram);
// }

export var initData = (ShaderData: any) => {
    ShaderData.index = 0;
    ShaderData.count = 0;

    ShaderData.programMap = {};
    ShaderData.attributeLocationMap = {};
    ShaderData.uniformLocationMap = {};
    ShaderData.sendAttributeConfigMap = {};
    ShaderData.sendUniformConfigMap = {};
    ShaderData.vertexAttribHistory = [];
    ShaderData.uniformCacheMap = {};
    ShaderData.shaderMap = {};
    ShaderData.isInitMap = {};
}
