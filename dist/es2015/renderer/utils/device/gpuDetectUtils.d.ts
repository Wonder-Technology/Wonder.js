import { Map } from "immutable";
export declare const detectExtension: (state: Map<any, any>, gl: any, GPUDetectDataFromSystem: any) => void;
export declare const detectCapabilty: (state: Map<any, any>, gl: any, GPUDetectDataFromSystem: any) => void;
export declare const getExtension: (name: string, state: Map<any, any>, gl: any) => any;
export declare const hasExtensionUintIndices: (GPUDetectDataFromSystem: any) => boolean;
export declare const getMaxTextureUnit: (GPUDetectDataFromSystem: any) => any;
export declare const getPrecision: (GPUDetectDataFromSystem: any) => any;
export declare const hasExtension: (extension: any) => boolean;
