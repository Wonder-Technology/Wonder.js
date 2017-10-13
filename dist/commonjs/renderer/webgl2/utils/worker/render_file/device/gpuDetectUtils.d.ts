import { Map } from "immutable";
export declare const detect: (getGL: Function, DeviceManagerDataFromSystem: any, GPUDetectDataFromSystem: any, state: Map<any, any>) => Map<any, any>;
export declare const getMaxUniformBufferBindings: (GPUDetectDataFromSystem: any) => any;
export declare const hasExtensionColorBufferFloat: (GPUDetectDataFromSystem: any) => boolean;
export declare const initData: (GPUDetectDataFromSystem: any) => void;
