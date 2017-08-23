import { Component } from "./Component";
import { Map as MapImmutable } from "immutable";
import { IUIdEntity } from "../core/entityObject/gameObject/IUIdEntity";
export declare class ComponentData {
    static addComponentHandleMap: AddComponentHandleMap;
    static disposeHandleMap: DisposeHandleMap;
    static initHandleMap: InitHandleMap;
}
export declare type AddComponentHandleMap = {
    [typeId: string]: (component: Component, gameObject: IUIdEntity) => void;
};
export declare type DisposeHandleMap = {
    [typeId: string]: (component: Component) => void;
};
export declare type InitHandleMap = {
    [typeId: string]: (index: number, state: MapImmutable<any, any>) => void;
};
export declare type ComponentGameObjectMap = {
    [index: number]: IUIdEntity;
};
