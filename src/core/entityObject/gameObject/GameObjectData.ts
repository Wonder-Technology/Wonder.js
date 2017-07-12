import { Component } from "../../../component/Component";
import { IUIDEntity } from "./IUIDEntity";

export class GameObjectData {
    public static uid: number = null;
    public static disposeCount: number = null;

    // public static isAliveMap:GameObjectIsAliveMap = null;

    public static componentMap: GameObjectComponentMap = null;
    public static parentMap: GameObjectParentMap = null;
    public static childrenMap: GameObjectChildrenMap = null;

    public static aliveUIDArray: Array<number> = null;

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
    [uid: number]: IUIDEntity
}

export type GameObjectChildrenMap = {
    [uid: number]: Array<IUIDEntity>
}

export type GameObjectUIDMap = {
    [uid: number]: boolean;
}
