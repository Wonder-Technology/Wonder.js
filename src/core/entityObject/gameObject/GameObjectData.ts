import { GameObject } from "./GameObject";
import { DataOrientedComponent } from "../../../component/DataOrientedComponent";

export class GameObjectData{
    public static uid:number = 0;

    public static isAliveMap:GameObjectIsAliveMap = {};

    public static componentMap:GameObjectComponentMap = {};
    public static parentMap:GameObjectParentMap = {};
    public static childrenMap:GameObjectChildrenMap = {};

    //todo add name,tag map
}

export type GameObjectIsAliveMap = {
    [uid:string]:boolean;
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
