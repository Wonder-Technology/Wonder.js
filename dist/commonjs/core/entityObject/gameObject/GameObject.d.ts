import { IUIdEntity } from "./IUIdEntity";
export declare class GameObject implements IUIdEntity {
    uid: number;
}
export declare var createGameObject: () => any;
export declare var addGameObjectComponent: Function;
export declare var disposeGameObject: Function;
export declare var initGameObject: Function;
export declare var disposeGameObjectComponent: Function;
export declare var getGameObjectComponent: Function;
export declare var getGameObjectTransform: (gameObject: GameObject) => any;
export declare var hasGameObjectComponent: Function;
export declare var isGameObjectAlive: (gameObject: GameObject) => boolean;
export declare var addGameObject: Function;
export declare var addRemovedGameObject: Function;
export declare var removeGameObject: Function;
export declare var hasGameObject: Function;
export declare var getGameObjectChildren: Function;
export declare var getGameObjectParent: Function;
