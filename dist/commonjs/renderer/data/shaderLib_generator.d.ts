import { GLSLChunk } from "../shader/chunk/ShaderChunk";
export declare const shaderLib_generator: {
    "shaderLibs": {
        "CommonShaderLib": {
            "glsl": {
                "vs": {
                    "source": GLSLChunk;
                    "define": string;
                    "funcDefine": string;
                };
                "fs": {
                    "source": GLSLChunk;
                    "define": string;
                    "funcDefine": string;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "VerticeCommonShaderLib": {
            "send": {
                "attribute": {
                    "name": string;
                    "buffer": string;
                    "type": string;
                }[];
            };
        };
        "BasicMaterialColorShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "BasicShaderLib": {
            "glsl": {
                "vs": {
                    "body": string;
                };
            };
            "send": {
                "uniform": {
                    "name": string;
                    "from": string;
                    "field": string;
                    "type": string;
                }[];
            };
        };
        "EndBasicShaderLib": {
            "glsl": {
                "func": (materialIndex: number) => {
                    "fs": {
                        "body": string;
                    };
                };
            };
        };
        "EndShaderLib": {
            "glsl": {
                "fs": {
                    "source": GLSLChunk;
                };
            };
        };
    };
};
export interface IShaderLibGenerator {
    shaderLibs: IShaderLibContentGenerator;
}
export interface IShaderLibContentGenerator {
    [shaderLibName: string]: IShaderLibConfig;
}
export interface IShaderLibConfig {
    glsl?: {
        vs?: IGLSLConfig;
        fs?: IGLSLConfig;
        func?: (materialIndex: number) => IGLSLFuncConfig | null;
    };
    send?: IShaderLibSendConfig;
}
export interface IGLSLConfig {
    source?: GLSLChunk;
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}
export interface IGLSLFuncConfig {
    vs?: IGLSLFuncGLSLConfig;
    fs?: IGLSLFuncGLSLConfig;
}
export interface IGLSLFuncGLSLConfig {
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
}
export interface IShaderLibSendConfig {
    attribute?: Array<ISendAttributeConfig>;
    uniform?: Array<ISendUniformConfig>;
}
export interface ISendAttributeConfig {
    name: string;
    buffer: string;
    type: "vec3";
}
export interface ISendUniformConfig {
    name: string;
    field: string;
    type: "float" | "vec3" | "mat4";
    from?: "cmd" | "material";
}
