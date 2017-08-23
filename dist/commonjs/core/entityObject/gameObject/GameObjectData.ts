import { Component } from "../../../component/Component";
import { IUIdEntity } from "./IUIdEntity";

export class GameObjectData {
    public static uid: number = null;
    public static disposeCount: number = null;

    // public static isAliveMap:GameObjectIsAliveMap = null;

    public static componentMap: GameObjectComponentMap = null;
    public static parentMap: GameObjectParentMap = null;
    public static childrenMap: GameObjectChildrenMap = null;

    public static aliveUIdArray: Array<number> = null;

    //todo add name map
}

// export type GameObjectIsAliveMap = Map<number, boolean>;

export type GameObjectComponentMap = {
    [uid: number]: GameObjectComponentData
}

export type GameObjectComponentData = {
    [typeId: number]: Component;
}

export type GameObjectParentMap = {
    [uid: number]: IUIdEntity
}

export type GameObjectChildrenMap = {
    [uid: number]: Array<IUIdEntity>
}

export type GameObjectUIdMap = {
    [uid: number]: boolean;
}
