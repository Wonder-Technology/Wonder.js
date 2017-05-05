import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventDispatcher } from "./EventDispatcher";
import { Event } from "../object/Event";
import { EventHandlerFactory } from "../factory/EventHandlerFactory";

@singleton()
@registerClass("DomEventDispatcher")
export class DomEventDispatcher extends EventDispatcher {
    public static getInstance(): any { }

    private constructor() { super(); }

    public trigger(event: Event): void;
    public trigger(dom: HTMLElement, event: Event): void;

    public trigger(...args): any {
        if (args.length === 1) {
            let event = args[0],
                eventType = event.type;

            EventHandlerFactory.createEventHandler(eventType)
                .trigger(event);
        }
        else if (args.length === 2) {
            let dom = args[0],
                event = args[1],
                eventType = event.type;

            EventHandlerFactory.createEventHandler(eventType)
                .trigger(dom, event);
        }
    }
}