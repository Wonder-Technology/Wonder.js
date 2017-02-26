import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventBinder } from "./EventBinder";
import { EEventName } from "../object/EventNameHandler";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { EventHandlerFactory } from "../factory/EventHandlerFactory";
import { EventTable } from "../object/EventTable";
import { DomEventRegister, DomEventRegisterData } from "./DomEventRegister";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";

@singleton()
@registerClass("DomEventBinder")
export class DomEventBinder extends EventBinder {
    public static getInstance(): any { }

    private constructor() { super(); }

    public on(eventName: EEventName | string, handler: Function): void;

    public on(eventName: EEventName | string, handler: Function, priority: number): void;
    public on(dom: HTMLElement, eventName: EEventName | string, handler: Function): void;

    public on(dom: HTMLElement, eventName: EEventName | string, handler: Function, priority: number): void;

    public on(...args) {
        if (args.length === 2 && JudgeUtils.isString(args[0])) {
            let eventName = args[0],
                handler = args[1];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils.isString(args[0])) {
            let eventName = args[0],
                handler = args[1],
                priority = args[2];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils.isDom(args[0])) {
            let dom = args[0],
                eventName = args[1],
                handler = args[2];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(dom, eventName, handler);
        }
        else if (args.length === 4) {
            let dom = args[0],
                eventName = args[1],
                handler = args[2],
                priority = args[3];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(dom, eventName, handler, priority);
        }
    }

    public off(): void;

    public off(eventName: EEventName | string): void;
    public off(dom: HTMLElement): void;

    public off(eventName: EEventName | string, handler: Function): void;
    public off(dom: HTMLElement, eventName: EEventName): void;

    public off(dom: HTMLElement, eventName: EEventName, handler: Function): void;

    public off(...args) {
        var eventRegister = DomEventRegister.getInstance();

        if (args.length === 0) {
            eventRegister.forEachAll((list: Collection<DomEventRegisterData>, eventName: EEventName) => {
                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName);
            });

            eventRegister.clear();
        }
        else if (args.length === 1 && JudgeUtils.isString(args[0])) {
            let eventName = args[0];

            eventRegister.forEachEventName((list: Collection<DomEventRegisterData>, registeredEventName: string) => {
                if (registeredEventName === eventName) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                        .off(eventName);
                }
            });
        }
        else if (args.length === 1 && JudgeUtils.isDom(args[0])) {
            let dom = args[0],
                secondMap = null;

            secondMap = eventRegister.getChild(dom);

            if (!!secondMap) {
                secondMap.forEach((list: Collection<DomEventRegisterData>, eventName: EEventName) => {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                        .off(dom, eventName);
                });
            }
        }
        else if (args.length === 2 && JudgeUtils.isString(args[0])) {
            let eventName = args[0],
                handler = args[1];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(eventName, handler);
        }
        else if (args.length === 2 && JudgeUtils.isDom(args[0])) {
            let dom = args[0],
                eventName = args[1];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(dom, eventName);
        }
        else if (args.length === 3) {
            let dom = args[0],
                eventName = args[1],
                handler = args[2];

            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(dom, eventName, handler);
        }
    }
}