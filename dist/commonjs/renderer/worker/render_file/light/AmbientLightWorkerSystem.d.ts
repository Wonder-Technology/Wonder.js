export declare const getColorArr3: (index: number, AmbientLightDataFromSystem: any) => number[];
export declare const initData: ({buffer, bufferCount, lightCount}: {
    buffer: any;
    bufferCount: any;
    lightCount: any;
}, AmbientLightWorkerData: any) => void;
export declare const isColorDirty: (index: number, AmbientLightDataFromSystem: any) => boolean;
export declare const cleanColorDirty: (index: number, AmbientLightDataFromSystem: any) => void;
