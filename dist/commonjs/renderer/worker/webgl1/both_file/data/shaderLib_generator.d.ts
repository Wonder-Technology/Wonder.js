import { GLSLChunk } from "../../../../shader/chunk/ShaderChunk";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { IDefineUniformConfig, IGLSLConfig, IGLSLDefineListItem, ISendUniformConfig, IShaderLibContentGenerator } from "../../../../data/shaderLib_generator_interface";
export declare const webgl1_shaderLib_generator: {
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
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {glslSenderData: {sendFloat3}, ambientLightData: {getColorArr3, isColorDirty, cleanColorDirty, AmbientLightDataFromSystem}}: {
                    glslSenderData: {
                        sendFloat3: any;
                    };
                    ambientLightData: {
                        getColorArr3: any;
                        isColorDirty: any;
                        cleanColorDirty: any;
                        AmbientLightDataFromSystem: any;
                    };
                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
            };
        };
        "PointLightShaderLib": {
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {glslSenderData: {sendFloat1, sendFloat3}, pointLightData: {getColorArr3, getIntensity, getConstant, getLinear, getQuadratic, getRange, getPosition, isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty, PointLightDataFromSystem}}: {
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
                        isPositionDirty: any;
                        isColorDirty: any;
                        isIntensityDirty: any;
                        isAttenuationDirty: any;
                        cleanPositionDirty: any;
                        cleanColorDirty: any;
                        cleanIntensityDirty: any;
                        cleanAttenuationDirty: any;
                        PointLightDataFromSystem: any;
                    };
                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
            };
        };
        "DirectionLightShaderLib": {
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {glslSenderData: {sendFloat1, sendFloat3}, directionLightData: {getColorArr3, getIntensity, getPosition, isPositionDirty, isColorDirty, isIntensityDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, DirectionLightDataFromSystem}}: {
                    glslSenderData: {
                        sendFloat1: any;
                        sendFloat3: any;
                    };
                    directionLightData: {
                        getColorArr3: any;
                        getIntensity: any;
                        getPosition: any;
                        isPositionDirty: any;
                        isColorDirty: any;
                        isIntensityDirty: any;
                        cleanPositionDirty: any;
                        cleanColorDirty: any;
                        cleanIntensityDirty: any;
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
export interface IWebGL1ShaderLibContentGenerator extends IShaderLibContentGenerator {
    [shaderLibName: string]: IWebGL1ShaderLibConfig;
}
export interface IWebGL1ShaderLibConfig {
    glsl?: {
        vs?: IWebGL1GLSLConfig;
        fs?: IWebGL1GLSLConfig;
        func?: (materialIWebGL1ndex: number) => IWebGL1GLSLFuncConfig | null;
    };
    send?: IWebGL1ShaderLibSendConfig;
}
export interface IWebGL1GLSLConfig extends IGLSLConfig {
}
export interface IWebGL1GLSLFuncConfig {
    vs?: IWebGL1GLSLFuncGLSLConfig;
    fs?: IWebGL1GLSLFuncGLSLConfig;
}
export interface IWebGL1GLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}
export interface IWebGL1GLSLDefineListItem extends IGLSLDefineListItem {
}
export interface IWebGL1ShaderLibSendConfig {
    attribute?: Array<IWebGL1SendAttributeConfig>;
    uniform?: Array<IWebGL1SendUniformConfig>;
    uniformDefine?: Array<IWebGL1DefineUniformConfig>;
    uniformFunc?: Function;
}
export interface IWebGL1SendAttributeConfig {
    name: string;
    buffer: "vertex" | "normal" | "texCoord";
    type: "vec2" | "vec3";
}
export declare type WebGL1UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";
export interface IWebGL1DefineUniformConfig extends IDefineUniformConfig {
    name: string;
    type: WebGL1UniformType;
}
export interface IWebGL1SendUniformConfig extends ISendUniformConfig {
    name: string;
    field: string;
    type: WebGL1UniformType;
    fieldType?: "structure";
    from?: "cmd" | "basicMaterial" | "lightMaterial" | "ambientLight" | "pointLight" | "directionLight";
}
