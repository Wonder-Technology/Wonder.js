import { IUIdEntity } from "./IUIdEntity";
export declare class GameObject implements IUIdEntity {
    uid: number;
}
export declare const createGameObject: () => any;
export declare const addGameObjectComponent: Function;
export declare const disposeGameObject: Function;
export declare const initGameObject: Function;
export declare const disposeGameObjectComponent: Function;
export declare const getGameObjectComponent: Function;
export declare const getGameObjectTransform: Function;
export declare const getGameObjectMaterial: Function;
export declare const getGameObjectAllComponents: Function;
export declare const hasGameObjectComponent: Function;
export declare const isGameObjectAlive: (gameObject: GameObject) => boolean;
export declare const addGameObject: Function;
export declare const addRemovedGameObject: Function;
export declare const removeGameObject: Function;
export declare const hasGameObject: Function;
export declare const getGameObjectChildren: Function;
export declare const getGameObjectParent: Function;
export declare const setGameObjectParent: Function;
