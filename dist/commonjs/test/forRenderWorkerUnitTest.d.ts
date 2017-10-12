export declare const initDeviceManagerWorkerData: (DeviceManagerDataFromSystem: any) => void;
export declare const initProgramWorkerData: (ProgramDataFromSystem: any) => void;
export declare const initWebGL1GLSLSenderWorkerData: (GLSLSenderDataFromSystem: any) => void;
export declare const initWebGL2GLSLSenderWorkerData: (GLSLSenderDataFromSystem: any) => void;
export declare const initWebGL1LocationWorkerData: (LocationDataFromSystem: any) => void;
export declare const initWebGL2LocationWorkerData: (LocationDataFromSystem: any) => void;
export declare const initWebGL1ShaderWorkerData: (ShaderDataFromSystem: any) => void;
export declare const initWebGL2ShaderWorkerData: (ShaderDataFromSystem: any) => void;
export declare const initWebGL1LightWorkerData: (lightData: {
    ambientLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
    };
    directionLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
        directionLightGLSLDataStructureMemberNameArr: {
            position: string;
            color: string;
            intensity: string;
        }[];
    };
    pointLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
        pointLightGLSLDataStructureMemberNameArr: {
            position: string;
            color: string;
            intensity: string;
            constant: string;
            linear: string;
            quadratic: string;
            range: string;
        }[];
    };
}, AmbientLightDataFromSystem: any, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any) => void;
export declare const initWebGL2LightWorkerData: (lightData: {
    directionLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
    };
    pointLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
    };
}, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any) => void;
export declare const initDrawRenderCommandBufferWorkerData: (BasicDrawRenderCommandBufferDataFromSystem: any, LightDrawRenderCommandBufferDataFromSystem: any) => void;
export declare const initArrayBufferWorkerData: (ArrayBufferDataFromSystemFromSystem: any) => void;
export declare const initIndexBufferWorkerData: (IndexBufferDataFromSystem: any) => void;
export declare const initVaoWorkerData: (VaoDataFromSystem: any) => void;
export declare const initWorkerDataWhenInitGL: () => void;
export declare const getDirectionLightPositionInShaderWorker: (index: number, DirectionLightDataFromSystem: any) => any;
export declare const getPointLightPositionInShaderWorker: (index: number, PointLightDataFromSystem: any) => any;
export declare const updateTextureWorker: (gl: WebGLRenderingContext, textureIndex: number, TextureWorkerData: any) => void;
