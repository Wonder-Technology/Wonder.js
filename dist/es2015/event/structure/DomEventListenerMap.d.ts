/// <reference types="wonder-commonlib" />
import { EventListenerMap } from "./EventListenerMap";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { DomEventRegisterData } from "../binder/DomEventRegister";
import { EEventName } from "../object/EventNameHandler";
export declare class DomEventListenerMap extends EventListenerMap {
    static create(): DomEventListenerMap;
    private _targetListenerMap;
    hasChild(dom: HTMLElement, eventName: EEventName): boolean;
    appendChild(dom: HTMLElement, eventName: EEventName, data: any): void;
    forEachAll(func: (list: Collection<DomEventRegisterData>, eventName: EEventName) => void): void;
    forEachEventName(func: (list: Collection<DomEventRegisterData>, eventName: EEventName) => void): void;
    clear(): void;
    getChild(dom: HTMLElement): Collection<DomEventRegisterData>;
    getChild(dom: HTMLElement, eventName: EEventName): Collection<DomEventRegisterData>;
    removeChild(eventName: EEventName): Collection<DomEventOffData>;
    removeChild(eventName: EEventName, handler: Function): Collection<DomEventOffData>;
    removeChild(dom: HTMLElement, eventName: EEventName): Collection<DomEventOffData>;
    removeChild(dom: HTMLElement, eventName: EEventName, handler: Function): Collection<DomEventOffData>;
    protected buildFirstLevelKey(dom: HTMLElement): string;
    private _getEventDataOffDataList(eventName, result);
}
export declare type DomEventOffData = {
    dom: HTMLElement;
    eventName: EEventName;
    domHandler: Function;
};
