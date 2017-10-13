export declare const initMapManagers: (gl: WebGLRenderingContext, TextureData: any) => void;
export declare const initMapManager: (gl: WebGLRenderingContext, materialIndex: number, MapManagerData: any, TextureData: any) => void;
export declare const setMap: Function;
export declare const getMaterialTextureList: (MapManagerData: any) => any;
export declare const getMapCount: (materialIndex: number, MapManagerDataFromSystem: any) => any;
export declare const bindAndUpdate: (gl: WebGLRenderingContext, mapCount: number, startTextureIndex: number, definedStartTextureUnitIndex: number, TextureCacheData: any, TextureData: any, MapManagerData: any, GPUDetectData: any) => void;
export declare const dispose: (materialSourceIndex: number, materialLastComponentIndex: number, MapManagerData: any) => void;
export declare const initData: (TextureCacheData: any, TextureData: any, MapManagerData: any) => void;
