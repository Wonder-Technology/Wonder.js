"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderChunk_1 = require("../../../../shader/chunk/ShaderChunk");
var ShaderSnippet_1 = require("../../../../webgl1/shader/snippet/ShaderSnippet");
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
exports.webgl1_shaderLib_generator = {
    "shaderLibs": {
        "CommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.common_vertex,
                    "define": ShaderChunk_1.common_define.define + ShaderChunk_1.common_vertex.define,
                    "funcDefine": ShaderChunk_1.common_function.funcDefine + ShaderChunk_1.common_vertex.funcDefine
                },
                "fs": {
                    "source": ShaderChunk_1.common_fragment,
                    "define": ShaderChunk_1.common_define.define + ShaderChunk_1.common_fragment.define,
                    "funcDefine": ShaderChunk_1.common_function.funcDefine + ShaderChunk_1.common_fragment.funcDefine
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
                    "source": ShaderChunk_1.modelMatrix_noInstance_vertex,
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
                    "source": ShaderChunk_1.webgl1_basic_materialColor_fragment
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
                    "body": ShaderSnippet_1.webgl1_setPos_mvp
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
                    "source": ShaderChunk_1.webgl1_basic_end_fragment
                },
                "func": function (materialIndex, _a, _b) {
                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + ShaderChunk_1.webgl1_basic_end_fragment.body
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
                    "source": ShaderChunk_1.webgl1_basic_map_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl1_basic_map_fragment
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
                    "source": ShaderChunk_1.webgl1_normalMatrix_noInstance_vertex
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
                    "source": ShaderChunk_1.frontLight_common_vertex,
                    "funcDeclare": ShaderChunk_1.frontLight_common.funcDeclare,
                    "funcDefine": ShaderChunk_1.frontLight_common.funcDefine
                },
                "fs": {
                    "source": ShaderChunk_1.frontLight_common_fragment,
                    "funcDeclare": ShaderChunk_1.frontLight_common.funcDeclare,
                    "funcDefine": ShaderChunk_1.frontLight_common.funcDefine
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
                    "source": ShaderChunk_1.frontLight_setWorldPosition_vertex
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
                    "source": ShaderChunk_1.webgl1_diffuseMap_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl1_diffuseMap_fragment
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
                    "source": ShaderChunk_1.webgl1_noDiffuseMap_fragment
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
                    "source": ShaderChunk_1.webgl1_specularMap_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl1_specularMap_fragment
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
                    "source": ShaderChunk_1.webgl1_noSpecularMap_fragment
                }
            }
        },
        "NoLightMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl1_noLightMap_fragment
                }
            }
        },
        "NoEmissionMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl1_noEmissionMap_fragment
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
                    "source": ShaderChunk_1.webgl1_noNormalMap_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl1_noNormalMap_fragment
                }
            }
        },
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl1_noShadowMap_fragment
                }
            }
        },
        "LightShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.frontLight_vertex,
                    "defineList": _lightDefineList
                },
                "fs": {
                    "source": ShaderChunk_1.frontLight_fragment,
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
                    var sendFloat3 = _a.glslSenderData.sendFloat3, _b = _a.ambientLightData, getColorArr3 = _b.getColorArr3, isColorDirty = _b.isColorDirty, cleanColorDirty = _b.cleanColorDirty, AmbientLightDataFromSystem = _b.AmbientLightDataFromSystem;
                    for (var i = 0, count = AmbientLightDataFromSystem.count; i < count; i++) {
                        if (isColorDirty(i, AmbientLightDataFromSystem)) {
                            sendFloat3(gl, shaderIndex, program, "u_ambient", getColorArr3(i, AmbientLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanColorDirty(i, AmbientLightDataFromSystem);
                        }
                    }
                }
            }
        },
        "PointLightShaderLib": {
            "send": {
                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
                    var _b = _a.glslSenderData, sendFloat1 = _b.sendFloat1, sendFloat3 = _b.sendFloat3, _c = _a.pointLightData, getColorArr3 = _c.getColorArr3, getIntensity = _c.getIntensity, getConstant = _c.getConstant, getLinear = _c.getLinear, getQuadratic = _c.getQuadratic, getRange = _c.getRange, getPosition = _c.getPosition, isPositionDirty = _c.isPositionDirty, isColorDirty = _c.isColorDirty, isIntensityDirty = _c.isIntensityDirty, isAttenuationDirty = _c.isAttenuationDirty, cleanPositionDirty = _c.cleanPositionDirty, cleanColorDirty = _c.cleanColorDirty, cleanIntensityDirty = _c.cleanIntensityDirty, cleanAttenuationDirty = _c.cleanAttenuationDirty, PointLightDataFromSystem = _c.PointLightDataFromSystem;
                    for (var i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
                        if (isPositionDirty(i, PointLightDataFromSystem)) {
                            sendFloat3(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].position, getPosition(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanPositionDirty(i, PointLightDataFromSystem);
                        }
                        if (isColorDirty(i, PointLightDataFromSystem)) {
                            sendFloat3(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].color, getColorArr3(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanColorDirty(i, PointLightDataFromSystem);
                        }
                        if (isIntensityDirty(i, PointLightDataFromSystem)) {
                            sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].intensity, getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanIntensityDirty(i, PointLightDataFromSystem);
                        }
                        if (isAttenuationDirty(i, PointLightDataFromSystem)) {
                            sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].constant, getConstant(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].linear, getLinear(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].quadratic, getQuadratic(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].range, getRange(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanAttenuationDirty(i, PointLightDataFromSystem);
                        }
                    }
                }
            }
        },
        "DirectionLightShaderLib": {
            "send": {
                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
                    var _b = _a.glslSenderData, sendFloat1 = _b.sendFloat1, sendFloat3 = _b.sendFloat3, _c = _a.directionLightData, getColorArr3 = _c.getColorArr3, getIntensity = _c.getIntensity, getPosition = _c.getPosition, isPositionDirty = _c.isPositionDirty, isColorDirty = _c.isColorDirty, isIntensityDirty = _c.isIntensityDirty, cleanPositionDirty = _c.cleanPositionDirty, cleanColorDirty = _c.cleanColorDirty, cleanIntensityDirty = _c.cleanIntensityDirty, DirectionLightDataFromSystem = _c.DirectionLightDataFromSystem;
                    for (var i = 0, count = DirectionLightDataFromSystem.count; i < count; i++) {
                        if (isPositionDirty(i, DirectionLightDataFromSystem)) {
                            sendFloat3(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].position, getPosition(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanPositionDirty(i, DirectionLightDataFromSystem);
                        }
                        if (isColorDirty(i, DirectionLightDataFromSystem)) {
                            sendFloat3(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].color, getColorArr3(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanColorDirty(i, DirectionLightDataFromSystem);
                        }
                        if (isIntensityDirty(i, DirectionLightDataFromSystem)) {
                            sendFloat1(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].intensity, getIntensity(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
                            cleanIntensityDirty(i, DirectionLightDataFromSystem);
                        }
                    }
                }
            }
        },
        "LightEndShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.frontLight_end_fragment
                },
                "func": function (materialIndex, _a, _b) {
                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + ShaderChunk_1.frontLight_end_fragment.body
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