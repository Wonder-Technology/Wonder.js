export declare var initDeviceManagerWorkerData: (DeviceManagerDataFromSystem: any) => void;
export declare var initProgramWorkerData: (ProgramDataFromSystem: any) => void;
export declare var initWebGL1GLSLSenderWorkerData: (GLSLSenderDataFromSystem: any) => void;
export declare var initWebGL2GLSLSenderWorkerData: (GLSLSenderDataFromSystem: any) => void;
export declare var initWebGL1LocationWorkerData: (LocationDataFromSystem: any) => void;
export declare var initWebGL2LocationWorkerData: (LocationDataFromSystem: any) => void;
export declare var initWebGL1ShaderWorkerData: (ShaderDataFromSystem: any) => void;
export declare var initWebGL2ShaderWorkerData: (ShaderDataFromSystem: any) => void;
export declare var initWebGL1LightWorkerData: (lightData: {
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
export declare var initWebGL2LightWorkerData: (lightData: {
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
export declare var initDrawRenderCommandBufferWorkerData: (BasicDrawRenderCommandBufferDataFromSystem: any, LightDrawRenderCommandBufferDataFromSystem: any) => void;
export declare var initArrayBufferWorkerData: (ArrayBufferDataFromSystemFromSystem: any) => void;
export declare var initIndexBufferWorkerData: (IndexBufferDataFromSystem: any) => void;
export declare var initVaoWorkerData: (VaoDataFromSystem: any) => void;
export declare var getDirectionLightPositionInShaderWorker: (index: number, DirectionLightDataFromSystem: any) => any;
export declare var getPointLightPositionInShaderWorker: (index: number, PointLightDataFromSystem: any) => any;
export declare var updateTextureWorker: (gl: WebGLRenderingContext, textureIndex: number, TextureWorkerData: any) => void;
