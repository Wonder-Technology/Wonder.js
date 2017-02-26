import { EEventName } from "./EventNameHandler";
import { EEventType } from "./EEventType";
import { EEngineEvent } from "../EEngineEvent";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { EEventPhase } from "./EEventPhase";
export declare abstract class Event {
    protected constructor(eventName: EEventName);
    readonly abstract type: EEventType;
    name: string | EEventName | EEngineEvent;
    target: HTMLElement | EntityObject;
    currentTarget: HTMLElement | EntityObject;
    isStopPropagation: boolean;
    phase: EEventPhase;
    abstract clone(): any;
    stopPropagation(): void;
    protected copyMember(destination: Event, source: Event, memberArr: [any]): Event;
}
