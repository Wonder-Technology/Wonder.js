import { isConfigDataExist } from "../../../utils/renderConfigUtils";
import { main_begin, main_end } from "../../../shader/snippet/ShaderSnippet";
import { GLSLChunk, highp_fragment, lowp_fragment, mediump_fragment, version } from "../../../shader/chunk/ShaderChunk";
import { ExtendUtils } from "Wonder-CommonLib/dist/es2015/utils/ExtendUtils";
import { it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { compose, filterArray, forEachArray } from "../../../../utils/functionalUtils";
import { forEach } from "../../../../utils/arrayUtils";
import { BuildGLSLSourceFuncFuncDataMap } from "../../../type/dataType";
import { isString } from "../../../../utils/JudgeUtils";
import { InitShaderDataMap, InitShaderFuncDataMap } from "../../../type/utilsType";
import {
    IWebGL2DefineUniformConfig,
    IWebGL2GLSLConfig, IWebGL2GLSLDefineListItem, IWebGL2GLSLFuncConfig, IWebGL2SendAttributeConfig,
    IWebGL2SendUniformConfig,
    IWebGL2ShaderLibContentGenerator
} from "../../../worker/webgl2/both_file/data/shaderLib_generator";
import { IMaterialShaderLibGroup, IShaderLibItem, MaterialShaderLibConfig } from "../../../data/material_config";
import { getPrecisionSource } from "../../../utils/shader/shaderSourceBuildUtils";

export var buildGLSLSource = requireCheckFunc((materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData:IWebGL2ShaderLibContentGenerator, funcDataMap: BuildGLSLSourceFuncFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    it("shaderLib should be defined", () => {
        forEach(materialShaderLibNameArr, (shaderLibName: string) => {
            expect(shaderLibData[shaderLibName]).exist;
        })
    });
}, (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, funcDataMap: BuildGLSLSourceFuncFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var vsTop: string = "",
        vsDefine: string = "",
        vsVarDeclare: string = "",
        vsFuncDeclare: string = "",
        vsFuncDefine: string = "",
        vsBody: string = "",
        // vsDefineList:Array<IGLSLDefineListItem> = [],
        fsTop: string = "",
        fsDefine: string = "",
        fsVarDeclare: string = "",
        fsFuncDeclare: string = "",
        fsFuncDefine: string = "",
        fsBody: string = "";
    // fsDefineList:Array<IGLSLDefineListItem> = [];

    var _setVs = (getGLSLPartData: Function, getGLSLDefineListData: Function, vs: IWebGL2GLSLConfig) => {
        vsTop += getGLSLPartData(vs, "top");
        vsDefine += _buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
        vsBody += getGLSLPartData(vs, "body");
    },
        _setFs = (getGLSLPartData: Function, getGLSLDefineListData: Function, fs: IWebGL2GLSLConfig) => {
            fsTop += getGLSLPartData(fs, "top");
            fsDefine += _buildSourceDefine(getGLSLDefineListData(fs), initShaderDataMap) + getGLSLPartData(fs, "define");
            fsVarDeclare += getGLSLPartData(fs, "varDeclare");
            fsFuncDeclare += getGLSLPartData(fs, "funcDeclare");
            fsFuncDefine += getGLSLPartData(fs, "funcDefine");
            fsBody += getGLSLPartData(fs, "body");
        };

    vsBody += main_begin;
    fsBody += main_begin;

    vsTop += version.top;

    fsTop += version.top;
    fsTop += getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment, initShaderDataMap.GPUDetectDataFromSystem);

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var glslData = shaderLibData[shaderLibName].glsl,
            vs: IWebGL2GLSLConfig = null,
            fs: IWebGL2GLSLConfig = null,
            func: Function = null;

        if (!isConfigDataExist(glslData)) {
            return;
        }

        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;

        if (isConfigDataExist(vs)) {
            _setVs(_getGLSLPartData, _getGLSLDefineListData, vs);
        }

        if (isConfigDataExist(fs)) {
            _setFs(_getGLSLPartData, _getGLSLDefineListData, fs);
        }

        if (isConfigDataExist(func)) {
            let funcConfig: IWebGL2GLSLFuncConfig = func(materialIndex, funcDataMap, initShaderDataMap);

            if (isConfigDataExist(funcConfig)) {
                let vs = funcConfig.vs,
                    fs = funcConfig.fs;

                if (isConfigDataExist(vs)) {
                    vs = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs);

                    _setVs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, vs);
                }

                if (isConfigDataExist(fs)) {
                    fs = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs);

                    _setFs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, fs);
                }
            }
        }
    });

    vsBody += main_end;
    fsBody += main_end;

    //todo restore and separate(webgl1/webgl2)
    // vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);

    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    }
})

