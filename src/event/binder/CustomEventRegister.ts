import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventRegister } from "./EventRegister";
import { CustomEventListenerMap } from "../structure/CustomEventListenerMap";
import { EEventName } from "../object/EventNameHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { JudgeUtils } from "../../utils/JudgeUtils";

@singleton()
@registerClass("CustomEventRegister")
export class CustomEventRegister extends EventRegister {
    public static getInstance(): any { }

    private constructor() { super(); }

    protected listenerMap: CustomEventListenerMap = CustomEventListenerMap.create();

    public register(eventName: EEventName, handler: Function, originHandler: Function, domHandler: Function, priority: number);
    public register(target: EntityObject, eventName: EEventName, handler: Function, originHandler: Function, domHandler: Function, priority: number);

    public register(...args) {
        if (args.length === 5) {
            let eventName = args[0],
                handler = args[1],
                originHandler = args[2],
                domHandler = args[3],
                priority = args[4];

            this.listenerMap.appendChild(eventName, <CustomEventRegisterData>{
                target: null,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }
        else {
            let target = args[0],
                eventName = args[1],
                handler = args[2],
                originHandler = args[3],
                domHandler = args[4],
                priority = args[5];

            this.listenerMap.appendChild(target, eventName, <CustomEventRegisterData>{
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }
    }

    public remove(eventName: EEventName);
    public remove(target: EntityObject);

    public remove(eventName: EEventName, handler: Function);
    public remove(uid: number, eventName: EEventName);
    public remove(target: EntityObject, eventName: EEventName);

    public remove(target: EntityObject, eventName: EEventName, handler: Function);


    public remove(...args) {
        var target = args[0];

        if (args.length === 1 && JudgeUtils.isString(args[0])) {
            let eventName = args[0];

            this.listenerMap.removeChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            this.listenerMap.removeChild(target);

            this._handleAfterAllEventHandlerRemoved(target);
        }
        else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
            let eventName = args[0],
                handler = args[1];

            this.listenerMap.removeChild(eventName, handler);
        }
        else if (args.length === 2 && JudgeUtils.isNumber(args[0])) {
            let uid = args[0],
                eventName = args[1];

            this.listenerMap.removeChild(uid, eventName);
        }
        else if ((args.length === 2 && args[0] instanceof EntityObject) || args.length === 3) {
            this.listenerMap.removeChild.apply(this.listenerMap, args);

            if (this._isAllEventHandlerRemoved(target)) {
                this._handleAfterAllEventHandlerRemoved(target);
            }
        }
    }

    public setBubbleParent(target: EntityObject, parent: EntityObject) {
        target.bubbleParent = parent;
    }

    private _isAllEventHandlerRemoved(target: EntityObject) {
        return !this.listenerMap.hasChild(target);
    }

    private _handleAfterAllEventHandlerRemoved(target: EntityObject) {
        this.setBubbleParent(target, null);
    }
}

export type CustomEventRegisterData = {
    target: EntityObject,
    //user's event handler
    originHandler: Function,
    //wraped user's event handler
    handler: Function,
    //dom event handler
    domHandler: Function,
    priority: number
};