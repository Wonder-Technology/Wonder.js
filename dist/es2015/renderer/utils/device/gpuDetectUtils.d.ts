import { Map } from "immutable";
export declare var detectExtension: (state: Map<any, any>, gl: any, GPUDetectDataFromSystem: any) => void;
export declare var detectCapabilty: (state: Map<any, any>, gl: any, GPUDetectDataFromSystem: any) => void;
export declare var getExtension: (name: string, state: Map<any, any>, gl: any) => any;
export declare var hasExtensionUintIndices: (GPUDetectDataFromSystem: any) => boolean;
export declare var getMaxTextureUnit: (GPUDetectDataFromSystem: any) => any;
export declare var getPrecision: (GPUDetectDataFromSystem: any) => any;
export declare var hasExtension: (extension: any) => boolean;
