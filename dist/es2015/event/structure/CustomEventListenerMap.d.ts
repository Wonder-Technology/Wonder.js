/// <reference types="wonder-commonlib" />
import { EventListenerMap } from "./EventListenerMap";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { CustomEventRegisterData } from "../binder/CustomEventRegister";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { EEventName } from "../object/EventNameHandler";
export declare class CustomEventListenerMap extends EventListenerMap {
    static create(): CustomEventListenerMap;
    private _globalListenerMap;
    private _targetRecordMap;
    hasChild(target: EntityObject): boolean;
    appendChild(eventName: EEventName, data: any): any;
    appendChild(target: EntityObject, eventName: EEventName, data: any): any;
    forEachAll(func: (list: Collection<CustomEventRegisterData>, eventName: EEventName) => void): void;
    forEachEventName(func: (list: Collection<CustomEventRegisterData>, eventName: EEventName) => void): void;
    clear(): void;
    getChild(eventName: EEventName): Collection<CustomEventRegisterData>;
    getChild(target: EntityObject): Collection<CustomEventRegisterData>;
    getChild(target: EntityObject, eventName: EEventName): Collection<CustomEventRegisterData>;
    removeChild(eventName: EEventName): void;
    removeChild(target: EntityObject): void;
    removeChild(eventName: EEventName, handler: Function): void;
    removeChild(uid: number, eventName: EEventName): void;
    removeChild(target: EntityObject, eventName: EEventName): void;
    removeChild(target: EntityObject, eventName: EEventName, handler: Function): void;
    protected buildFirstLevelKey(target: EntityObject): any;
    protected buildFirstLevelKey(uid: number): any;
}
