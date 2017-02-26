export declare const empty: GLSLChunk;
export declare const NULL: number;
export declare const basic_materialColor_fragment: GLSLChunk;
export declare const end_basic_fragment: GLSLChunk;
export declare const common_define: GLSLChunk;
export declare const common_fragment: GLSLChunk;
export declare const common_function: GLSLChunk;
export declare const common_vertex: GLSLChunk;
export declare const highp_fragment: GLSLChunk;
export declare const lowp_fragment: GLSLChunk;
export declare const mediump_fragment: GLSLChunk;
export declare type GLSLChunk = {
    top?: string;
    define?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
};
