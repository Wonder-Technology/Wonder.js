import {
    webgl2_basic_materialColor_fragment, webgl2_basic_end_fragment,webgl2_basic_vertex,
    webgl2_common_define, webgl2_common_fragment, webgl2_common_function, webgl2_common_vertex,
    GLSLChunk, modelMatrix_noInstance_vertex, normalMatrix_noInstance_vertex,
    // light_common, lightEnd_fragment,
    // light_setWorldPosition_vertex, light_vertex, lightCommon_vertex, lightCommon_fragment,
    webgl2_noShadowMap_fragment,
    webgl2_noDiffuseMap_fragment, webgl2_noEmissionMap_fragment,
    webgl2_noLightMap_fragment,
    webgl2_gbuffer_noNormalMap_fragment, webgl2_gbuffer_noNormalMap_vertex,
    webgl2_noSpecularMap_fragment,
    webgl2_deferLightPass_noNormalMap_fragment,
    // light_fragment,
    webgl2_basic_map_vertex,
    webgl2_basic_map_fragment,
    webgl2_diffuseMap_vertex, webgl2_diffuseMap_fragment,
    webgl2_specularMap_vertex, webgl2_specularMap_fragment,

    // light_model_ubo,
    // webgl2_common_ubo,
    gbuffer_common_vertex,
    gbuffer_common_fragment,
    gbuffer_setWorldPosition_vertex,
    gbuffer_vertex,
    gbuffer_fragment,
    gbuffer_end_fragment,

    deferLightPass_common,
    deferLightPass_vertex,
    deferLightPass_fragment,
    deferLightPass_end_fragment

} from "../../../../shader/chunk/ShaderChunk";
import { setPos_mvp } from "../../../../shader/snippet/ShaderSnippet";

