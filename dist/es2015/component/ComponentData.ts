import { Component } from "./Component";
import { Map as MapImmutable } from "immutable";
import { IUIdEntity } from "../core/entityObject/gameObject/IUIdEntity";

export class ComponentData {
    public static addComponentHandleMap: AddComponentHandleMap = {};
    public static disposeHandleMap: DisposeHandleMap = {};
    public static initHandleMap: InitHandleMap = {};
}

export type AddComponentHandleMap = {
    [typeId: string]: (component: Component, gameObject: IUIdEntity) => void;
}

export type DisposeHandleMap = {
    [typeId: string]: (component: Component) => void;
}

export type InitHandleMap = {
    [typeId: string]: (index: number, state: MapImmutable<any, any>) => void;
}

export type ComponentGameObjectMap = {
    [index: number]: IUIdEntity;
}
