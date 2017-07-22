import { Component } from "../../../component/Component";
import { IUIDEntity } from "./IUIDEntity";
export declare class GameObjectData {
    static uid: number;
    static disposeCount: number;
    static componentMap: GameObjectComponentMap;
    static parentMap: GameObjectParentMap;
    static childrenMap: GameObjectChildrenMap;
    static aliveUIDArray: Array<number>;
}
export declare type GameObjectComponentMap = {
    [uid: number]: GameObjectComponentData;
};
export declare type GameObjectComponentData = {
    [typeId: number]: Component;
};
export declare type GameObjectParentMap = {
    [uid: number]: IUIDEntity;
};
export declare type GameObjectChildrenMap = {
    [uid: number]: Array<IUIDEntity>;
};
export declare type GameObjectUIDMap = {
    [uid: number]: boolean;
};
