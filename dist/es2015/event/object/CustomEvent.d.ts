import { Event } from "./Event";
import { EEventType } from "./EEventType";
import { DomEvent } from "./DomEvent";
export declare class CustomEvent extends Event {
    static create(eventName: string): any;
    static create(eventName: string, userData: any): any;
    constructor(eventName: string);
    constructor(eventName: string, userData: any);
    readonly type: EEventType;
    userData: any;
    copyPublicAttri(destination: any, source: any): any;
    clone(): CustomEvent;
    getDataFromDomEvent(event: DomEvent): void;
}