export const webgl2_shaderLib_generator = {
    "shaderLibs": {
        "CommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": webgl2_common_vertex,
                    "define": webgl2_common_define.define + webgl2_common_vertex.define,
                    "funcDefine": webgl2_common_function.funcDefine + webgl2_common_vertex.funcDefine
                },
                "fs": {
                    "source": webgl2_common_fragment,
                    "define": webgl2_common_define.define + webgl2_common_fragment.define,
                    "funcDefine": webgl2_common_function.funcDefine + webgl2_common_fragment.funcDefine
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




        //todo separate

        // "CommonShaderLib": {
        //     "glsl": {
        //         "vs": {
        //             "source": webgl2_common_vertex,
        //             "define": webgl2_common_define.define + webgl2_common_vertex.define,
        //             // "funcDefine": webgl2_common_function.funcDefine + webgl2_common_vertex.funcDefine
        //             "funcDefine": webgl2_common_vertex.funcDefine,
        //             "varDeclare": webgl2_common_ubo.varDeclare
        //         },
        //         "fs": {
        //             "source": webgl2_common_fragment,
        //             "define": webgl2_common_define.define + webgl2_common_fragment.define,
        //             // "funcDefine": webgl2_common_function.funcDefine + webgl2_common_fragment.funcDefine
        //             "funcDefine": webgl2_common_fragment.funcDefine
        //         }
        //     },
        //     "send": {
        //         //todo build
        //         "uniformUBO": [
        //             {
        //                 "name": "CameraData",
        //                 // "createTypeArrayFunc": () => {
        //                 //     return new Float32Array(16 * 3 + 3);
        //                 // },
        //                 "typeArray": {
        //                     "type": "float32",
        //                     "length": 16 * 3 + 3
        //                 },
        //                 "valueFunc": (gl, buffer, {
        //                     bindBufferFunc,
        //                     setBufferDataFunc
        //                 }, {
        //                                   typeArray,
        //                                   vMatrix,
        //                                   pMatrix,
        //                                   vpMatrix,
        //                                   cameraPosition
        //                               }) => {
        //                     // gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, buffer);
        //                     bindBufferFunc(gl, 0, buffer);
        //
        //                     set(typeArray, vMatrix);
        //                     set(typeArray, pMatrix, 16);
        //                     set(typeArray, vpMatrix, 32);
        //                     set(typeArray, cameraPosition, 48);
        //
        //                     setBufferDataFunc(gl, 0, typeArray);
        //                     // // gl.bufferData(gl.UNIFORM_BUFFER, 128, gl.DYNAMIC_DRAW);
        //                     // gl.bufferData(gl.UNIFORM_BUFFER, 128, gl.DYNAMIC_DRAW);
        //                 },
        //                 "frequence": "frame",
        //                 "usage": "dynamic"
        //             }
        //         ]
        //     }
        // },
        // "ModelMatrixNoInstanceShaderLib": {
        //     "glsl": {
        //         "vs": {
        //             "source": modelMatrix_noInstance_vertex,
        //         }
        //     }
        //     //todo set specific model ubo in specific material(basic, light)
        //     // "send": {
        //     //     "uniform": [
        //     //         {
        //     //             "name": "u_mMatrix",
        //     //             "field": "mMatrix",
        //     //             "type": "mat4"
        //     //         }
        //     //     ]
        //     // }
        // },
        // "VerticeCommonShaderLib": {
        //     "send": {
        //         "attribute": [
        //             {
        //                 "name": "a_position",
        //                 "buffer": "vertex",
        //                 "type": "vec3",
        //                 //todo set location
        //                 "location": 0
        //             }
        //         ]
        //     }
        // },





        "BasicMaterialColorShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_basic_materialColor_fragment
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
                    //todo remove after remove "a_position" define
                    "varDeclare": webgl2_basic_vertex.varDeclare,


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
                    "source": webgl2_basic_end_fragment
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
}\n` + webgl2_basic_end_fragment.body
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
                    "source": webgl2_basic_map_vertex
                },
                "fs": {
                    "source": webgl2_basic_map_fragment
                }
            },
            "send": {
                //todo add attribute to glsl
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
















        //todo separate

        // "LightModelDataShaderLib": {
        //     "glsl": {
        //         "vs": {
        //             "source":light_model_ubo
        //         }
        //     },
        //     "send": {
        //         "uniformUBO": [
        //             {
        //                 "name": "LightModelData"
        //                 //todo set ubo data
        //             }
        //         ]
        //     }
        // },

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
                        // "location": 1
                    }
                ]
            }
        },
        // "LightCommonShaderLib": {
        "GBufferCommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": gbuffer_common_vertex
                },
                "fs": {
                    "source": gbuffer_common_fragment
                }
            }
            // "send": {
            //     "uniform": [
            //         {
            //             "name": "u_specular",
            //             "from": "lightMaterial",
            //             "field": "specularColor",
            //             "type": "float3"
            //         }
            //     ]
            // }
        },
        // "LightSetWorldPositionShaderLib": {
            "GBufferSetWorldPositionShaderLib": {
            "glsl": {
                "vs": {
                    "source": gbuffer_setWorldPosition_vertex
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
                        // "location": 2
                    }
                ]
            }
        },


        "DiffuseMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": webgl2_diffuseMap_vertex
                },
                "fs": {
                    "source": webgl2_diffuseMap_fragment
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
                    "source": webgl2_noDiffuseMap_fragment
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
                    "source": webgl2_specularMap_vertex
                },
                "fs": {
                    "source": webgl2_specularMap_fragment
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
                    "source": webgl2_noSpecularMap_fragment
                }
            }
        },
        // "NoLightMapShaderLib": {
        //     "glsl": {
        //         "fs": {
        //             "source": noLightMap_fragment
        //         }
        //     }
        // },
        // "NoEmissionMapShaderLib": {
        //     "glsl": {
        //         "fs": {
        //             "source": noEmissionMap_fragment
        //         }
        //     },
        //     "send": {
        //         "uniform": [
        //             {
        //                 "name": "u_emission",
        //                 "from": "lightMaterial",
        //                 "field": "emissionColor",
        //                 "type": "float3"
        //             }
        //         ]
        //     }
        // },
        "GBufferNoNormalMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": webgl2_gbuffer_noNormalMap_vertex
                },
                "fs": {
                    "source": webgl2_gbuffer_noNormalMap_fragment
                }
            }
        },

        // "LightShaderLib": {
        "GBufferShaderLib": {
            "glsl": {
                "vs": {
                    "source": gbuffer_vertex
                    // "defineList": _lightDefineList
                },
                "fs": {
                    "source": gbuffer_fragment
                    // "defineList": _lightDefineList
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_shininess",
                        "from": "lightMaterial",
                        "field": "shininess",
                        "type": "float"
                    }
                ]
            }
        },


        // "LightEndShaderLib": {
        "GBufferEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": gbuffer_end_fragment
                },
            }
        },




        "DeferLightPassCommonShaderLib": {
            "glsl": {
                // "vs": {
                //     // "funcDeclare": deferLightPass_common.funcDeclare,
                //     // "funcDefine": deferLightPass_common.funcDefine
                // },
                "fs": {
                    "source": deferLightPass_common
                    // "funcDeclare": deferLightPass_common.funcDeclare,
                    // "funcDefine": deferLightPass_common.funcDefine
                }
            }
            // "send": {
            //     "uniform": [
            //         {
            //             "name": "u_specular",
            //             "from": "lightMaterial",
            //             "field": "specularColor",
            //             "type": "float3"
            //         }
            //     ]
            // }
        },

        "NoLightMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_noLightMap_fragment
                }
            }
        },
        "NoEmissionMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_noEmissionMap_fragment
                }
            }
            // "send": {
            //     "uniform": [
            //         {
            //             "name": "u_emission",
            //             "from": "lightMaterial",
            //             "field": "emissionColor",
            //             "type": "float3"
            //         }
            //     ]
            // }
        },
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_noShadowMap_fragment
                }
            }
        },

        "DeferLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_deferLightPass_noNormalMap_fragment
                }
            }
        },

        "DeferLightPassShaderLib": {
            "glsl": {
                "vs": {
                    "source": deferLightPass_vertex
                },
                "fs": {
                    "source": deferLightPass_fragment
                }
            },
            "send": {
                // "uniform": [
                //     {
                //         "name": "u_opacity",
                //         "from": "lightMaterial",
                //         "field": "opacity",
                //         "type": "float"
                //     },
                //todo move to ubo(global light ubo)
                //     {
                //         "name": "u_lightModel",
                //         "from": "lightMaterial",
                //         "field": "lightModel",
                //         "type": "int"
                //     },
                //todo move to ubo
                //     {
                //         "name": "u_cameraPos",
                //         "from": "cmd",
                //         "field": "cameraPosition",
                //         "type": "float3"
                //     }
                // ],
                "uniformDefine": [
                    {
                        "name": "u_positionBuffer",
                        "type": "sampler2D"
                    },
                    {
                        "name": "u_normalBuffer",
                        "type": "sampler2D"
                    },
                    {
                        "name": "u_colorBuffer",
                        "type": "sampler2D"
                    }
                ]
            }
        },

        "DeferLightPassEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_end_fragment
                },
            }
        },



        "EndShaderLib": {
        }
    }
}

export interface IWebGL2ShaderLibContentGenerator {
    [shaderLibName: string]: IWebGL2ShaderLibConfig
}

export interface IWebGL2ShaderLibConfig{
    glsl?: {
        vs?: IWebGL2GLSLConfig,
        fs?: IWebGL2GLSLConfig,
        func?: (materialIWebGL2ndex: number) => IWebGL2GLSLFuncConfig | null
    },
    send?: IWebGL2ShaderLibSendConfig
}

export interface IWebGL2GLSLConfig {
    source?: GLSLChunk;
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
    defineList?: Array<IWebGL2GLSLDefineListItem>;

    //todo support extension
    // extension?:string,
}

export interface IWebGL2GLSLFuncConfig {
    vs?: IWebGL2GLSLFuncGLSLConfig,
    fs?: IWebGL2GLSLFuncGLSLConfig
}

export interface IWebGL2GLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}

export interface IWebGL2GLSLDefineListItem {
    name: string;
    valueFunc?: Function;
}

export interface IWebGL2ShaderLibSendConfig {
    attribute?: Array<IWebGL2SendAttributeConfig>;
    uniform?: Array<IWebGL2SendUniformConfig>;
    uniformDefine?: Array<IWebGL2DefineUniformConfig>;
    uniformFunc?: Function;
}

export interface IWebGL2SendAttributeConfig {
    name: string;
    buffer: "vertex" | "normal" | "texCoord";
    type: "vec2" | "vec3";
    //todo separate interface define from webgl1
    location: number;
}

export type WebGL2UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";

export interface IWebGL2DefineUniformConfig {
    name: string;
    type: WebGL2UniformType;
}

export interface IWebGL2SendUniformConfig {
    name: string;
    field: string;
    type: WebGL2UniformType;
    fieldType?: "structure";
    from?: "cmd" | "basicMaterial" | "lightMaterial" | "ambientLight" | "pointLight" | "directionLight";
}

//todo fix type(e.g. add location, uniformUBO...)
