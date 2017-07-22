import { Light } from "./Light";
import { Color } from "../../structure/Color";
export declare class AmbientLight extends Light {
}
export declare var createAmbientLight: () => any;
export declare var getAmbientLightGameObject: Function;
export declare var getAmbientLightColor: (light: AmbientLight) => Color;
export declare var setAmbientLightColor: (light: AmbientLight, color: Color) => void;
