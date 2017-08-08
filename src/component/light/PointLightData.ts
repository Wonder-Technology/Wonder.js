import { SpecifyLightData } from "./SpecifyLightData";

export abstract class PointLightData extends SpecifyLightData {
    public static intensities: Float32Array = null;
    public static constants: Float32Array = null;
    public static linears: Float32Array = null;
    public static quadratics: Float32Array = null;
    public static ranges: Uint16Array = null;

    public static defaultIntensity: number = null;
    public static defaultConstant: number = null;
    public static defaultLinear: number = null;
    public static defaultQuadratic: number = null;
    public static defaultRange: number = null;
}
