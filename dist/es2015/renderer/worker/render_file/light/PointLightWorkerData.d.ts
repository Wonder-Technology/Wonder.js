import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";
export declare abstract class PointLightWorkerData extends SpecifyLightWorkerData {
    static intensities: Float32Array;
    static constants: Float32Array;
    static linears: Float32Array;
    static quadratics: Float32Array;
    static ranges: Uint16Array;
    static isPositionDirtys: Uint8Array;
    static isIntensityDirtys: Uint8Array;
    static isAttenuationDirtys: Uint8Array;
}
