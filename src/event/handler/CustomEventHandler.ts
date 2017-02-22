import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventHandler } from "./EventHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { CustomEventRegister, CustomEventRegisterData } from "../binder/CustomEventRegister";
import { Event } from "../object/Event";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { CustomEvent } from "../object/CustomEvent";

@singleton()
@registerClass("CustomEventHandler")
export class CustomEventHandler extends EventHandler {
    public static getInstance(): any { }

    private constructor() { super(); }

    public on(eventName: string, handler: Function, priority: number): void;
    public on(target: EntityObject, eventName: string, handler: Function, priority: number): void;

    public on(...args) {
        if (args.length === 3) {
            let eventName = args[0],
                handler = args[1],
                originHandler = handler,
                priority = args[2];

            CustomEventRegister.getInstance().register(
                <any>eventName,
                handler,
                originHandler,
                null,
                priority
            );
        }
        else if (args.length === 4) {
            let target = args[0],
                eventName = args[1],
                handler = args[2],
                originHandler = handler,
                priority = args[3];

            CustomEventRegister.getInstance().register(
                target,
                <any>eventName,
                handler,
                originHandler,
                null,
                priority
            );
        }
    }

    public off(eventName: string): void;
    public off(uid: number, eventName: string): void;
    public off(eventName: string, handler: Function): void;
    public off(target: EntityObject, eventName: string, handler: Function): void;

    public off(...args) {
        var eventRegister = CustomEventRegister.getInstance();

        eventRegister.remove.apply(eventRegister, args);
    }

    public trigger(event: Event): boolean;
    public trigger(event: Event, userData: any): boolean;
    public trigger(target: EntityObject, event: Event, notSetTarget: boolean): boolean;
    public trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): boolean;

    public trigger(...args): boolean {
        var event: Event = null;

        if (args.length === 1 || args.length === 2) {
            let userData = null;

            if (args.length === 1) {
                event = args[0];
            }
            else {
                event = args[0];
                userData = args[1];
            }

            return this._triggerEventHandler(event, userData);
        }
        else if (args.length === 3 || args.length === 4) {
            let target = null,
                userData = null,
                notSetTarget = null;

            if (args.length === 3) {
                target = args[0];
                event = args[1];
                notSetTarget = args[2];
            }
            else {
                target = args[0];
                event = args[1];
                userData = args[2];
                notSetTarget = args[3];
            }

            return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
        }

    }

    private _triggerEventHandler(event, userData) {
        var registerDataList: Collection<CustomEventRegisterData> = null,
            self = this;

        registerDataList = CustomEventRegister.getInstance().getEventRegisterDataList(event.name);

        if (registerDataList === null || registerDataList.getCount() === 0) {
            return false;
        }

        registerDataList.forEach((registerData: CustomEventRegisterData) => {
            //var eventCopy = event.clone();
            //
            //eventCopy.currentTarget = registerData.target;
            //eventCopy.target = registerData.target;
            //
            //self._setUserData(eventCopy, userData);
            //
            //registerData.handler(eventCopy);
            event.currentTarget = registerData.target;
            event.target = registerData.target;

            self._setUserData(event, userData);

            registerData.handler(event);
        });

        return true;
    }

    private _triggerTargetAndEventHandler(target, event, userData, notSetTarget) {
        var registerDataList: Collection<CustomEventRegisterData> = null,
            isStopPropagation = false,
            self = this;

        if (!notSetTarget) {
            event.target = target;
        }

        registerDataList = CustomEventRegister.getInstance().getEventRegisterDataList(target, event.name);

        if (registerDataList === null || registerDataList.getCount() === 0) {
            return false;
        }

        registerDataList.forEach((registerData: CustomEventRegisterData) => {
            event.currentTarget = registerData.target;

            self._setUserData(event, userData);

            registerData.handler(event);

            if (event.isStopPropagation) {
                isStopPropagation = true;
            }
        });

        return isStopPropagation;
    }

    private _setUserData(event: CustomEvent, userData) {
        if (userData) {
            event.userData = userData;
        }
    }
}