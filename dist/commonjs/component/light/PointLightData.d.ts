import { SpecifyLightData } from "./SpecifyLightData";
export declare abstract class PointLightData extends SpecifyLightData {
    static intensities: Float32Array;
    static constants: Float32Array;
    static linears: Float32Array;
    static quadratics: Float32Array;
    static ranges: Uint16Array;
    static isPositionDirtys: Uint8Array;
    static isIntensityDirtys: Uint8Array;
    static isAttenuationDirtys: Uint8Array;
    static defaultIntensity: number;
    static defaultConstant: number;
    static defaultLinear: number;
    static defaultQuadratic: number;
    static defaultRange: number;
}
