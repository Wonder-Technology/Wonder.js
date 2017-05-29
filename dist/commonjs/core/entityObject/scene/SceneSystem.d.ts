import { GameObject } from "../gameObject/GameObject";
import { Scene } from "./Scene";
export declare var create: (GameObjectData: any) => any;
export declare var addChild: (scene: Scene, child: GameObject, GameObjectData: any, SceneData: any) => void;
export declare var removeChild: (gameObject: GameObject, child: GameObject, ThreeDTransformData: any, GameObjectData: any) => void;
export declare var getCurrentCamera: Function;
export declare var initData: (SceneData: any) => void;
