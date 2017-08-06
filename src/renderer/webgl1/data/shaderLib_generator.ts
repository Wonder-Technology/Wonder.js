import {
    // basic_materialColor_fragment, end_basic_fragment,
    common_define, common_fragment, common_function, common_vertex,
    GLSLChunk, modelMatrix_noInstance_vertex, normalMatrix_noInstance_vertex,
    frontLight_common, frontLightEnd_fragment,
    frontLight_setWorldPosition_vertex, frontLight_vertex, frontLightCommon_vertex, frontLightCommon_fragment,
    webgl1_noShadowMap_fragment,
    webgl1_noDiffuseMap_fragment, webgl1_noEmissionMap_fragment, webgl1_noLightMap_fragment, webgl1_noNormalMap_fragment, webgl1_noNormalMap_vertex,
    webgl1_noSpecularMap_fragment,
    webgl1_noNormalMap_light_fragment,
    frontLight_fragment,
    // map_forBasic_vertex,
    // map_forBasic_fragment,
    webgl1_diffuseMap_vertex, webgl1_diffuseMap_fragment,
    webgl1_specularMap_vertex, webgl1_specularMap_fragment,
} from "../../shader/chunk/ShaderChunk";
import { setPos_mvp } from "../../shader/snippet/ShaderSnippet";
import { UniformCacheMap, UniformLocationMap } from "../../type/dataType";
import { set } from "../../../utils/typeArrayUtils";

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

