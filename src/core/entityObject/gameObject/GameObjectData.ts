import { GameObject } from "./GameObject";

export class GameObjectData{
    public static freeIndiceQueue:Array<number> = [];
    public static generationArr:Array<number> = [];

    public static componentMap:GameObjectComponentMap = {};
    public static parentMap:GameObjectParentMap = {};
    public static childrenMap:GameObjectChildrenMap = {};

    //todo add name,tag map
}

export type GameObjectComponentMap = {
    [uid:string]:{
        [typeId:string]:number;
    }
}

export type GameObjectParentMap = {
    [uid:string]:GameObject;
}

export type GameObjectChildrenMap = {
    [uid:string]:Array<GameObject>;
}
