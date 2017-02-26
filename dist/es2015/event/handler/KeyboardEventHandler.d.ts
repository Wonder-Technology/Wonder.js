/// <reference types="wonder-commonlib" />
import { DomEventHandler } from "./DomEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { KeyboardEvent } from "../object/KeyboardEvent";
import { IKeyboardEventData } from "../interface/IEventData";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
export declare class KeyboardEventHandler extends DomEventHandler {
    static getInstance(): any;
    private constructor();
    on(eventName: EEventName, handler: (event: KeyboardEvent) => void, priority: number): any;
    on(dom: HTMLElement, eventName: EEventName, handler: (event: KeyboardEvent) => void, priority: number): any;
    protected triggerDomEvent(dom: HTMLElement, event: IKeyboardEventData, eventName: EEventName): void;
    protected getDefaultDom(): HTMLElement;
    protected addEngineHandler(eventName: EEventName, handler: (event: KeyboardEvent) => void): any;
    protected createEventData(): Hash<any>;
    private _handleKeyDown(handler);
    private _handleKeyUp(handler);
    private _copyEventDataToEventObject(event, eventData);
    private _setKeyStateAllFalse(keyState);
    private _createEventObject(dom, event, eventName);
}
