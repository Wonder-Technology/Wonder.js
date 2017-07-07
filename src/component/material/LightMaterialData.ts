import { SpecifyMaterialData } from "./SpecifyMaterialData";

export class LightMaterialData extends SpecifyMaterialData{
    public static specularColors: Float32Array = null;
    public static emissionColors: Float32Array = null;
    public static shininess: Float32Array = null;
    public static shadings: Uint8Array = null;
    public static lightModels: Uint8Array = null;

    public static defaultShininess: number = null;
    public static defaultShading: number = null;
    public static defaultLightModel: number = null;
}
