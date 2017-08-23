import { GLSLChunk } from "../../../../shader/chunk/ShaderChunk";
import { IDefineUniformConfig, IGLSLConfig, IGLSLDefineListItem, ISendUniformConfig, IShaderLibContentGenerator } from "../../../../data/shaderLib_generator_interface";
export declare const webgl2_shaderLib_generator: {
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
            "send": {};
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
                    "location": number;
                }[];
            };
        };
        "CameraUboShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniformUbo": {
                    "name": string;
                    "typeArray": {
                        "type": string;
                        "length": number;
                    };
                    "setBufferDataFunc": (gl: any, {uniformBlockBinding, buffer, typeArray}: {
                        uniformBlockBinding: any;
                        buffer: any;
                        typeArray: any;
                    }, {bindUniformBufferBase, bufferDynamicData, set}: {
                        bindUniformBufferBase: any;
                        bufferDynamicData: any;
                        set: any;
                    }, {vMatrix, pMatrix, cameraPosition, normalMatrix}: {
                        vMatrix: any;
                        pMatrix: any;
                        cameraPosition: any;
                        normalMatrix: any;
                    }) => void;
                    "frequence": string;
                    "usage": string;
                }[];
            };
        };
        "LightUboShaderLib": {
            "glsl": {
                "fs": {
                    "varDeclare": string;
                };
            };
            "send": {
                "uniformUbo": {
                    "name": string;
                    "typeArray": {
                        "type": string;
                        "length": number;
                    };
                    "setBufferDataFunc": (gl: any, {uniformBlockBinding, buffer, typeArray}: {
                        uniformBlockBinding: any;
                        buffer: any;
                        typeArray: any;
                    }, {bindUniformBufferBase, bufferStaticData, set}: {
                        bindUniformBufferBase: any;
                        bufferStaticData: any;
                        set: any;
                    }, drawRenderCommandBufferDataMap: any, {render_config}: {
                        render_config: any;
                    }) => void;
                    "frequence": string;
                    "usage": string;
                }[];
            };
        };
        "AmbientLightUboShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniformUbo": {
                    "name": string;
                    "typeArray": {
                        "type": string;
                        "length": number;
                    };
                    "setBufferDataFunc": (gl: any, ambientLightIndex: any, {uniformBlockBinding, buffer, typeArray}: {
                        uniformBlockBinding: any;
                        buffer: any;
                        typeArray: any;
                    }, {bindUniformBufferBase, bufferDynamicData, set}: {
                        bindUniformBufferBase: any;
                        bufferDynamicData: any;
                        set: any;
                    }, {cleanColorDirty, AmbientLightDataFromSystem}: {
                        cleanColorDirty: any;
                        AmbientLightDataFromSystem: any;
                    }, {colorArr3, isColorDirty}: {
                        colorArr3: any;
                        isColorDirty: any;
                    }) => void;
                    "frequence": string;
                    "usage": string;
                }[];
            };
        };
        "DirectionLightUboShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniformUbo": {
                    "name": string;
                    "typeArray": {
                        "type": string;
                        "length": number;
                    };
                    "setBufferDataFunc": (gl: any, directionLightIndex: any, {uniformBlockBinding, buffer, typeArray}: {
                        uniformBlockBinding: any;
                        buffer: any;
                        typeArray: any;
                    }, {bindUniformBufferBase, bufferDynamicData, set}: {
                        bindUniformBufferBase: any;
                        bufferDynamicData: any;
                        set: any;
                    }, {cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, DirectionLightDataFromSystem}: {
                        cleanPositionDirty: any;
                        cleanColorDirty: any;
                        cleanIntensityDirty: any;
                        DirectionLightDataFromSystem: any;
                    }, {position, colorArr3, intensity, isPositionDirty, isColorDirty, isIntensityDirty}: {
                        position: any;
                        colorArr3: any;
                        intensity: any;
                        isPositionDirty: any;
                        isColorDirty: any;
                        isIntensityDirty: any;
                    }) => void;
                    "frequence": string;
                    "usage": string;
                }[];
            };
        };
        "PointLightUboShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniformUbo": {
                    "name": string;
                    "typeArray": {
                        "type": string;
                        "length": number;
                    };
                    "setBufferDataFunc": (gl: any, pointLightIndex: any, {uniformBlockBinding, buffer, typeArray}: {
                        uniformBlockBinding: any;
                        buffer: any;
                        typeArray: any;
                    }, {bindUniformBufferBase, bufferDynamicData, set}: {
                        bindUniformBufferBase: any;
                        bufferDynamicData: any;
                        set: any;
                    }, {cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty, PointLightDataFromSystem}: {
                        cleanPositionDirty: any;
                        cleanColorDirty: any;
                        cleanIntensityDirty: any;
                        cleanAttenuationDirty: any;
                        PointLightDataFromSystem: any;
                    }, {position, colorArr3, intensity, constant, linear, quadratic, radius, isIntensityDirty, isOtherValueDirty}: {
                        position: any;
                        colorArr3: any;
                        intensity: any;
                        constant: any;
                        linear: any;
                        quadratic: any;
                        radius: any;
                        isIntensityDirty: any;
                        isOtherValueDirty: any;
                    }) => void;
                    "frequence": string;
                    "usage": string;
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
                    "varDeclare": string;
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
                    "location": number;
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
            "send": {};
        };
        "NormalCommonShaderLib": {
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                    "location": number;
                }[];
            };
        };
        "GBufferCommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "GBufferSetWorldPositionShaderLib": {
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
                    "location": number;
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
        "GBufferNoNormalMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "GBufferShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
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
        "GBufferEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferLightPassCommonShaderLib": {
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
        };
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferLightPassShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                    "location": number;
                }[];
                "uniformDefine": {
                    "name": string;
                    "type": string;
                }[];
            };
        };
        "DeferLightPassEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferAmbientLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {};
        };
        "DeferDirectionLightPointLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferDirectionLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferDirectionLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferDirectionLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {};
        };
        "DeferPointLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferPointLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
        "DeferPointLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {};
        };
        "EndShaderLib": {};
    };
};
export interface IWebGL2ShaderLibContentGenerator extends IShaderLibContentGenerator {
    [shaderLibName: string]: IWebGL2ShaderLibConfig;
}
export interface IWebGL2ShaderLibConfig {
    glsl?: {
        vs?: IWebGL2GLSLConfig;
        fs?: IWebGL2GLSLConfig;
        func?: (materialIWebGL2ndex: number) => IWebGL2GLSLFuncConfig | null;
    };
    send?: IWebGL2ShaderLibSendConfig;
}
export interface IWebGL2GLSLConfig extends IGLSLConfig {
}
export interface IWebGL2GLSLFuncConfig {
    vs?: IWebGL2GLSLFuncGLSLConfig;
    fs?: IWebGL2GLSLFuncGLSLConfig;
}
export interface IWebGL2GLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}
export interface IWebGL2GLSLDefineListItem extends IGLSLDefineListItem {
    name: string;
    valueFunc?: Function;
}
export interface IWebGL2ShaderLibSendConfig {
    attribute?: Array<IWebGL2SendAttributeConfig>;
    uniform?: Array<IWebGL2SendUniformConfig>;
    uniformDefine?: Array<IWebGL2DefineUniformConfig>;
    uniformFunc?: Function;
    uniformUbo?: Array<IWebGL2UboConfig>;
}
export interface IWebGL2SendAttributeConfig {
    name: string;
    buffer: "vertex" | "normal" | "texCoord";
    type: "vec2" | "vec3";
    location: number;
}
export declare type WebGL2UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";
export interface IWebGL2DefineUniformConfig extends IDefineUniformConfig {
    name: string;
    type: WebGL2UniformType;
}
export interface IWebGL2SendUniformConfig extends ISendUniformConfig {
    name: string;
    field: string;
    type: WebGL2UniformType;
    fieldType?: "structure";
    from?: "cmd" | "basicMaterial" | "lightMaterial" | "ambientLight" | "pointLight" | "directionLight";
}
export interface IWebGL2UboConfig {
    name: string;
    typeArray: IWebGL2UboTypeArrayConfig;
    frequence: "one" | "frame" | "pointLight" | "directionLight";
    usage: "static" | "dynamic";
    setBufferDataFunc: Function;
}
export interface IWebGL2UboTypeArrayConfig {
    type: string;
    length: number;
}
