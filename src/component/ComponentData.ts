import { Component } from "./Component";
import { GameObject } from "../core/entityObject/gameObject/GameObject";

export class ComponentData{
    public static addComponentHandleMap:AddComponentHandleMap = {};
    public static disposeHandleMap:DisposeHandleMap = {};
}

export type AddComponentHandleMap = {
    [typeID:string]:(component:Component, gameObject:GameObject) => void;
}

export type DisposeHandleMap = {
    [typeID:string]:(component:Component) => void;
}

export type ComponentGameObjectMap = {
    [index:number]: GameObject;
}
