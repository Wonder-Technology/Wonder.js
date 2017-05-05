import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventDispatcher } from "./EventDispatcher";
import { Event } from "../object/Event";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { EventHandlerFactory } from "../factory/EventHandlerFactory";
import { EventUtils } from "../utils/EventUtils";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { EEventPhase } from "../object/EEventPhase";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";

@singleton()
@registerClass("CustomEventDispatcher")
export class CustomEventDispatcher extends EventDispatcher {
    public static getInstance(): any { }

    private constructor() { super(); }

    public trigger(event: Event): boolean;

    public trigger(event: Event, userData: any): boolean;
    public trigger(target: EntityObject, event: Event): boolean;

    public trigger(target: EntityObject, event: Event, notSetTarget: boolean): boolean;
    public trigger(target: EntityObject, event: Event, userData: any): boolean;

    public trigger(target: EntityObject, event: Event, userData: any, notSetTarget: boolean): boolean;

    public trigger(...args): boolean {
        var length = args.length;

        if (length === 1) {
            let event = args[0],
                eventType = event.type;

            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(event);
        }
        else if (length === 2 && EventUtils.isEvent(args[0])) {
            let event = args[0],
                userData = args[1],
                eventType = event.type;

            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(event, userData);
        }
        else if ((length === 2 && EventUtils.isEntityObject(args[0])) || (length === 3 && JudgeUtils.isBoolean(args[2]))) {
            //else if((length === 2 && args[0] instanceof EntityObject) || (length === 3 && JudgeUtils.isBoolean(args[2]))){
            let target = args[0],
                event = args[1],
                notSetTarget = args[2] === void 0 ? false : args[2],
                eventType = event.type;

            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(target, event, notSetTarget);
        }
        else if (length === 3 || length === 4) {
            let target = args[0],
                event = args[1],
                userData = args[2],
                notSetTarget = args[3] === void 0 ? false : args[3],
                eventType = event.type;

            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(target, event, userData, notSetTarget);
        }
    }

    /**
     * transfer event up
     * @param target
     * @param eventObject
     */
    public emit(target: EntityObject, eventObject: Event, userData?: any) {
        var isStopPropagation = false;

        if (!target) {
            return;
        }

        eventObject.phase = EEventPhase.EMIT;
        eventObject.target = target;

        do {
            isStopPropagation = this._triggerWithUserData(target, eventObject, userData, true);

            if (isStopPropagation) {
                break;
            }
            target = target.bubbleParent;
        } while (target);
    }

    /**
     * transfer event down
     * @param target
     * @param eventObject
     */
    public broadcast(target: EntityObject, eventObject: Event, userData?: any) {
        var self = this;
        var iterator = (obj: EntityObject) => {
            var children: Collection<EntityObject> = obj.getChildren();

            if (children.getCount() === 0) {
                return;
            }

            children.forEach((child: EntityObject) => {
                self._triggerWithUserData(child, eventObject, userData, true);

                iterator(child);
            });
        }

        if (!target) {
            return;
        }

        eventObject.phase = EEventPhase.BROADCAST;
        eventObject.target = target;

        this._triggerWithUserData(target, eventObject, userData, true);

        iterator(target);
    }

    private _triggerWithUserData(target, event, userData, notSetTarget) {
        return userData ? this.trigger(target, event, userData, notSetTarget)
            : this.trigger(target, event, notSetTarget);
    }
}