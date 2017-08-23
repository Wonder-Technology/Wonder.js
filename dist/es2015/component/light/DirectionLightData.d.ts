import { SpecifyLightData } from "./SpecifyLightData";
export declare abstract class DirectionLightData extends SpecifyLightData {
    static intensities: Float32Array;
    static isPositionDirtys: Uint8Array;
    static isIntensityDirtys: Uint8Array;
    static defaultIntensity: number;
}
