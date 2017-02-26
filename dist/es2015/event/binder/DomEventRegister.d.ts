/// <reference types="wonder-commonlib" />
import { EventRegister } from "./EventRegister";
import { DomEventListenerMap } from "../structure/DomEventListenerMap";
import { EEventName } from "../object/EventNameHandler";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { EntityObject } from "../../core/entityObject/EntityObject";
export declare class DomEventRegister extends EventRegister {
    static getInstance(): any;
    private constructor();
    protected listenerMap: DomEventListenerMap;
    register(dom: HTMLElement, eventName: EEventName, eventData: Hash<any>, handler: Function, originHandler: Function, domHandler: Function, priority: number): void;
    remove(eventName: EEventName): any;
    remove(eventName: EEventName, handler: Function): any;
    remove(dom: HTMLElement, eventName: EEventName): any;
    remove(dom: HTMLElement, eventName: EEventName, handler: Function): any;
    isBinded(dom: HTMLElement, eventName: EEventName): boolean;
    getDomHandler(dom: HTMLElement, eventName: EEventName): Function;
}
export declare type DomEventRegisterData = {
    dom?: HTMLElement;
    target?: EntityObject;
    eventData: Hash<any>;
    originHandler: Function;
    handler: Function;
    domHandler: Function;
    priority: number;
};
