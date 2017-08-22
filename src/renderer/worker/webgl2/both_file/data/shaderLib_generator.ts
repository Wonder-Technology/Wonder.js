import {
    webgl2_basic_materialColor_fragment, webgl2_basic_end_fragment, webgl2_basic_vertex,
    webgl2_common_define, webgl2_common_fragment, webgl2_common_function, webgl2_common_vertex,
    GLSLChunk, modelMatrix_noInstance_vertex,
    webgl2_normalMatrix_noInstance_vertex,
    // light_common, lightEnd_fragment,
    // light_setWorldPosition_vertex, light_vertex, lightCommon_vertex, lightCommon_fragment,
    webgl2_noShadowMap_fragment,
    webgl2_noDiffuseMap_fragment, webgl2_noEmissionMap_fragment,
    webgl2_noLightMap_fragment,
    webgl2_gbuffer_noNormalMap_fragment, webgl2_gbuffer_noNormalMap_vertex,
    webgl2_noSpecularMap_fragment,
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
    deferLightPass_end_fragment,
    webgl2_deferLightPass_noNormalMap_fragment,


    deferLightPass_ambientLight_fragment,


    deferLightPass_directionLight_pointLight_common,

    deferLightPass_directionLight_common,
    deferLightPass_directionLight_fragment,
    webgl2_deferLightPass_directionLight_noNormalMap_fragment,


    deferLightPass_pointLight_common,
    deferLightPass_pointLight_fragment,
    webgl2_deferLightPass_pointLight_noNormalMap_fragment,

    ubo_camera,
    ubo_light,
    ubo_ambientLight,
    ubo_directionLight,
    ubo_pointLight

} from "../../../../shader/chunk/ShaderChunk";
import { webgl2_setPos_mvp } from "../../../../webgl2/shader/snippet/ShaderSnippet";
import {
    IDefineUniformConfig,
    IGLSLConfig, IGLSLDefineListItem, ISendUniformConfig,
    IShaderLibContentGenerator
} from "../../../../data/shaderLib_generator_interface";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";

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
                        "type": "vec3",
                        "location": 0
                    }
                ]
            }
        },








        "CameraUboShaderLib": {
            "glsl": {
                "vs": {
                    "source": ubo_camera
                },
                "fs": {
                    "source": ubo_camera
                }
            },
            "send": {
                "uniformUbo": [
                    {
                        "name": "CameraUbo",
                        "typeArray": {
                            "type": "float32",
                            "length": 16 * 2 + 4 + 16
                        },
                        "setBufferDataFunc": (gl, {
                            uniformBlockBinding,
                            buffer,
                            typeArray
                        }, {
                                                  bindUniformBufferBase,
                                                  bufferDynamicData,
                                                  set
                                              }, {
                                                  vMatrix,
                                                  pMatrix,
                                                  cameraPosition,
                                                  normalMatrix
                                              }) => {
                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);

                            set(typeArray, vMatrix);
                            set(typeArray, pMatrix, 16);
                            set(typeArray, cameraPosition, 32);

                            /*! refer to https://stackoverflow.com/questions/23628259/how-to-properly-pad-and-align-data-in-opengl-for-std430-layout */
                            set(typeArray, [normalMatrix[0], normalMatrix[1], normalMatrix[2], 0], 36);
                            set(typeArray, [normalMatrix[3], normalMatrix[4], normalMatrix[5], 0], 40);
                            set(typeArray, [normalMatrix[6], normalMatrix[7], normalMatrix[8], 0], 44);

                            bufferDynamicData(gl, typeArray);
                        },
                        "frequence": "frame",
                        "usage": "dynamic"
                    }
                ]
            }
        },
        "LightUboShaderLib": {
            "glsl": {
                "fs": {
                    "varDeclare": ubo_light.varDeclare
                }
            },
            "send": {
                "uniformUbo": [
                    {
                        "name": "LightUbo",
                        "typeArray": {
                            "type": "float32",
                            "length": 4
                        },
                        "setBufferDataFunc": (gl, {
                            uniformBlockBinding,
                            buffer,
                            typeArray
                        }, {
                                                  bindUniformBufferBase,
                                                  bufferStaticData,
                                                  set
                                              }, drawRenderCommandBufferDataMap, {
                                                  render_config
                                              }) => {
                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);

                            set(typeArray, [render_config.defer.lightModel]);

                            bufferStaticData(gl, typeArray);
                        },
                        "frequence": "one",
                        "usage": "static"
                    }
                ]
            }
        },
        "AmbientLightUboShaderLib": {
            "glsl": {
                "fs": {
                    "source": ubo_ambientLight
                }
            },
            "send": {
                "uniformUbo": [
                    {
                        "name": "AmbientLightUbo",
                        "typeArray": {
                            "type": "float32",
                            "length": 4 * 1
                        },
                        "setBufferDataFunc": (gl, ambientLightIndex, {
                                                  uniformBlockBinding,
                                                  buffer,
                                                  typeArray
                                              }, {
                                                  bindUniformBufferBase,
                                                  bufferDynamicData,
                                                  set
                                              }, {
                                                  cleanColorDirty,

                                                  AmbientLightDataFromSystem
                                              },
                                              {
                                                  colorArr3,

                                                  isColorDirty
                                              }
                        ) => {
                            var isDirtyFlag = false;

                            if(isColorDirty){
                                isDirtyFlag = true;

                                set(typeArray, colorArr3, 0);

                                cleanColorDirty(ambientLightIndex, AmbientLightDataFromSystem);
                            }

                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);

                            if(isDirtyFlag){
                                bufferDynamicData(gl, typeArray);
                            }
                        },
                        "frequence": "ambientLight",
                        "usage": "dynamic"
                    }
                ]
            }
        },
        "DirectionLightUboShaderLib": {
            "glsl": {
                "fs": {
                    "source": ubo_directionLight
                }
            },
            "send": {
                "uniformUbo": [
                    {
                        "name": "DirectionLightUbo",
                        "typeArray": {
                            "type": "float32",
                            "length": 4 * 2
                        },
                        "setBufferDataFunc": (gl, directionLightIndex, {
                                                  uniformBlockBinding,
                                                  buffer,
                                                  typeArray
                                              }, {
                                                  bindUniformBufferBase,
                                                  bufferDynamicData,
                                                  set
                                              }, {
                                                  cleanPositionDirty,
                                                  cleanColorDirty,
                                                  cleanIntensityDirty,

                                                  DirectionLightDataFromSystem
                                              },
                                              {
                                                  position,
                                                  colorArr3,
                                                  intensity,

                                                  isPositionDirty,
                                                  isColorDirty,
                                                  isIntensityDirty
                                              }
                        ) => {
                            var isDirtyFlag = false;

                            if(isPositionDirty){
                                isDirtyFlag = true;

                                set(typeArray, position);

                                cleanPositionDirty(directionLightIndex, DirectionLightDataFromSystem);
                            }

                            if(isColorDirty){
                                isDirtyFlag = true;

                                set(typeArray, colorArr3, 4);

                                cleanColorDirty(directionLightIndex, DirectionLightDataFromSystem);
                            }

                            if(isIntensityDirty){
                                set(typeArray, [intensity], 7);

                                isDirtyFlag = true;

                                cleanIntensityDirty(directionLightIndex, DirectionLightDataFromSystem);
                            }

                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);

                            if(isDirtyFlag){
                                bufferDynamicData(gl, typeArray);
                            }
                        },
                        "frequence": "directionLight",
                        "usage": "dynamic"
                    }
                ]
            }
        },
        "PointLightUboShaderLib": {
            "glsl": {
                "fs": {
                    "source": ubo_pointLight
                }
            },
            "send": {
                "uniformUbo": [
                    {
                        "name": "PointLightUbo",
                        "typeArray": {
                            "type": "float32",
                            "length": 4 * 3
                        },
                        "setBufferDataFunc": (gl, pointLightIndex, {
                                                  uniformBlockBinding,
                                                  buffer,
                                                  typeArray
                                              }, {
                                                  bindUniformBufferBase,
                                                  bufferDynamicData,
                                                  set
                                              }, {
                                                  cleanPositionDirty,
                                                  cleanColorDirty,
                                                  cleanIntensityDirty,
                                                  cleanAttenuationDirty,

                                                  PointLightDataFromSystem
                                              },
                                              {
                                                  position,
                                                  colorArr3,
                                                  intensity,
                                                  constant,
                                                  linear,
                                                  quadratic,
                                                  radius,

                                                  isIntensityDirty,
                                                  isOtherValueDirty
                                              }
                        ) => {
                            var isDirtyFlag = false;

                            if(isIntensityDirty){
                                set(typeArray, [intensity], 7);

                                isDirtyFlag = true;

                                cleanIntensityDirty(pointLightIndex, PointLightDataFromSystem);
                            }

                            if(isOtherValueDirty){
                                isDirtyFlag = true;

                                set(typeArray, position);
                                set(typeArray, colorArr3, 4);
                                set(typeArray, [constant, linear, quadratic, radius], 8);


                                cleanPositionDirty(pointLightIndex, PointLightDataFromSystem);
                                cleanColorDirty(pointLightIndex, PointLightDataFromSystem);
                                cleanAttenuationDirty(pointLightIndex, PointLightDataFromSystem);
                            }

                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);

                            if(isDirtyFlag){
                                bufferDynamicData(gl, typeArray);
                            }
                        },
                        "frequence": "pointLight",
                        "usage": "dynamic"
                    }
                ]
            }
        },









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
                    "varDeclare": webgl2_basic_vertex.varDeclare,


                    "body": webgl2_setPos_mvp
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
                "attribute": [
                    {
                        "name": "a_texCoord",
                        "buffer": "texCoord",
                        "type": "vec2",
                        "location": 1
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
                    "source": webgl2_normalMatrix_noInstance_vertex
                }
            },
            "send": {
            }
        },
        "NormalCommonShaderLib": {
            "send": {
                "attribute": [
                    {
                        "name": "a_normal",
                        "buffer": "normal",
                        "type": "vec3",
                        "location": 1
                    }
                ]
            }
        },
        "GBufferCommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": gbuffer_common_vertex
                },
                "fs": {
                    "source": gbuffer_common_fragment
                }
            }
        },
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
                        "type": "vec2",
                        "location": 2
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

        "GBufferShaderLib": {
            "glsl": {
                "vs": {
                    "source": gbuffer_vertex
                },
                "fs": {
                    "source": gbuffer_fragment
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


        "GBufferEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": gbuffer_end_fragment
                },
            }
        },




        "DeferLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_common
                }
            }
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
                }
            },
            "send": {
                "attribute": [
                    {
                        "name": "a_position",
                        "buffer": "vertex",
                        "type": "vec3",
                        "location": 0
                    },
                    {
                        "name": "a_texCoord",
                        "buffer": "texCoord",
                        "type": "vec2",
                        "location": 1
                    }
                ],
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



        // "DeferAmbientLightShaderLib": {
        //     "glsl": {
        //         "fs": {
        //             "varDeclare": "uniform vec3 u_ambient;"
        //         }
        //     },
        //     "send": {
        //         "uniformFunc": (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, {
        //             glslSenderData: {
        //                 sendFloat3
        //             },
        //             ambientLightData: {
        //                 getColorArr3,
        //
        //                 isColorDirty,
        //
        //                 cleanColorDirty,
        //
        //                 AmbientLightDataFromSystem
        //             }
        //         }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
        //             for (let i = 0, count = AmbientLightDataFromSystem.count; i < count; i++) {
        //
        //                 if(isColorDirty(i, AmbientLightDataFromSystem)) {
        //                     sendFloat3(gl, shaderIndex, program, "u_ambient", getColorArr3(i, AmbientLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        //
        //                     cleanColorDirty(i, AmbientLightDataFromSystem);
        //                 }
        //             }
        //         }
        //     }
        // },

        "DeferAmbientLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_ambientLight_fragment
                }
            },
            "send": {
            }
        },









        "DeferDirectionLightPointLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_directionLight_pointLight_common
                }
            }
        },



        "DeferDirectionLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_directionLight_common
                }
            }
        },
        "DeferDirectionLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_deferLightPass_directionLight_noNormalMap_fragment
                }
            }
        },
        "DeferDirectionLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_directionLight_fragment
                }
            },
            "send": {
            }
        },





        "DeferPointLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_pointLight_common
                }
            }
        },
        "DeferPointLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": webgl2_deferLightPass_pointLight_noNormalMap_fragment
                }
            }
        },
        "DeferPointLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": deferLightPass_pointLight_fragment
                }
            },
            "send": {
            }
        },






        "EndShaderLib": {
        }
    }
}

export interface IWebGL2ShaderLibContentGenerator extends IShaderLibContentGenerator{
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

export interface IWebGL2GLSLConfig extends IGLSLConfig{
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

export interface IWebGL2GLSLDefineListItem extends IGLSLDefineListItem{
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

export type WebGL2UniformType = "int" | "float" | "float3" | "vec3" | "mat3" | "mat4" | "sampler2D";

export interface IWebGL2DefineUniformConfig extends IDefineUniformConfig{
    name: string;
    type: WebGL2UniformType;
}

export interface IWebGL2SendUniformConfig extends ISendUniformConfig{
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
    setBufferDataFunc:Function;
}

export interface IWebGL2UboTypeArrayConfig {
    type:string;
    length:number;
}
