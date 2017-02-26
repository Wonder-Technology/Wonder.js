import { EventDispatcher } from "./EventDispatcher";
import { Event } from "../object/Event";
import { EntityObject } from "../../core/entityObject/EntityObject";
export declare class CustomEventDispatcher extends EventDispatcher {
    static getInstance(): any;
    private constructor();
    trigger(event: Event): boolean;
    trigger(event: Event, userData: any): boolean;
    trigger(target: EntityObject, event: Event): boolean;
    trigger(target: EntityObject, event: Event, notSetTarget: boolean): boolean;
    trigger(target: EntityObject, event: Event, userData: any): boolean;
    trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): boolean;
    emit(target: EntityObject, eventObject: Event, userData?: any): void;
    broadcast(target: EntityObject, eventObject: Event, userData?: any): void;
    private _triggerWithUserData(target, event, userData, notSetTarget);
}
