import {
    basic_materialColor_fragment, end_basic_fragment, common_define, common_fragment, common_function, common_vertex,
    GLSLChunk, modelMatrix_noInstance_vertex, normalMatrix_noInstance_vertex, light_common, lightEnd_fragment,
    light_setWorldPosition_vertex, light_vertex, lightCommon_vertex, lightCommon_fragment, noShadowMap_fragment,
    noDiffuseMap_fragment, noEmissionMap_fragment, noLightMap_fragment, noNormalMap_fragment, noNormalMap_vertex,
    noSpecularMap_fragment, noNormalMap_light_fragment, light_fragment,
    map_forBasic_vertex,
    map_forBasic_fragment
} from "../shader/chunk/ShaderChunk";
import { setPos_mvp } from "../shader/snippet/ShaderSnippet";
import { UniformCacheMap, UniformLocationMap } from "../type/dataType";

var _lightDefineList = [
    {
        "name": "DIRECTION_LIGHTS_COUNT",
        "valueFunc": ({
                          DirectionLightDataFromSystem
                      }) => {
            return DirectionLightDataFromSystem.count;
        }
    },
    {
        "name": "POINT_LIGHTS_COUNT",
        "valueFunc": ({
                          PointLightDataFromSystem
                      }) => {
            return PointLightDataFromSystem.count;
        }
    }
]

