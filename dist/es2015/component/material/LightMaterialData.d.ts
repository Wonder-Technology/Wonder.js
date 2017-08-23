import { SpecifyMaterialData } from "./SpecifyMaterialData";
import { Color } from "../../structure/Color";
export declare class LightMaterialData extends SpecifyMaterialData {
    static specularColors: Float32Array;
    static emissionColors: Float32Array;
    static shininess: Float32Array;
    static shadings: Uint8Array;
    static lightModels: Uint8Array;
    static hasDiffuseMaps: Uint8Array;
    static hasSpecularMaps: Uint8Array;
    static defaultShininess: number;
    static defaultShading: number;
    static defaultLightModel: number;
    static defaultHasMap: number;
    static emptyColor: Color;
    static emptyColorArr: Array<number>;
}
