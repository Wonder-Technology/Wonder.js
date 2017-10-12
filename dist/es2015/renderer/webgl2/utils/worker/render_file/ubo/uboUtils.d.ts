import { TypeArr } from "../../../../../type/dataType";
export declare const bindUniformBlock: (gl: any, program: WebGLProgram, blockName: string, bindingPoint: number) => void;
export declare const bindUniformBufferBase: (gl: any, buffer: WebGLBuffer, bindingPoint: number) => void;
export declare const bufferStaticData: (gl: any, data: TypeArr) => void;
export declare const bufferDynamicData: (gl: any, data: TypeArr) => void;
export declare const bufferSubDynamicData: (gl: any, offset: number, data: TypeArr) => void;
