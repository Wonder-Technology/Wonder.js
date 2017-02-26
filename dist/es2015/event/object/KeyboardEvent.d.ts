import { DomEvent } from "./DomEvent";
import { EEventName } from "./EventNameHandler";
import { IKeyboardEventData } from "../interface/IEventData";
import { EEventType } from "./EEventType";
export declare class KeyboardEvent extends DomEvent {
    static create(event: any, eventName: EEventName): KeyboardEvent;
    event: IKeyboardEventData;
    readonly ctrlKey: number;
    readonly altKey: number;
    readonly shiftKey: number;
    readonly metaKey: number;
    readonly keyCode: number;
    readonly key: any;
    readonly type: EEventType;
    keyState: any;
    clone(): KeyboardEvent;
}
