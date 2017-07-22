import { Component } from "./Component";
import { Map as MapImmutable } from "immutable";
import { IUIDEntity } from "../core/entityObject/gameObject/IUIDEntity";
export declare class ComponentData {
    static addComponentHandleMap: AddComponentHandleMap;
    static disposeHandleMap: DisposeHandleMap;
    static initHandleMap: InitHandleMap;
}
export declare type AddComponentHandleMap = {
    [typeID: string]: (component: Component, gameObject: IUIDEntity) => void;
};
export declare type DisposeHandleMap = {
    [typeID: string]: (component: Component) => void;
};
export declare type InitHandleMap = {
    [typeID: string]: (index: number, state: MapImmutable<any, any>) => void;
};
export declare type ComponentGameObjectMap = {
    [index: number]: IUIDEntity;
};
