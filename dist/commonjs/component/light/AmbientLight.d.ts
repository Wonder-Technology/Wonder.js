import { Light } from "./Light";
import { Color } from "../../structure/Color";
export declare class AmbientLight extends Light {
}
export declare const createAmbientLight: () => any;
export declare const getAmbientLightGameObject: Function;
export declare const getAmbientLightColor: (light: AmbientLight) => Color;
export declare const setAmbientLightColor: (light: AmbientLight, color: Color) => void;
