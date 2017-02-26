import { EventBinder } from "./EventBinder";
import { EEventName } from "../object/EventNameHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
export declare class CustomEventBinder extends EventBinder {
    static getInstance(): any;
    private constructor();
    on(eventName: EEventName | string, handler: Function): void;
    on(eventName: EEventName | string, handler: Function, priority: number): void;
    on(target: EntityObject, eventName: EEventName | string, handler: Function): void;
    on(target: EntityObject, eventName: EEventName | string, handler: Function, priority: number): void;
    off(): void;
    off(eventName: EEventName | string): void;
    off(target: EntityObject): void;
    off(eventName: EEventName | string, handler: Function): void;
    off(target: EntityObject, eventName: EEventName | string): void;
    off(target: EntityObject, eventName: EEventName | string, handler: Function): void;
}