export const shaderLib_generator = {
    "shaderLibs": {
        "CommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": common_vertex,
                    "define": common_define.define + common_vertex.define,
                    "funcDefine": common_function.funcDefine + common_vertex.funcDefine
                },
                "fs": {
                    "source": common_fragment,
                    "define": common_define.define + common_fragment.define,
                    "funcDefine": common_function.funcDefine + common_fragment.funcDefine
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_vMatrix",
                        "field": "vMatrix",
                        "type": "mat4"
                    },
                    {
                        "name": "u_pMatrix",
                        "field": "pMatrix",
                        "type": "mat4"
                    }
                ]
            }
        },
        "ModelMatrixNoInstanceShaderLib": {
            "glsl": {
                "vs": {
                    "source": modelMatrix_noInstance_vertex,
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_mMatrix",
                        "field": "mMatrix",
                        "type": "mat4"
                    }
                ]
            }
        },
        "VerticeCommonShaderLib": {
            "send": {
                "attribute": [
                    {
                        "name": "a_position",
                        "buffer": "vertex",
                        "type": "vec3"
                    }
                ]
            }
        },




        "BasicMaterialColorShaderLib": {
            "glsl": {
                "fs": {
                    "source": basic_materialColor_fragment
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_color",
                        "from": "basicMaterial",
                        "field": "color",
                        "type": "float3"
                    }
                ]
            }
        },
        "BasicShaderLib": {
            "glsl": {
                "vs": {
                    "body": setPos_mvp
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_opacity",
                        "from": "basicMaterial",
                        "field": "opacity",
                        "type": "float"
                    }
                ]
            }
        },
        "BasicEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": end_basic_fragment
                },
                "func": (materialIndex: number, {
                    getAlphaTest,
                    isTestAlpha
                }, {
                    MaterialDataFromSystem
                }) => {
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);

                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": `if (gl_FragColor.a < ${alphaTest}){
    discard;
}\n` + end_basic_fragment.body
                            }
                        }
                    }

                    return void 0;
                }
            }
        },

        "BasicMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": map_forBasic_vertex
                },
                "fs": {
                    "source": map_forBasic_fragment
                }
            },
            "send": {
                "attribute": [
                    {
                        "name": "a_texCoord",
                        "buffer": "texCoord",
                        "type": "vec2"
                    }
                ],
                "uniformDefine": [
                    {
                        "name": "u_sampler2D0",
                        "type": "sampler2D"
                    }
                ]
            }
        },



        "NormalMatrixNoInstanceShaderLib": {
            "glsl": {
                "vs": {
                    "source": normalMatrix_noInstance_vertex
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_normalMatrix",
                        "field": "normalMatrix",
                        "type": "mat3"
                    }
                ]
            }
        },
        "NormalCommonShaderLib": {
            "send": {
                "attribute": [
                    {
                        "name": "a_normal",
                        "buffer": "normal",
                        "type": "vec3"
                    }
                ]
            }
        },
        "LightCommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": lightCommon_vertex,
                    "funcDeclare": light_common.funcDeclare,
                    "funcDefine": light_common.funcDefine
                },
                "fs": {
                    "source": lightCommon_fragment,
                    "funcDeclare": light_common.funcDeclare,
                    "funcDefine": light_common.funcDefine
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_specular",
                        "from": "lightMaterial",
                        "field": "specularColor",
                        "type": "float3"
                    }
                ]
            }
        },
        "LightSetWorldPositionShaderLib": {
            "glsl": {
                "vs": {
                    "source": light_setWorldPosition_vertex
                }
            }
        },
        "NoLightMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": noLightMap_fragment
                }
            }
        },
        "NoDiffuseMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": noDiffuseMap_fragment
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_diffuse",
                        "from": "lightMaterial",
                        "field": "color",
                        "type": "float3"
                    }
                ]
            }
        },
        "NoSpecularMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": noSpecularMap_fragment
                }
            }
        },
        "NoEmissionMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": noEmissionMap_fragment
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_emission",
                        "from": "lightMaterial",
                        "field": "emissionColor",
                        "type": "float3"
                    }
                ]
            }
        },
        "NoNormalMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": noNormalMap_vertex
                },
                "fs": {
                    "source": noNormalMap_fragment,
                    "varDeclare": noNormalMap_light_fragment.varDeclare,
                    "funcDefine": noNormalMap_fragment.funcDefine + noNormalMap_light_fragment.funcDefine
                }
            }
        },
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": noShadowMap_fragment
                }
            }
        },

        "LightShaderLib": {
            "glsl": {
                "vs": {
                    "source": light_vertex,
                    "defineList": _lightDefineList
                },
                "fs": {
                    "source": light_fragment,
                    "defineList": _lightDefineList
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_shininess",
                        "from": "lightMaterial",
                        "field": "shininess",
                        "type": "float"
                    },
                    {
                        "name": "u_opacity",
                        "from": "lightMaterial",
                        "field": "opacity",
                        "type": "float"
                    },
                    {
                        "name": "u_lightModel",
                        "from": "lightMaterial",
                        "field": "lightModel",
                        "type": "int"
                    },
                    {
                        "name": "u_cameraPos",
                        "from": "cmd",
                        "field": "cameraPosition",
                        "type": "float3"
                    }
                ]
            }
        },

        "AmbientLightShaderLib": {
            "glsl": {
                "fs": {
                    "varDeclare": "uniform vec3 u_ambient;"
                }
            },
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {
                    glslSenderData:{
                        sendFloat3
                    },
                    ambientLightData:{
                        getColorArr3,

                        AmbientLightDataFromSystem
                    }
                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
                    for (let i = 0, count = AmbientLightDataFromSystem.count; i < count; i++) {
                        sendFloat3(gl, shaderIndex, program, "u_ambient", getColorArr3(i, AmbientLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                    }
                }
            }
        },
        "PointLightShaderLib":{
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram,
                                {
                                    glslSenderData:{
                                        sendFloat1,
                                        sendFloat3
                                    },
                                    pointLightData:{
                                        getColorArr3,
                                        getIntensity,
                                        getConstant,
                                        getLinear,
                                        getQuadratic,
                                        getRange,
                                        getPosition,

                                        PointLightDataFromSystem
                                    }
                                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
                    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
                        sendFloat3(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].position, getPosition(i), uniformCacheMap, uniformLocationMap);
                        sendFloat3(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].color, getColorArr3(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].intensity, getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].constant, getConstant(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].linear, getLinear(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].quadratic, getQuadratic(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].range, getRange(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                    }
                }
            }
        },
        "DirectionLightShaderLib": {
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram,
                                {
                                    glslSenderData:{

                                        sendFloat1,
                                        sendFloat3
                                    },
                                    directionLightData:{
                                        getColorArr3,
                                        getIntensity,
                                        getPosition,

                                        DirectionLightDataFromSystem
                                    }
                                }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
                    for (let i = 0, count = DirectionLightDataFromSystem.count; i < count; i++) {
                        sendFloat3(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].position, getPosition(i), uniformCacheMap, uniformLocationMap);
                        sendFloat3(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].color, getColorArr3(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                        sendFloat1(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].intensity, getIntensity(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                    }
                }
            }
        },




        "LightEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": lightEnd_fragment
                },
                "func": (materialIndex: number, {
                    getAlphaTest,
                    isTestAlpha
                }, {
                             MaterialDataFromSystem
                         }) => {
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);

                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": `if (gl_FragColor.a < ${alphaTest}){
    discard;
}\n` + lightEnd_fragment.body
                            }
                        }
                    }

                    return void 0;
                }
            }
        },



        "EndShaderLib": {
        }
    }
}

export interface IShaderLibGenerator {
    shaderLibs: IShaderLibContentGenerator
}

export interface IShaderLibContentGenerator {
    [shaderLibName: string]: IShaderLibConfig
}


export interface IShaderLibConfig {
    glsl?: {
        vs?: IGLSLConfig,
        fs?: IGLSLConfig,
        func?: (materialIndex: number) => IGLSLFuncConfig | null
    },
    send?: IShaderLibSendConfig
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

    //todo support extension
    // extension?:string,
}

export interface IGLSLFuncConfig {
    vs?: IGLSLFuncGLSLConfig,
    fs?: IGLSLFuncGLSLConfig
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

export type UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";

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

