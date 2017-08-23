import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";

export class DirectionLightWorkerData extends SpecifyLightWorkerData {
    public static intensities: Float32Array = null;
    public static isPositionDirtys: Uint8Array = null;
    public static isIntensityDirtys: Uint8Array = null;
}

