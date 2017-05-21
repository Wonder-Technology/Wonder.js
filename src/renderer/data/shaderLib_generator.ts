import { common_define, common_fragment, common_function, common_vertex, GLSLChunk } from "../shader/chunk/ShaderChunk";

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
                "attribute": [
                    {
                        "name": "a_position",
                        "buffer": "vertice"
                    }
                ],
                "uniform": [
                    //todo add more
                    {
                        "name": "u_vMatrix",
//          "from": "cmd",
                        "field": "vMatrix",
                        "type": "mat4"
                    }
                ]
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
    glsl: {
        vs: IGLSLConfig,
        fs: IGLSLConfig
    },
    send: {
        attribute: Array<ISendAttributeConfig>,
        uniform: Array<ISendUniformConfig>
    }
}

export interface IGLSLConfig {
    source: GLSLChunk;
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;

    //todo support define, extension
    // define?: {
    //     name:string;
    //     value:any;
    // },
    // extension?:string,
}

export interface ISendAttributeConfig{
    name:string;
    buffer:string;
}

export interface ISendUniformConfig{
    name:string;
    value:string;
    from?:string;
}
