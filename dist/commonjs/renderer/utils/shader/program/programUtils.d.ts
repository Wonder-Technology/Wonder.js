import { RenderCommandUniformData } from "../../../type/dataType";
export declare var use: Function;
export declare var disableVertexAttribArray: Function;
export declare var getMaterialShaderLibConfig: Function;
export declare var registerProgram: (shaderIndex: number, ProgramDataFromSystem: any, program: WebGLProgram) => void;
export declare var getProgram: Function;
export declare var isProgramExist: (program: WebGLProgram) => boolean;
export declare var initShader: (program: WebGLProgram, vsSource: string, fsSource: string, gl: WebGLRenderingContext) => void;
export declare var sendAttributeData: (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, getVertices: Function, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryWorkerData: any, ArrayBufferData: any) => void;
export declare var sendUniformData: (gl: WebGLRenderingContext, shaderIndex: number, {getUniformData, sendMatrix4, sendVector3, sendFloat1}: {
    getUniformData: any;
    sendMatrix4: any;
    sendVector3: any;
    sendFloat1: any;
}, MaterialWorkerData: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, renderCommandUniformData: RenderCommandUniformData) => void;
export declare var initData: (ProgramDataFromSystem: any) => void;
