import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";

//todo refactor
export abstract class PointLightWorkerData extends SpecifyLightWorkerData {
    public static intensities: Float32Array = null;
    public static constants: Float32Array = null;
    public static linears: Float32Array = null;
    public static quadratics: Float32Array = null;
    public static ranges: Uint16Array = null;
    public static isPositionDirtys: Uint8Array = null;
    public static isIntensityDirtys: Uint8Array = null;
    public static isAttenuationDirtys: Uint8Array = null;
}
