export type WebGL2LightInitWorkerData = {
    // ambientLightData: {
    //     buffer: SharedArrayBuffer;
    //     bufferCount: number;
    //     lightCount: number;
    // };
    // directionLightData: {
    //     buffer: SharedArrayBuffer;
    //     bufferCount: number;
    //     lightCount: number;
    //     directionLightGLSLDataStructureMemberNameArr: Array<DirectionLightGLSLDataStructure>;
    // };
    pointLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
        // pointLightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure>;
    }
}


