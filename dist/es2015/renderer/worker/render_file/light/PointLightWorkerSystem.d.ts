import { Color } from "../../../../structure/Color";
export declare var setPositionArr: (positionArr: Float32Array[], PointLightWorkerData: any) => void;
export declare var getColor: (index: number, PointLightDataFromSystem: any) => Color;
export declare var getColorArr3: (index: number, PointLightDataFromSystem: any) => number[];
export declare var getIntensity: (index: number, PointLightDataFromSystem: any) => number;
export declare var getConstant: (index: number, PointLightDataFromSystem: any) => number;
export declare var getLinear: (index: number, PointLightDataFromSystem: any) => number;
export declare var getQuadratic: (index: number, PointLightDataFromSystem: any) => number;
export declare var getRange: (index: number, PointLightDataFromSystem: any) => number;
export declare var initData: ({buffer, bufferCount, lightCount, pointLightGLSLDataStructureMemberNameArr}: {
    buffer: any;
    bufferCount: any;
    lightCount: any;
    pointLightGLSLDataStructureMemberNameArr: any;
}, PointLightWorkerData: any) => void;
