import { Color } from "../../structure/Color";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";
export declare class Material extends Component {
}
export declare var getMaterialColor: (material: Material) => any;
export declare var setMaterialColor: (material: Material, color: Color) => void;
export declare var getMaterialOpacity: (material: Material) => any;
export declare var setMaterialOpacity: (material: Material, opacity: number) => void;
export declare var getMaterialAlphaTest: (material: Material) => any;
export declare var setMaterialAlphaTest: (material: Material, alphaTest: number) => void;
export declare var getMaterialGameObject: (component: Material) => GameObject;
export declare var getMaterialShader: (material: Material) => any;
export declare var initMaterial: (material: Material) => void;
