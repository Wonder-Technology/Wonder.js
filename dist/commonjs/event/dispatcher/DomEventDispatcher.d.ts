import { EventDispatcher } from "./EventDispatcher";
import { Event } from "../object/Event";
export declare class DomEventDispatcher extends EventDispatcher {
    static getInstance(): any;
    private constructor();
    trigger(event: Event): void;
    trigger(dom: HTMLElement, event: Event): void;
}
