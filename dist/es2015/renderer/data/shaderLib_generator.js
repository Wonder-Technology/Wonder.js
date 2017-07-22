import { basic_materialColor_fragment, end_basic_fragment, common_define, common_fragment, common_function, common_vertex, modelMatrix_noInstance_vertex, normalMatrix_noInstance_vertex, light_common, lightEnd_fragment, light_setWorldPosition_vertex, light_vertex, lightCommon_vertex, lightCommon_fragment, noShadowMap_fragment, noDiffuseMap_fragment, noEmissionMap_fragment, noLightMap_fragment, noNormalMap_fragment, noNormalMap_vertex, noSpecularMap_fragment, noNormalMap_light_fragment, light_fragment, map_forBasic_vertex, map_forBasic_fragment, diffuseMap_vertex, diffuseMap_fragment, specularMap_vertex, specularMap_fragment } from "../shader/chunk/ShaderChunk";
import { setPos_mvp } from "../shader/snippet/ShaderSnippet";
var _lightDefineList = [
    {
        "name": "DIRECTION_LIGHTS_COUNT",
        "valueFunc": function (_a) {
            var DirectionLightDataFromSystem = _a.DirectionLightDataFromSystem;
            return DirectionLightDataFromSystem.count;
        }
    },
    {
        "name": "POINT_LIGHTS_COUNT",
        "valueFunc": function (_a) {
            var PointLightDataFromSystem = _a.PointLightDataFromSystem;
            return PointLightDataFromSystem.count;
        }
    }
];
export var shaderLib_generator = {
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
                "func": function (materialIndex, _a, _b) {
                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + end_basic_fragment.body
                            }
                        };
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
                    "source": diffuseMap_vertex
                },
                "fs": {
                    "source": diffuseMap_fragment
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
        "SpecularMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": specularMap_vertex
                },
                "fs": {
                    "source": specularMap_fragment
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
                    "source": noSpecularMap_fragment
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
                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
                    var sendFloat3 = _a.glslSenderData.sendFloat3, _b = _a.ambientLightData, getColorArr3 = _b.getColorArr3, AmbientLightDataFromSystem = _b.AmbientLightDataFromSystem;
                    for (var i = 0, count = AmbientLightDataFromSystem.count; i < count; i++) {
                        sendFloat3(gl, shaderIndex, program, "u_ambient", getColorArr3(i, AmbientLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                    }
                }
            }
        },
        "PointLightShaderLib": {
            "send": {
                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
                    var _b = _a.glslSenderData, sendFloat1 = _b.sendFloat1, sendFloat3 = _b.sendFloat3, _c = _a.pointLightData, getColorArr3 = _c.getColorArr3, getIntensity = _c.getIntensity, getConstant = _c.getConstant, getLinear = _c.getLinear, getQuadratic = _c.getQuadratic, getRange = _c.getRange, getPosition = _c.getPosition, PointLightDataFromSystem = _c.PointLightDataFromSystem;
                    for (var i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
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
                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
                    var _b = _a.glslSenderData, sendFloat1 = _b.sendFloat1, sendFloat3 = _b.sendFloat3, _c = _a.directionLightData, getColorArr3 = _c.getColorArr3, getIntensity = _c.getIntensity, getPosition = _c.getPosition, DirectionLightDataFromSystem = _c.DirectionLightDataFromSystem;
                    for (var i = 0, count = DirectionLightDataFromSystem.count; i < count; i++) {
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
                "func": function (materialIndex, _a, _b) {
                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + lightEnd_fragment.body
                            }
                        };
                    }
                    return void 0;
                }
            }
        },
        "EndShaderLib": {}
    }
};
//# sourceMappingURL=shaderLib_generator.js.map