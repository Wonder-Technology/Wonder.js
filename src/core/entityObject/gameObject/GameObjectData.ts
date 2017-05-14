import { GameObject } from "./GameObject";
import { DataOrientedComponent } from "../../../component/DataOrientedComponent";

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
        [typeId:string]:DataOrientedComponent;
    }
}

export type GameObjectParentMap = {
    [uid:string]:GameObject;
}

export type GameObjectChildrenMap = {
    [uid:string]:Array<GameObject>;
}
