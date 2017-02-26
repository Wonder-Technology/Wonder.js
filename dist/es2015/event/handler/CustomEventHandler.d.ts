import { EventHandler } from "./EventHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { Event } from "../object/Event";
export declare class CustomEventHandler extends EventHandler {
    static getInstance(): any;
    private constructor();
    on(eventName: string, handler: Function, priority: number): void;
    on(target: EntityObject, eventName: string, handler: Function, priority: number): void;
    off(eventName: string): void;
    off(uid: number, eventName: string): void;
    off(eventName: string, handler: Function): void;
    off(target: EntityObject, eventName: string, handler: Function): void;
    trigger(event: Event): boolean;
    trigger(event: Event, userData: any): boolean;
    trigger(target: EntityObject, event: Event, notSetTarget: boolean): boolean;
    trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): boolean;
    private _triggerEventHandler(event, userData);
    private _triggerTargetAndEventHandler(target, event, userData, notSetTarget);
    private _setUserData(event, userData);
}
