/// <reference types="wonder-commonlib" />
import { DomEventHandler } from "./DomEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { DomEvent } from "../object/DomEvent";
import { IEventData } from "../interface/IEventData";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { MouseEvent } from "../object/MouseEvent";
import { TouchEvent } from "../object/TouchEvent";
export declare abstract class PointEventHandler extends DomEventHandler {
    on(eventName: EEventName, handler: (event: DomEvent) => void, priority: number): any;
    on(dom: HTMLElement, eventName: EEventName, handler: (event: DomEvent) => void, priority: number): any;
    protected abstract createEventObject(dom: HTMLElement, event: IEventData, eventName: EEventName): DomEvent;
    protected getDefaultDom(): HTMLElement;
    protected triggerDomEvent(dom: HTMLElement, event: IEventData, eventName: EEventName): void;
    protected createEventData(): Hash<any>;
    protected handleMove(handler: (event: MouseEvent | TouchEvent) => void): (event: MouseEvent | TouchEvent, eventData: Hash<any>) => void;
    private _copyEventDataToEventObject(event, eventData);
    private _saveLocation(event, eventData);
}