export var getMaterialShaderLibNameArr = (materialShaderLibConfig: MaterialShaderLibConfig, materialShaderLibGroup: IMaterialShaderLibGroup, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var nameArr: Array<string> = [];

    forEach(materialShaderLibConfig, (item: string | IShaderLibItem) => {
        if (isString(item)) {
            nameArr.push(item as string);
        }
        else {
            let i = item as IShaderLibItem;

            switch (i.type) {
                case "group":
                    nameArr = nameArr.concat(materialShaderLibGroup[i.value]);
                    break;
                case "branch":
                    let shaderLibName = _execBranch(i, materialIndex, initShaderFuncDataMap, initShaderDataMap);

                    if (_isShaderLibNameExist(shaderLibName)) {
                        nameArr.push(shaderLibName);
                    }
            }
        }
    });

    return nameArr;
}

var _execBranch = requireCheckFunc((i: IShaderLibItem, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    it("branch should exist", () => {
        expect(i.branch).exist;
    });
}, (i: IShaderLibItem, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return i.branch(materialIndex, initShaderFuncDataMap, initShaderDataMap);
})

var _isShaderLibNameExist = (name: string) => !!name;

var _getEmptyFuncGLSLConfig = () => {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": "",
        "defineList": []
    }
}

var _buildSourceDefine = (defineList: Array<IWebGL2GLSLDefineListItem>, initShaderDataMap: InitShaderDataMap) => {
    var result = "";

    for (let item of defineList) {
        if (item.valueFunc === void 0) {
            result += `#define ${item.name}\n`;
        }
        else {
            result += `#define ${item.name} ${item.valueFunc(initShaderDataMap)}\n`;
        }
    }

    return result;
}

var _getGLSLPartData = (glslConfig: IWebGL2GLSLConfig, partName: string) => {
    var partConfig = glslConfig[partName];

    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (isConfigDataExist(glslConfig.source)) {
        return glslConfig.source[partName];
    }

    return "";
}


var _getGLSLDefineListData = (glslConfig: IWebGL2GLSLConfig) => {
    var partConfig = glslConfig.defineList;

    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }

    return [];
}

var _getFuncGLSLPartData = (glslConfig: IWebGL2GLSLConfig, partName: string) => {
    return glslConfig[partName];
}

var _getFuncGLSLDefineListData = (glslConfig: IWebGL2GLSLConfig) => {
    return glslConfig.defineList;
}

var _isInSource = (key: string, source: string) => {
    return source.indexOf(key) > -1;
}

var _generateAttributeSource = (materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator) => {
    var result = "";

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            attributeData = null;

        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
            return;
        }

        attributeData = sendData.attribute;

        forEach(attributeData, (data: IWebGL2SendAttributeConfig) => {
            result += `attribute ${data.type} ${data.name};\n`;
        });
    });

    return result;
}

var _generateUniformSource = (materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, sourceVarDeclare: string, sourceFuncDefine: string, sourceBody: string) => {
    var result = "",
        generateFunc = compose(
            forEachArray(({ name, type }) => {
                result += `uniform ${_generateUniformSourceType(type)} ${name};\n`;
            }),
            filterArray(({ name }) => {
                return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
            })
        );

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            uniform: Array<IWebGL2SendUniformConfig> = null,
            uniformDefine: Array<IWebGL2DefineUniformConfig> = null;

        if (!isConfigDataExist(sendData)) {
            return;
        }

        uniform = sendData.uniform;
        uniformDefine = sendData.uniformDefine;

        if (isConfigDataExist(uniform)) {
            generateFunc(uniform);
        }

        if (isConfigDataExist(uniformDefine)) {
            generateFunc(uniformDefine);
        }
    });

    return result;
}

var _generateUniformSourceType = (type: string) => {
    var sourceType: string = null;

    switch (type) {
        case "float3":
            sourceType = "vec3";
            break;
        default:
            sourceType = type;
            break;
    }

    return sourceType;
}
