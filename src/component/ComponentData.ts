import { Component } from "./Component";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { Map } from "immutable";

export class ComponentData{
    public static addComponentHandleMap:AddComponentHandleMap = {};
    public static disposeHandleMap:DisposeHandleMap = {};
    public static initHandleMap:InitHandleMap = {};
}

export type AddComponentHandleMap = {
    [typeID:string]:(component:Component, gameObject:GameObject) => void;
}

export type DisposeHandleMap = {
    [typeID:string]:(component:Component) => void;
}

export type InitHandleMap = {
    [typeID:string]:(index:number, state:Map<any, any>) => void;
}

export type ComponentGameObjectMap = {
    [index:number]: GameObject;
}
