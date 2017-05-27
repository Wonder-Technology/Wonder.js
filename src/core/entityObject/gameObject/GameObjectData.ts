import { GameObject } from "./GameObject";
import { Component } from "../../../component/Component";

export class GameObjectData{
    public static uid:number = null;
    // public static disposeCount:number = null;

    // public static isAliveMap:GameObjectIsAliveMap = {};
    public static isAliveMap:GameObjectIsAliveMap = null;

    // public static uidMap = new Map<number, boolean>();

    public static componentMap:GameObjectComponentMap = null;
    public static parentMap:GameObjectParentMap = null;
    public static childrenMap:GameObjectChildrenMap = null;

    //todo add name map
}

export type GameObjectIsAliveMap = Map<number, boolean>;

export type GameObjectComponentMap = Map<number, GameObjectComponentData>;

export type GameObjectComponentData = {
    [typeId:number]:Component;
}

export type GameObjectParentMap = Map<number, GameObject>;

export type GameObjectChildrenMap = Map<number, Array<GameObject>>;
