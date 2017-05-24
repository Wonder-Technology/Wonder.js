import {
    basic_materialColor_fragment, end_basic_fragment, common_define, common_fragment, common_function, common_vertex,
    GLSLChunk
} from "../shader/chunk/ShaderChunk";
import { getAlphaTest, isPropertyExist } from "../../component/material/MaterialSystem";
import { setPos_mvp } from "../shader/snippet/ShaderSnippet";
import { MaterialData } from "../../component/material/MaterialData";

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
                    "source": basic_materialColor_fragment
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
                    "body": setPos_mvp
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
                "func": (materialIndex:number) => {
                    var alphaTest = getAlphaTest(materialIndex, MaterialData);

                    if (isPropertyExist(alphaTest)) {
                        return {
                            "fs": {
                                "body": `if (gl_FragColor.a < ${alphaTest}){
    discard;
}\n`
                            }
                        }
                    }

                    return void 0;
                }
            }
        },
        "EndShaderLib": {
            "glsl": {
                "fs": {
                    "source":end_basic_fragment
                }
            }
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
        func?: (materialIndex:number) => IGLSLFuncConfig | null
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
    define?:string;

    //todo support extension
    // define?: {
    //     name:string;
    //     value:any;
    // },
    // extension?:string,
}

export interface IGLSLFuncConfig {
    vs?:IGLSLFuncGLSLConfig,
    fs?:IGLSLFuncGLSLConfig
}

export interface IGLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?:string;
}

export interface IShaderLibSendConfig {
    attribute?: Array<ISendAttributeConfig>;
    uniform?: Array<ISendUniformConfig>;
}

export interface ISendAttributeConfig{
    name:string;
    buffer:string;
    type:"vec3";
}

export interface ISendUniformConfig{
    name:string;
    field:string;
    type: "float" | "vec3" | "mat4";
    from?: "cmd" | "material";
}
