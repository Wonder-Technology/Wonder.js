import { Component } from "../../../component/Component";
import { IUIdEntity } from "./IUIdEntity";
export declare class GameObjectData {
    static uid: number;
    static disposeCount: number;
    static componentMap: GameObjectComponentMap;
    static parentMap: GameObjectParentMap;
    static childrenMap: GameObjectChildrenMap;
    static aliveUIdArray: Array<number>;
}
export declare type GameObjectComponentMap = {
    [uid: number]: GameObjectComponentData;
};
export declare type GameObjectComponentData = {
    [componentId: number]: Component;
};
export declare type GameObjectParentMap = {
    [uid: number]: IUIdEntity;
};
export declare type GameObjectChildrenMap = {
    [uid: number]: Array<IUIdEntity>;
};
export declare type GameObjectUIdMap = {
    [uid: number]: boolean;
};
