import { TypeArr } from "../../../../../type/dataType";
export declare var bindUniformBlock: (gl: any, program: WebGLProgram, blockName: string, bindingPoint: number) => void;
export declare var bindUniformBufferBase: (gl: any, buffer: WebGLBuffer, bindingPoint: number) => void;
export declare var bufferStaticData: (gl: any, data: TypeArr) => void;
export declare var bufferDynamicData: (gl: any, data: TypeArr) => void;
export declare var bufferSubDynamicData: (gl: any, offset: number, data: TypeArr) => void;
