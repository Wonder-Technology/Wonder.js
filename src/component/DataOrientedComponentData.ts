import { DataOrientedComponent } from "./DataOrientedComponent";
import { GameObject } from "../core/entityObject/gameObject/GameObject";

export class DataOrientedComponentData{
    public static addComponentHandleMap:AddComponentHandleMap = {};
    public static disposeHandleMap:DisposeHandleMap = {};
}

export type AddComponentHandleMap = {
    [typeID:string]:(component:DataOrientedComponent, gameObject:GameObject) => void;
}

export type DisposeHandleMap = {
    [typeID:string]:(component:DataOrientedComponent) => void;
}
