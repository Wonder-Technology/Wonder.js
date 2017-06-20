"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderChunk_1 = require("../shader/chunk/ShaderChunk");
var ShaderSnippet_1 = require("../shader/snippet/ShaderSnippet");
exports.shaderLib_generator = {
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
                        "name": "u_mMatrix",
                        "field": "mMatrix",
                        "type": "mat4"
                    },
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
                    "source": ShaderChunk_1.basic_materialColor_fragment
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_color",
                        "from": "material",
                        "field": "color",
                        "type": "vec3"
                    }
                ]
            }
        },
        "BasicShaderLib": {
            "glsl": {
                "vs": {
                    "body": ShaderSnippet_1.setPos_mvp
                }
            },
            "send": {
                "uniform": [
                    {
                        "name": "u_opacity",
                        "from": "material",
                        "field": "opacity",
                        "type": "float"
                    }
                ]
            }
        },
        "EndBasicShaderLib": {
            "glsl": {
                "func": function (materialIndex, _a, MaterialDataFromSystem) {
                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
                    if (isTestAlpha(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n"
                            }
                        };
                    }
                    return void 0;
                }
            }
        },
        "EndShaderLib": {
            "glsl": {
                "fs": {
                    "source": ShaderChunk_1.end_basic_fragment
                }
            }
        }
    }
};
//# sourceMappingURL=shaderLib_generator.js.map