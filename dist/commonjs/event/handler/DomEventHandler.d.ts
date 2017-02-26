/// <reference types="wonder-commonlib" />
import { EventHandler } from "./EventHandler";
import { EEventName } from "../object/EventNameHandler";
import { Event } from "../object/Event";
import { IEventData } from "../interface/IEventData";
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
export declare abstract class DomEventHandler extends EventHandler {
    off(): void;
    off(eventName: EEventName): void;
    off(eventName: EEventName, handler: Function): void;
    off(dom: HTMLElement, eventName: EEventName): void;
    off(dom: HTMLElement, eventName: EEventName, handler: Function): void;
    trigger(event: Event): void;
    trigger(dom: HTMLElement, event: Event): void;
    protected abstract triggerDomEvent(dom: HTMLElement, event: IEventData, eventName: EEventName): any;
    protected abstract addEngineHandler(eventName: EEventName, handler: Function): any;
    protected abstract getDefaultDom(): HTMLElement;
    protected abstract createEventData(): Hash<any>;
    protected clearHandler(): void;
    protected buildDomHandler(dom: HTMLElement, eventName: EEventName): (event: any) => any;
    protected handler(dom: HTMLElement, eventName: EEventName, handler: Function, priority: number): void;
    private _bind(dom, eventName);
    private _unBind(dom, eventName, handler);
}
