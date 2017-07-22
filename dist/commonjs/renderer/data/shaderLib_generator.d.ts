import { GLSLChunk } from "../shader/chunk/ShaderChunk";
import { UniformCacheMap, UniformLocationMap } from "../type/dataType";
export declare const shaderLib_generator: {
    "shaderLibs": {
        "CommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                    "define": string;
                    "funcDefine": string;
                };
                "fs": {
                    "source": GLSLChunk;
                    "define": string;
                    "funcDefine": string;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "ModelMatrixNoInstanceShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "VerticeCommonShaderLib": {
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                }[];
            };
        };
        "BasicMaterialColorShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "BasicShaderLib": {
            "glsl": {
                "vs": {
                    "body": string;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "BasicEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
                "func": (materialIndex: number, {getAlphaTest, isTestAlpha}: {
                    getAlphaTest: any;
                    isTestAlpha: any;
                }, {MaterialDataFromSystem}: {
                    MaterialDataFromSystem: any;
                }) => {
                    "fs": {
                        "body": string;
                    };
                };
            };
        };
        "BasicMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                }[];
                "uniformDefine": {
                    "name": string;
                    "type": string;
                }[];
            };
        };
        "NormalMatrixNoInstanceShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "NormalCommonShaderLib": {
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                }[];
            };
        };
        "LightCommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                    "funcDeclare": string;
                    "funcDefine": string;
                };
                "fs": {
                    "source": GLSLChunk;
                    "funcDeclare": string;
                    "funcDefine": string;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "LightSetWorldPositionShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
            };
        };
        "CommonLightMapShaderLib": {
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                }[];
            };
        };
        "DiffuseMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniformDefine": {
                    "name": string;
                    "type": string;
                }[];
            };
        };
        "NoDiffuseMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "SpecularMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniformDefine": {
                    "name": string;
                    "type": string;
                }[];
            };
        };
        "NoSpecularMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "NoLightMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "NoEmissionMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "NoNormalMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                    "varDeclare": string;
                    "funcDefine": string;
                };
            };
        };
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "LightShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                    "defineList": ({
                        "name": string;
                        "valueFunc": ({DirectionLightDataFromSystem}: {
                            DirectionLightDataFromSystem: any;
                        }) => any;
                    } | {
                        "name": string;
                        "valueFunc": ({PointLightDataFromSystem}: {
                            PointLightDataFromSystem: any;
                        }) => any;
                    })[];
                };
                "fs": {
                    "source": GLSLChunk;
                    "defineList": ({
                        "name": string;
                        "valueFunc": ({DirectionLightDataFromSystem}: {
                            DirectionLightDataFromSystem: any;
                        }) => any;
                    } | {
                        "name": string;
                        "valueFunc": ({PointLightDataFromSystem}: {
                            PointLightDataFromSystem: any;
                        }) => any;
                    })[];
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "AmbientLightShaderLib": {
            "glsl": {
                "fs": {
                    "varDeclare": string;
                };
            };
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {glslSenderData: {sendFloat3}, ambientLightData: {getColorArr3, AmbientLightDataFromSystem}}: {
                    glslSenderData: {
                        sendFloat3: any;
                    };
                    ambientLightData: {
                        getColorArr3: any;
                        AmbientLightDataFromSystem: any;
                    };
                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
            };
        };
        "PointLightShaderLib": {
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {glslSenderData: {sendFloat1, sendFloat3}, pointLightData: {getColorArr3, getIntensity, getConstant, getLinear, getQuadratic, getRange, getPosition, PointLightDataFromSystem}}: {
                    glslSenderData: {
                        sendFloat1: any;
                        sendFloat3: any;
                    };
                    pointLightData: {
                        getColorArr3: any;
                        getIntensity: any;
                        getConstant: any;
                        getLinear: any;
                        getQuadratic: any;
                        getRange: any;
                        getPosition: any;
                        PointLightDataFromSystem: any;
                    };
                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
            };
        };
        "DirectionLightShaderLib": {
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {glslSenderData: {sendFloat1, sendFloat3}, directionLightData: {getColorArr3, getIntensity, getPosition, DirectionLightDataFromSystem}}: {
                    glslSenderData: {
                        sendFloat1: any;
                        sendFloat3: any;
                    };
                    directionLightData: {
                        getColorArr3: any;
                        getIntensity: any;
                        getPosition: any;
                        DirectionLightDataFromSystem: any;
                    };
                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
            };
        };
        "LightEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
                "func": (materialIndex: number, {getAlphaTest, isTestAlpha}: {
                    getAlphaTest: any;
                    isTestAlpha: any;
                }, {MaterialDataFromSystem}: {
                    MaterialDataFromSystem: any;
                }) => {
                    "fs": {
                        "body": string;
                    };
                };
            };
        };
        "EndShaderLib": {};
    };
};
export interface IShaderLibGenerator {
    shaderLibs: IShaderLibContentGenerator;
}
export interface IShaderLibContentGenerator {
    [shaderLibName: string]: IShaderLibConfig;
}
export interface IShaderLibConfig {
    glsl?: {
        vs?: IGLSLConfig;
        fs?: IGLSLConfig;
        func?: (materialIndex: number) => IGLSLFuncConfig | null;
    };
    send?: IShaderLibSendConfig;
}
export interface IGLSLConfig {
    source?: GLSLChunk;
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
    defineList?: Array<IGLSLDefineListItem>;
}
export interface IGLSLFuncConfig {
    vs?: IGLSLFuncGLSLConfig;
    fs?: IGLSLFuncGLSLConfig;
}
export interface IGLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}
export interface IGLSLDefineListItem {
    name: string;
    valueFunc?: Function;
}
export interface IShaderLibSendConfig {
    attribute?: Array<ISendAttributeConfig>;
    uniform?: Array<ISendUniformConfig>;
    uniformDefine?: Array<IDefineUniformConfig>;
    uniformFunc?: Function;
}
export interface ISendAttributeConfig {
    name: string;
    buffer: "vertex" | "normal" | "texCoord";
    type: "vec2" | "vec3";
}
export declare type UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";
export interface IDefineUniformConfig {
    name: string;
    type: UniformType;
}
export interface ISendUniformConfig {
    name: string;
    field: string;
    type: UniformType;
    fieldType?: "structure";
    from?: "cmd" | "basicMaterial" | "lightMaterial" | "ambientLight" | "pointLight" | "directionLight";
}
