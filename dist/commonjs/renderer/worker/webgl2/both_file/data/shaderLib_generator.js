"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderChunk_1 = require("../../../../shader/chunk/ShaderChunk");
var ShaderSnippet_1 = require("../../../../webgl2/shader/snippet/ShaderSnippet");
exports.webgl2_shaderLib_generator = {
    "shaderLibs": {
        "CommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.webgl2_common_vertex,
                    "define": ShaderChunk_1.webgl2_common_define.define + ShaderChunk_1.webgl2_common_vertex.define,
                    "funcDefine": ShaderChunk_1.webgl2_common_function.funcDefine + ShaderChunk_1.webgl2_common_vertex.funcDefine
                },
                "fs": {
                    "source": ShaderChunk_1.webgl2_common_fragment,
                    "define": ShaderChunk_1.webgl2_common_define.define + ShaderChunk_1.webgl2_common_fragment.define,
                    "funcDefine": ShaderChunk_1.webgl2_common_function.funcDefine + ShaderChunk_1.webgl2_common_fragment.funcDefine
                }
            },
            "send": {}
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
                        "type": "vec3",
                        "location": 0
                    }
                ]
            }
        },
        "CameraUboShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.ubo_camera
                },
                "fs": {
                    "source": ShaderChunk_1.ubo_camera
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
                        "setBufferDataFunc": function (gl, _a, _b, _c) {
                            var uniformBlockBinding = _a.uniformBlockBinding, buffer = _a.buffer, typeArray = _a.typeArray;
                            var bindUniformBufferBase = _b.bindUniformBufferBase, bufferDynamicData = _b.bufferDynamicData, set = _b.set;
                            var vMatrix = _c.vMatrix, pMatrix = _c.pMatrix, cameraPosition = _c.cameraPosition, normalMatrix = _c.normalMatrix;
                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);
                            set(typeArray, vMatrix);
                            set(typeArray, pMatrix, 16);
                            set(typeArray, cameraPosition, 32);
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
                    "varDeclare": ShaderChunk_1.ubo_light.varDeclare
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
                        "setBufferDataFunc": function (gl, _a, _b, drawRenderCommandBufferDataMap, _c) {
                            var uniformBlockBinding = _a.uniformBlockBinding, buffer = _a.buffer, typeArray = _a.typeArray;
                            var bindUniformBufferBase = _b.bindUniformBufferBase, bufferStaticData = _b.bufferStaticData, set = _b.set;
                            var render_config = _c.render_config;
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
                    "source": ShaderChunk_1.ubo_ambientLight
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
                        "setBufferDataFunc": function (gl, ambientLightIndex, _a, _b, _c, _d) {
                            var uniformBlockBinding = _a.uniformBlockBinding, buffer = _a.buffer, typeArray = _a.typeArray;
                            var bindUniformBufferBase = _b.bindUniformBufferBase, bufferDynamicData = _b.bufferDynamicData, set = _b.set;
                            var cleanColorDirty = _c.cleanColorDirty, AmbientLightDataFromSystem = _c.AmbientLightDataFromSystem;
                            var colorArr3 = _d.colorArr3, isColorDirty = _d.isColorDirty;
                            var isDirtyFlag = false;
                            if (isColorDirty) {
                                isDirtyFlag = true;
                                set(typeArray, colorArr3, 0);
                                cleanColorDirty(ambientLightIndex, AmbientLightDataFromSystem);
                            }
                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);
                            if (isDirtyFlag) {
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
                    "source": ShaderChunk_1.ubo_directionLight
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
                        "setBufferDataFunc": function (gl, directionLightIndex, _a, _b, _c, _d) {
                            var uniformBlockBinding = _a.uniformBlockBinding, buffer = _a.buffer, typeArray = _a.typeArray;
                            var bindUniformBufferBase = _b.bindUniformBufferBase, bufferDynamicData = _b.bufferDynamicData, set = _b.set;
                            var cleanPositionDirty = _c.cleanPositionDirty, cleanColorDirty = _c.cleanColorDirty, cleanIntensityDirty = _c.cleanIntensityDirty, DirectionLightDataFromSystem = _c.DirectionLightDataFromSystem;
                            var position = _d.position, colorArr3 = _d.colorArr3, intensity = _d.intensity, isPositionDirty = _d.isPositionDirty, isColorDirty = _d.isColorDirty, isIntensityDirty = _d.isIntensityDirty;
                            var isDirtyFlag = false;
                            if (isPositionDirty) {
                                isDirtyFlag = true;
                                set(typeArray, position);
                                cleanPositionDirty(directionLightIndex, DirectionLightDataFromSystem);
                            }
                            if (isColorDirty) {
                                isDirtyFlag = true;
                                set(typeArray, colorArr3, 4);
                                cleanColorDirty(directionLightIndex, DirectionLightDataFromSystem);
                            }
                            if (isIntensityDirty) {
                                set(typeArray, [intensity], 7);
                                isDirtyFlag = true;
                                cleanIntensityDirty(directionLightIndex, DirectionLightDataFromSystem);
                            }
                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);
                            if (isDirtyFlag) {
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
                    "source": ShaderChunk_1.ubo_pointLight
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
                        "setBufferDataFunc": function (gl, pointLightIndex, _a, _b, _c, _d) {
                            var uniformBlockBinding = _a.uniformBlockBinding, buffer = _a.buffer, typeArray = _a.typeArray;
                            var bindUniformBufferBase = _b.bindUniformBufferBase, bufferDynamicData = _b.bufferDynamicData, set = _b.set;
                            var cleanPositionDirty = _c.cleanPositionDirty, cleanColorDirty = _c.cleanColorDirty, cleanIntensityDirty = _c.cleanIntensityDirty, cleanAttenuationDirty = _c.cleanAttenuationDirty, PointLightDataFromSystem = _c.PointLightDataFromSystem;
                            var position = _d.position, colorArr3 = _d.colorArr3, intensity = _d.intensity, constant = _d.constant, linear = _d.linear, quadratic = _d.quadratic, radius = _d.radius, isIntensityDirty = _d.isIntensityDirty, isOtherValueDirty = _d.isOtherValueDirty;
                            var isDirtyFlag = false;
                            if (isIntensityDirty) {
                                set(typeArray, [intensity], 7);
                                isDirtyFlag = true;
                                cleanIntensityDirty(pointLightIndex, PointLightDataFromSystem);
                            }
                            if (isOtherValueDirty) {
                                isDirtyFlag = true;
                                set(typeArray, position);
                                set(typeArray, colorArr3, 4);
                                set(typeArray, [constant, linear, quadratic, radius], 8);
                                cleanPositionDirty(pointLightIndex, PointLightDataFromSystem);
                                cleanColorDirty(pointLightIndex, PointLightDataFromSystem);
                                cleanAttenuationDirty(pointLightIndex, PointLightDataFromSystem);
                            }
                            bindUniformBufferBase(gl, buffer, uniformBlockBinding);
                            if (isDirtyFlag) {
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
                    "source": ShaderChunk_1.webgl2_basic_materialColor_fragment
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
                    "varDeclare": ShaderChunk_1.webgl2_basic_vertex.varDeclare,
                    "body": ShaderSnippet_1.webgl2_setPos_mvp
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
                    "source": ShaderChunk_1.webgl2_basic_end_fragment
                },
                "func": function (materialIndex, _a, _b) {
                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + ShaderChunk_1.webgl2_basic_end_fragment.body
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
                    "source": ShaderChunk_1.webgl2_basic_map_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl2_basic_map_fragment
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
                    "source": ShaderChunk_1.webgl2_normalMatrix_noInstance_vertex
                }
            },
            "send": {}
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
                    "source": ShaderChunk_1.gbuffer_common_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.gbuffer_common_fragment
                }
            }
        },
        "GBufferSetWorldPositionShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.gbuffer_setWorldPosition_vertex
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
                    "source": ShaderChunk_1.webgl2_diffuseMap_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl2_diffuseMap_fragment
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
                    "source": ShaderChunk_1.webgl2_noDiffuseMap_fragment
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
                    "source": ShaderChunk_1.webgl2_specularMap_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl2_specularMap_fragment
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
                    "source": ShaderChunk_1.webgl2_noSpecularMap_fragment
                }
            }
        },
        "GBufferNoNormalMapShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.webgl2_gbuffer_noNormalMap_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.webgl2_gbuffer_noNormalMap_fragment
                }
            }
        },
        "GBufferShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.gbuffer_vertex
                },
                "fs": {
                    "source": ShaderChunk_1.gbuffer_fragment
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
                    "source": ShaderChunk_1.gbuffer_end_fragment
                },
            }
        },
        "DeferLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_common
                }
            }
        },
        "NoLightMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl2_noLightMap_fragment
                }
            }
        },
        "NoEmissionMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl2_noEmissionMap_fragment
                }
            }
        },
        "NoShadowMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl2_noShadowMap_fragment
                }
            }
        },
        "DeferLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl2_deferLightPass_noNormalMap_fragment
                }
            }
        },
        "DeferLightPassShaderLib": {
            "glsl": {
                "vs": {
                    "source": ShaderChunk_1.deferLightPass_vertex
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
                    "source": ShaderChunk_1.deferLightPass_end_fragment
                },
            }
        },
        "DeferAmbientLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_ambientLight_fragment
                }
            },
            "send": {}
        },
        "DeferDirectionLightPointLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_directionLight_pointLight_common
                }
            }
        },
        "DeferDirectionLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_directionLight_common
                }
            }
        },
        "DeferDirectionLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl2_deferLightPass_directionLight_noNormalMap_fragment
                }
            }
        },
        "DeferDirectionLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_directionLight_fragment
                }
            },
            "send": {}
        },
        "DeferPointLightPassCommonShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_pointLight_common
                }
            }
        },
        "DeferPointLightPassNoNormalMapShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.webgl2_deferLightPass_pointLight_noNormalMap_fragment
                }
            }
        },
        "DeferPointLightPassShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.deferLightPass_pointLight_fragment
                }
            },
            "send": {}
        },
        "EndShaderLib": {}
    }
};
//# sourceMappingURL=shaderLib_generator.js.map