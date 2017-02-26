import { Event } from "./Event";
import { EEventName } from "./EventNameHandler";
import { CustomEvent } from "./CustomEvent";
export declare abstract class DomEvent extends Event {
    constructor(event: any, eventName: EEventName);
    private _event;
    event: any;
    preventDefault(): void;
    getDataFromCustomEvent(event: CustomEvent): void;
}
