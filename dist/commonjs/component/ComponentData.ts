import { Component } from "./Component";
import { Map as MapImmutable } from "immutable";
import { IUIDEntity } from "../core/entityObject/gameObject/IUIDEntity";

export class ComponentData {
    public static addComponentHandleMap: AddComponentHandleMap = {};
    public static disposeHandleMap: DisposeHandleMap = {};
    public static initHandleMap: InitHandleMap = {};
}

export type AddComponentHandleMap = {
    [typeID: string]: (component: Component, gameObject: IUIDEntity) => void;
}

export type DisposeHandleMap = {
    [typeID: string]: (component: Component) => void;
}

export type InitHandleMap = {
    [typeID: string]: (index: number, state: MapImmutable<any, any>) => void;
}

export type ComponentGameObjectMap = {
    [index: number]: IUIDEntity;
}
