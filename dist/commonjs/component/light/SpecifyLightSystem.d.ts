import { Color } from "../../structure/Color";
import { Light } from "./Light";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
export declare var create: Function;
export declare var addComponent: (component: Light, gameObject: GameObject, SpecifyLightData: any) => void;
export declare var setColor: (index: number, color: Color, colors: Float32Array) => void;
export declare var disposeComponent: Function;
export declare var initData: (buffer: any, SpecifyLightData: any) => void;
export declare var createDefaultColor: () => Color;
export declare var getPosition: (index: number, ThreeDTransformData: any, GameObjectData: any, SpecifyLightData: any) => any;
export declare var getGameObject: (index: number, SpecifyLightData: any) => IUIDEntity;