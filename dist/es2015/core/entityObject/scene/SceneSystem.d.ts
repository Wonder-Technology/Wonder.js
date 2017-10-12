import { GameObject } from "../gameObject/GameObject";
import { Scene } from "./Scene";
export declare const create: (GameObjectData: any) => any;
export declare const addChild: (scene: Scene, child: GameObject, ThreeDTransformData: any, GameObjectData: any, SceneData: any) => void;
export declare const removeChild: (parentUId: number, childUId: number, ThreeDTransformData: any, GameObjectData: any) => void;
export declare const getCurrentCamera: Function;
export declare const initData: (SceneData: any) => void;
