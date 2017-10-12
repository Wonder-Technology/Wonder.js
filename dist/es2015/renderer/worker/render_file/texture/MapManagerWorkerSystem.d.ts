import { TextureInitWorkerData } from "../../../type/messageDataType";
export declare const initMapManagers: (gl: WebGLRenderingContext, TextureWorkerData: any) => void;
export declare const initNeedInitTextures: (gl: WebGLRenderingContext, needInitedTextureIndexArr: number[], TextureWorkerData: any) => void;
export declare const setMaterialTextureList: (materialTextureList: number[][], MapManagerWorkerData: any) => number[][];
export declare const getMapCount: (materialIndex: number, MapManagerWorkerData: any) => any;
export declare const bindAndUpdate: (gl: WebGLRenderingContext, mapCount: number, startIndex: number, definedStartTextureUnitIndex: number, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, GPUDetectWorkerData: any) => void;
export declare const initData: (textureData: TextureInitWorkerData, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any) => void;
