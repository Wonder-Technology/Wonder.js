export declare type WebGL2LightInitWorkerData = {
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
};
export declare type WebGL2RenderInitWorkerData = {
    deferShading: {
        isInit: boolean;
    };
};
