import { EventRegister } from "./EventRegister";
import { CustomEventListenerMap } from "../structure/CustomEventListenerMap";
import { EEventName } from "../object/EventNameHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
export declare class CustomEventRegister extends EventRegister {
    static getInstance(): any;
    private constructor();
    protected listenerMap: CustomEventListenerMap;
    register(eventName: EEventName, handler: Function, originHandler: Function, domHandler: Function, priority: number): any;
    register(target: EntityObject, eventName: EEventName, handler: Function, originHandler: Function, domHandler: Function, priority: number): any;
    remove(eventName: EEventName): any;
    remove(target: EntityObject): any;
    remove(eventName: EEventName, handler: Function): any;
    remove(uid: number, eventName: EEventName): any;
    remove(target: EntityObject, eventName: EEventName): any;
    remove(target: EntityObject, eventName: EEventName, handler: Function): any;
    setBubbleParent(target: EntityObject, parent: EntityObject): void;
    private _isAllEventHandlerRemoved(target);
    private _handleAfterAllEventHandlerRemoved(target);
}
export declare type CustomEventRegisterData = {
    target: EntityObject;
    originHandler: Function;
    handler: Function;
    domHandler: Function;
    priority: number;
};
