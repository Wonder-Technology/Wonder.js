import {
    basic_materialColor_fragment, end_basic_fragment, common_define, common_fragment, common_function, common_vertex,
    GLSLChunk, modelMatrix_noInstance_vertex, normalMatrix_noInstance_vertex, light_common, lightEnd_fragment,
    light_setWorldPosition_vertex, light_vertex, lightCommon_vertex, lightCommon_fragment, noShadowMap_fragment,
    noDiffuseMap_fragment, noEmissionMap_fragment, noLightMap_fragment, noNormalMap_fragment, noNormalMap_vertex,
    noSpecularMap_fragment, noNormalMap_light_fragment, light_fragment
} from "../shader/chunk/ShaderChunk";
import { setPos_mvp } from "../shader/snippet/ShaderSnippet";
import { AmbientLightRenderData, DirectionLightRenderData } from "../../component/light/type";
import { getPosition, getRenderData } from "../../component/light/DirectionLightSystem";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { UniformCacheMap, UniformLocationMap } from "../type/dataType";

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
                        "buffer": "vertice",
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
                        "type": "vec3"
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
        "EndBasicShaderLib": {
            "glsl": {
                "fs": {
                    "source": end_basic_fragment
                },
                "func": (materialIndex: number, {
                    getAlphaTest,
                    isTestAlpha
                }, {
                    BasicMaterialDataFromSystem
                }) => {
                    var alphaTest = getAlphaTest(materialIndex, BasicMaterialDataFromSystem);

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
                        "type": "mat4"
                    }
                ]
            }
        },
        "NormalCommonShaderLib": {
            "send": {
                "attribute": [
                    {
                        //todo support
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
                        "type": "vec3"
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
                        "type": "vec3"
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
                        "type": "vec3"
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

        "LightShaderLib":{
            "glsl": {
                "vs": {
                    "source": light_vertex
                },
                "fs": {
                    "source": light_fragment
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
                        "type": "num"
                    },
                    {
                        "name": "u_cameraPos",
                        "from": "cmd",
                        "field": "cameraPosition",
                        "type": "vec3"
                    }
                ]
            }
        },

        "AmbientLightShaderLib":{
            "send": {
                "uniformFunc": (gl:WebGLRenderingContext, shaderIndex:number,
                                {
                                    sendVector3
                                },
                                {
                                    AmbientLightDataFromSystem
                                }, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
                    for (let i = 0, count = AmbientLightDataFromSystem.count; i < count; i++){
                        //todo use utils method!
                        let renderData:AmbientLightRenderData = getRenderData(i, AmbientLightDataFromSystem);

                        sendVector3(gl, shaderIndex, "u_ambient", renderData.colorArr, uniformLocationMap, uniformCacheMap);
                    }
                }
            }
        },
        // "PointLightShaderLib":{
        //     "glsl": {
        //         "vs": {
        //             "defineList": [
        //                 {
        //                     "name": "POINT_LIGHTS_COUNT",
        //                     "valueFunc": ({
        //                                       PointLightData
        //                                   }) => {
        //                         return PointLightData.count;
        //                     }
        //                 }
        //             ]
        //         },
        //         "fs": {
        //             "defineList": [
        //                 {
        //                     "name": "POINT_LIGHTS_COUNT",
        //                     "valueFunc": ({
        //                                       PointLightData
        //                                   }) => {
        //                         return PointLightData.count;
        //                     }
        //                 }
        //             ]
        //         }
        //     },
        //     "send": {
        //         "uniform": [
        //             {
        //                 "name": "position",
        //                 "from": "pointLight",
        //                 "field": "position",
        //                 "fieldType": "structure",
        //                 "type": "vec3"
        //             },
        //             {
        //                 "name": "color",
        //                 "from": "pointLight",
        //                 "field": "color",
        //                 "fieldType": "structure",
        //                 "type": "vec3"
        //             },
        //             {
        //                 "name": "intensity",
        //                 "from": "pointLight",
        //                 "field": "intensity",
        //                 "fieldType": "structure",
        //                 "type": "float"
        //             },
        //             {
        //                 "name": "position",
        //                 "from": "pointLight",
        //                 "field": "position",
        //                 "fieldType": "structure",
        //                 "type": "vec3"
        //             },
        //             {
        //                 "name": "constant",
        //                 "from": "pointLight",
        //                 "field": "constant",
        //                 "fieldType": "structure",
        //                 "type": "float"
        //             },
        //             {
        //                 "name": "linear",
        //                 "from": "pointLight",
        //                 "field": "linear",
        //                 "fieldType": "structure",
        //                 "type": "float"
        //             },
        //             {
        //                 "name": "quadratic",
        //                 "from": "pointLight",
        //                 "field": "quadratic",
        //                 "fieldType": "structure",
        //                 "type": "float"
        //             },
        //             {
        //                 "name": "range",
        //                 "from": "pointLight",
        //                 "field": "range",
        //                 "fieldType": "structure",
        //                 "type": "float"
        //             }
        //         ]
        //     }
        // },
        "DirectionLightShaderLib":{
            "glsl": {
                "vs": {
                    "defineList": [
                        {
                            "name": "DIRECTION_LIGHTS_COUNT",
                            "valueFunc": ({
                                              DirectionLightData
                                          }) => {
                                return DirectionLightData.count;
                            }
                        }
                    ]
                },
                "fs": {
                    "defineList": [
                        {
                            "name": "DIRECTION_LIGHTS_COUNT",
                            "valueFunc": ({
                                              DirectionLightData
                                          }) => {
                                return DirectionLightData.count;
                            }
                        }
                    ]
                }
            },
            "send": {
                // "uniform": [
                //     {
                //         "name": "position",
                //         "from": "directionLight",
                //         "field": "position",
                //         "fieldType": "structure",
                //         "type": "vec3"
                //     }
                //     // {
                //     //     "name": "color",
                //     //     "from": "directionLight",
                //     //     "field": "color",
                //     //     "fieldType": "structure",
                //     //     "type": "vec3"
                //     // },
                //     // {
                //     //     "name": "intensity",
                //     //     "from": "directionLight",
                //     //     "field": "intensity",
                //     //     "fieldType": "structure",
                //     //     "type": "float"
                //     // }
                // ],
                // "uniformGroup": {
                //     "directionLight":[
                //         {
                //             "name": "color",
                //             // "from": "directionLight",
                //             "field": "color",
                //             "fieldType": "structure",
                //             "type": "vec3"
                //         },
                //         {
                //             "name": "intensity",
                //             // "from": "directionLight",
                //             "field": "intensity",
                //             "fieldType": "structure",
                //             "type": "float"
                //         }
                //     ]
                // },

                "uniformFunc": (gl:WebGLRenderingContext, shaderIndex:number,
                                {
                                    sendVector3,
                                    sendFloat1
                                },
                                {
                                    DirectionLightDataFromSystem
                                }, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
                    for (let i = 0, count = DirectionLightDataFromSystem.count; i < count; i++){
                        //todo use directionLightUtils method!
                        let renderData:DirectionLightRenderData = getRenderData(i, DirectionLightDataFromSystem);

                        sendVector3(gl, shaderIndex, DirectionLightDataFromSystem.lightGLSLDataStructureMemberName[i].position, getPosition(i, ThreeDTransformData, GameObjectData, DirectionLightDataFromSystem), uniformLocationMap, uniformCacheMap);
                        sendVector3(gl, shaderIndex, DirectionLightDataFromSystem.lightGLSLDataStructureMemberName[i].color, renderData.colorArr, uniformLocationMap, uniformCacheMap);
                        sendFloat1(gl, shaderIndex, DirectionLightDataFromSystem.lightGLSLDataStructureMemberName[i].intensity, renderData.intensity, uniformLocationMap, uniformCacheMap);
                    }
                }
            }
        },




        "LightEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": lightEnd_fragment
                },
                //todo use utils method!only pass data(fix basic shader lib also!)
                "func": (materialIndex: number, {
                    getAlphaTest,
                    isTestAlpha
                }, {
                             LightMaterialDataFromSystem
                         }) => {
                    var alphaTest = getAlphaTest(materialIndex, LightMaterialDataFromSystem);

                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                //todo test:+ lightEnd_fragment.body
                                "body":  `if (gl_FragColor.a < ${alphaTest}){
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
    name:string;
    valueFunc?:Function;
}

export interface IShaderLibSendConfig {
    attribute?: Array<ISendAttributeConfig>;
    uniform?: Array<ISendUniformConfig>;
    uniformFunc?: Function;
}

export interface ISendAttributeConfig {
    name: string;
    buffer: string;
    type: "vec3";
}

export interface ISendUniformConfig {
    name: string;
    field: string;
    type: "num" | "float" | "vec3" | "mat4";
    fieldType?: "value" | "structure";
    from?: "cmd" | "basicMaterial" | "lightMaterial" | "ambientLight" | "pointLight" | "directionLight";
}

