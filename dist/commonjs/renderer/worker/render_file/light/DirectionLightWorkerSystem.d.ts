import { Color } from "../../../../structure/Color";
export declare var setPositionArr: (positionArr: Float32Array[], DirectionLightWorkerData: any) => void;
export declare var getColor: (index: number, DirectionLightDataFromSystem: any) => Color;
export declare var getColorArr3: (index: number, DirectionLightDataFromSystem: any) => number[];
export declare var getIntensity: (index: number, DirectionLightDataFromSystem: any) => number;
export declare var initData: ({buffer, bufferCount, lightCount, directionLightGLSLDataStructureMemberNameArr}: {
    buffer: any;
    bufferCount: any;
    lightCount: any;
    directionLightGLSLDataStructureMemberNameArr: any;
}, DirectionLightWorkerData: any) => void;
