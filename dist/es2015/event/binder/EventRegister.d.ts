/// <reference types="wonder-commonlib" />
import { EventListenerMap } from "../structure/EventListenerMap";
import { EEventName } from "../object/EventNameHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
export declare abstract class EventRegister {
    protected abstract listenerMap: EventListenerMap;
    abstract register(...args: any[]): void;
    abstract remove(...args: any[]): any;
    getEventRegisterDataList(eventName: EEventName): any;
    getEventRegisterDataList(currentTarget: EntityObject, eventName: EEventName): any;
    getEventRegisterDataList(dom: HTMLElement, eventName: EEventName): any;
    forEachAll(func: (list: Collection<any>, eventName: EEventName) => void): void;
    forEachEventName(func: (list: Collection<EventRegisterData>, eventName: EEventName) => void): void;
    clear(): void;
    getChild(target: EntityObject): any;
    getChild(dom: HTMLElement): any;
    getChild(target: EntityObject, eventName: EEventName): any;
    getChild(dom: HTMLElement, eventName: EEventName): any;
}
export declare type EventRegisterData = {
    originHandler: Function;
    handler: Function;
    domHandler: Function;
    priority: number;
};
