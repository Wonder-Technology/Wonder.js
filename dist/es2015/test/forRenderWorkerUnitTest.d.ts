export declare var initDeviceManagerWorkerData: (DeviceManagerDataFromSystem: any) => void;
export declare var initProgramWorkerData: (ProgramDataFromSystem: any) => void;
export declare var initGLSLSenderWorkerData: (GLSLSenderDataFromSystem: any) => void;
export declare var initLocationWorkerData: (LocationDataFromSystem: any) => void;
export declare var initShaderWorkerData: (ShaderWorkerData: any) => void;
export declare var initLightWorkerData: (lightData: {
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
export declare var initDrawRenderCommandBufferWorkerData: (DrawRenderCommandBufferDataFromSystem: any) => void;
export declare var getDirectionLightPositionInShaderWorker: (index: number, drawDataMap: {
    DeviceManagerDataFromSystem: any;
    TextureDataFromSystem: any;
    TextureCacheDataFromSystem: any;
    MapManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandBufferDataFromSystem: any;
}) => any;
export declare var getPointLightPositionInShaderWorker: (index: number, drawDataMap: {
    DeviceManagerDataFromSystem: any;
    TextureDataFromSystem: any;
    TextureCacheDataFromSystem: any;
    MapManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandBufferDataFromSystem: any;
}) => any;
export declare var updateTextureWorker: (gl: WebGLRenderingContext, textureIndex: number, TextureWorkerData: any) => void;
