import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventRegister } from "./EventRegister";
import { DomEventListenerMap } from "../structure/DomEventListenerMap";
import { EEventName } from "../object/EventNameHandler";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { EntityObject } from "../../core/entityObject/EntityObject";

@singleton()
@registerClass("DomEventRegister")
export class DomEventRegister extends EventRegister {
    public static getInstance(): any { }

    private constructor() { super(); }

    protected listenerMap: DomEventListenerMap = DomEventListenerMap.create();

    public register(dom: HTMLElement, eventName: EEventName, eventData: Hash<any>, handler: Function, originHandler: Function, domHandler: Function, priority: number) {
        this.listenerMap.appendChild(dom, eventName, <DomEventRegisterData>{
            dom: dom,
            eventName: eventName,
            eventData: eventData,
            handler: handler,
            originHandler: originHandler,
            domHandler: domHandler,
            priority: priority
        });
    }

    public remove(eventName: EEventName);

    public remove(eventName: EEventName, handler: Function);
    public remove(dom: HTMLElement, eventName: EEventName);

    public remove(dom: HTMLElement, eventName: EEventName, handler: Function);


    public remove(...args) {
        var result = null;

        if (args.length === 1 && JudgeUtils.isString(args[0])) {
            let eventName = args[0];

            result = this.listenerMap.removeChild(eventName);
        }
        else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
            let eventName = args[0],
                handler = args[1];

            result = this.listenerMap.removeChild(eventName, handler);
        }
        else if ((args.length === 2 && JudgeUtils.isDom(args[0])) || args.length === 3) {
            result = this.listenerMap.removeChild.apply(this.listenerMap, args);
        }

        return result;
    }

    public isBinded(dom: HTMLElement, eventName: EEventName) {
        return this.listenerMap.hasChild(dom, eventName);
    }

    public getDomHandler(dom: HTMLElement, eventName: EEventName) {
        var list: Collection<DomEventRegisterData> = this.getChild(dom, eventName);

        if (list && list.getCount() > 0) {
            return list.getChild(0).domHandler;
        }
    }
}

export type DomEventRegisterData = {
    dom?: HTMLElement,
    target?: EntityObject,
    eventData: Hash<any>,
    //user's event handler
    originHandler: Function,
    //wraped user's event handler
    handler: Function,
    //dom event handler
    domHandler: Function,
    priority: number
};