export const webgl1_shaderLib_generator = {
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
//
//
//
//
//         //todo separate
//
//         // "CommonShaderLib": {
//         //     "glsl": {
//         //         "vs": {
//         //             "source": common_vertex,
//         //             "define": common_define.define + common_vertex.define,
//         //             // "funcDefine": common_function.funcDefine + common_vertex.funcDefine
//         //             "funcDefine": common_vertex.funcDefine,
//         //             "varDeclare": common_ubo.varDeclare
//         //         },
//         //         "fs": {
//         //             "source": common_fragment,
//         //             "define": common_define.define + common_fragment.define,
//         //             // "funcDefine": common_function.funcDefine + common_fragment.funcDefine
//         //             "funcDefine": common_fragment.funcDefine
//         //         }
//         //     },
//         //     "send": {
//         //         //todo build
//         //         "uniformUBO": [
//         //             {
//         //                 "name": "CameraData",
//         //                 // "createTypeArrayFunc": () => {
//         //                 //     return new Float32Array(16 * 3 + 3);
//         //                 // },
//         //                 "typeArray": {
//         //                     "type": "float32",
//         //                     "length": 16 * 3 + 3
//         //                 },
//         //                 "valueFunc": (gl, buffer, {
//         //                     bindBufferFunc,
//         //                     setBufferDataFunc
//         //                 }, {
//         //                                   typeArray,
//         //                                   vMatrix,
//         //                                   pMatrix,
//         //                                   vpMatrix,
//         //                                   cameraPosition
//         //                               }) => {
//         //                     // gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, buffer);
//         //                     bindBufferFunc(gl, 0, buffer);
//         //
//         //                     set(typeArray, vMatrix);
//         //                     set(typeArray, pMatrix, 16);
//         //                     set(typeArray, vpMatrix, 32);
//         //                     set(typeArray, cameraPosition, 48);
//         //
//         //                     setBufferDataFunc(gl, 0, typeArray);
//         //                     // // gl.bufferData(gl.UNIFORM_BUFFER, 128, gl.DYNAMIC_DRAW);
//         //                     // gl.bufferData(gl.UNIFORM_BUFFER, 128, gl.DYNAMIC_DRAW);
//         //                 },
//         //                 "frequence": "frame",
//         //                 "usage": "dynamic"
//         //             }
//         //         ]
//         //     }
//         // },
//         // "ModelMatrixNoInstanceShaderLib": {
//         //     "glsl": {
//         //         "vs": {
//         //             "source": modelMatrix_noInstance_vertex,
//         //         }
//         //     }
//         //     //todo set specific model ubo in specific material(basic, light)
//         //     // "send": {
//         //     //     "uniform": [
//         //     //         {
//         //     //             "name": "u_mMatrix",
//         //     //             "field": "mMatrix",
//         //     //             "type": "mat4"
//         //     //         }
//         //     //     ]
//         //     // }
//         // },
//         // "VerticeCommonShaderLib": {
//         //     "send": {
//         //         "attribute": [
//         //             {
//         //                 "name": "a_position",
//         //                 "buffer": "vertex",
//         //                 "type": "vec3",
//         //                 //todo set location
//         //                 "location": 0
//         //             }
//         //         ]
//         //     }
//         // },
//
//
//
//
//
//
//
//
//
//
//         "BasicMaterialColorShaderLib": {
//             "glsl": {
//                 "fs": {
//                     "source": basic_materialColor_fragment
//                 }
//             },
//             "send": {
//                 "uniform": [
//                     {
//                         "name": "u_color",
//                         "from": "basicMaterial",
//                         "field": "color",
//                         "type": "float3"
//                     }
//                 ]
//             }
//         },
//         "BasicShaderLib": {
//             "glsl": {
//                 "vs": {
//                     "body": setPos_mvp
//                 }
//             },
//             "send": {
//                 "uniform": [
//                     {
//                         "name": "u_opacity",
//                         "from": "basicMaterial",
//                         "field": "opacity",
//                         "type": "float"
//                     }
//                 ]
//             }
//         },
//         "BasicEndShaderLib": {
//             "glsl": {
//                 "fs": {
//                     "source": end_basic_fragment
//                 },
//                 "func": (materialIndex: number, {
//                     getAlphaTest,
//                     isTestAlpha
//                 }, {
//                     MaterialDataFromSystem
//                 }) => {
//                     var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
//
//                     if (isTestAlpha(alphaTest)) {
//                         return {
//                             "fs": {
//                                 "body": `if (gl_FragColor.a < ${alphaTest}){
//     discard;
// }\n` + end_basic_fragment.body
//                             }
//                         }
//                     }
//
//                     return void 0;
//                 }
//             }
//         },
//
//         "BasicMapShaderLib": {
//             "glsl": {
//                 "vs": {
//                     "source": map_forBasic_vertex
//                 },
//                 "fs": {
//                     "source": map_forBasic_fragment
//                 }
//             },
//             "send": {
//                 "attribute": [
//                     {
//                         "name": "a_texCoord",
//                         "buffer": "texCoord",
//                         "type": "vec2"
//                     }
//                 ],
//                 "uniformDefine": [
//                     {
//                         "name": "u_sampler2D0",
//                         "type": "sampler2D"
//                     }
//                 ]
//             }
//         },
//
//

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
                    "source": frontLightCommon_vertex,
                    "funcDeclare": frontLight_common.funcDeclare,
                    "funcDefine": frontLight_common.funcDefine
                },
                "fs": {
                    "source": frontLightCommon_fragment,
                    "funcDeclare": frontLight_common.funcDeclare,
                    "funcDefine": frontLight_common.funcDefine
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
                    "source": frontLight_setWorldPosition_vertex
                }
            }
        },

        "CommonLightMapShaderLib": {
            "send": {
                "attribute": [
                    {
                        "name": "a_texCoord",
                        "buffer": "texCoord",
                        "type": "vec2"
                    }
                ]
            }
        },


        "DiffuseMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": webgl1_diffuseMap_vertex
                },
                "fs": {
                    "source": webgl1_diffuseMap_fragment
                }
            },
            "send": {
                "uniformDefine": [
                    {
                        "name": "u_diffuseMapSampler",
                        "type": "sampler2D"
                    }
                ]
            }
        },
        "NoDiffuseMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl1_noDiffuseMap_fragment
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
        "SpecularMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": webgl1_specularMap_vertex
                },
                "fs": {
                    "source": webgl1_specularMap_fragment
                }
            },
            "send": {
                "uniformDefine": [
                    {
                        "name": "u_specularMapSampler",
                        "type": "sampler2D"
                    }
                ]
            }
        },
        "NoSpecularMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl1_noSpecularMap_fragment
                }
            }
        },
        "NoLightMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl1_noLightMap_fragment
                }
            }
        },
        "NoEmissionMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl1_noEmissionMap_fragment
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
                    "source": webgl1_noNormalMap_vertex
                },
                "fs": {
                    "source": webgl1_noNormalMap_fragment,
                    "varDeclare": webgl1_noNormalMap_light_fragment.varDeclare,
                    "funcDefine": webgl1_noNormalMap_fragment.funcDefine + webgl1_noNormalMap_light_fragment.funcDefine
                }
            }
        },
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl1_noShadowMap_fragment
                }
            }
        },

        "LightShaderLib": {
            "glsl": {
                "vs": {
                    "source": frontLight_vertex,
                    "defineList": _lightDefineList
                },
                "fs": {
                    "source": frontLight_fragment,
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
                    glslSenderData: {
                        sendFloat3
                    },
                    ambientLightData: {
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
        "PointLightShaderLib": {
            "send": {
                "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram,
                    {
                                    glslSenderData: {
                                        sendFloat1,
                        sendFloat3
                                    },
                        pointLightData: {
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
                                    glslSenderData: {

                                        sendFloat1,
                        sendFloat3
                                    },
                        directionLightData: {
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
                    "source": frontLightEnd_fragment
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
}\n` + frontLightEnd_fragment.body
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

export interface IWebGL1ShaderLibContentGenerator {
    [shaderLibName: string]: IWebGL1ShaderLibConfig
}

export interface IWebGL1ShaderLibConfig{
    glsl?: {
        vs?: IWebGL1GLSLConfig,
        fs?: IWebGL1GLSLConfig,
        func?: (materialIWebGL1ndex: number) => IWebGL1GLSLFuncConfig | null
    },
    send?: IWebGL1ShaderLibSendConfig
}

export interface IWebGL1GLSLConfig {
    source?: GLSLChunk;
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
    defineList?: Array<IWebGL1GLSLDefineListItem>;

    //todo support extension
    // extension?:string,
}

export interface IWebGL1GLSLFuncConfig {
    vs?: IWebGL1GLSLFuncGLSLConfig,
    fs?: IWebGL1GLSLFuncGLSLConfig
}

export interface IWebGL1GLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}

export interface IWebGL1GLSLDefineListItem {
    name: string;
    valueFunc?: Function;
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

export type WebGL1UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";

export interface IWebGL1DefineUniformConfig {
    name: string;
    type: WebGL1UniformType;
}

export interface IWebGL1SendUniformConfig {
    name: string;
    field: string;
    type: WebGL1UniformType;
    fieldType?: "structure";
    from?: "cmd" | "basicMaterial" | "lightMaterial" | "ambientLight" | "pointLight" | "directionLight";
}
