import { TextureInitWorkerData } from "../../../type/messageDataType";
export declare var initMapManagers: (gl: WebGLRenderingContext, TextureWorkerData: any) => void;
export declare var getMapCount: (materialIndex: number, MapManagerWorkerData: any) => any;
export declare var bindAndUpdate: (gl: WebGLRenderingContext, mapCount: number, startIndex: number, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, GPUDetectWorkerData: any) => void;
export declare var initData: (textureData: TextureInitWorkerData, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any) => void;
