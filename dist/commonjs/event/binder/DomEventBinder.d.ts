import { EventBinder } from "./EventBinder";
import { EEventName } from "../object/EventNameHandler";
export declare class DomEventBinder extends EventBinder {
    static getInstance(): any;
    private constructor();
    on(eventName: EEventName | string, handler: Function): void;
    on(eventName: EEventName | string, handler: Function, priority: number): void;
    on(dom: HTMLElement, eventName: EEventName | string, handler: Function): void;
    on(dom: HTMLElement, eventName: EEventName | string, handler: Function, priority: number): void;
    off(): void;
    off(eventName: EEventName | string): void;
    off(dom: HTMLElement): void;
    off(eventName: EEventName | string, handler: Function): void;
    off(dom: HTMLElement, eventName: EEventName): void;
    off(dom: HTMLElement, eventName: EEventName, handler: Function): void;
}
