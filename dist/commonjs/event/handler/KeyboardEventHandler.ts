import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { DomEventHandler } from "./DomEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { KeyboardEvent } from "../object/KeyboardEvent";
import { Log } from "../../utils/Log";
import { IKeyboardEventData } from "../interface/IEventData";
import { EventManager } from "../EventManager";
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
import { root } from "../../definition/Variable";

declare var document: any;

//todo bind on EntityObject which has the focus
@singleton()
@registerClass("KeyboardEventHandler")
export class KeyboardEventHandler extends DomEventHandler {
    public static getInstance(): any { }

    private constructor() { super(); }

    //public keyState:any = {};

    public on(eventName: EEventName, handler: (event: KeyboardEvent) => void, priority: number);
    public on(dom: HTMLElement, eventName: EEventName, handler: (event: KeyboardEvent) => void, priority: number);

    public on(...args) {
        var eventName = null,
            handler = null,
            priority = null;

        if (args.length === 3) {
            eventName = args[0];
            handler = args[1];
            priority = args[2];
        }
        else {
            Log.warn("keyboard event can only bind on document.body");

            eventName = args[1];
            handler = args[2];
            priority = args[3];
        }

        this.handler(this.getDefaultDom(), eventName, handler, priority);
    }

    protected triggerDomEvent(dom: HTMLElement, event: IKeyboardEventData, eventName: EEventName) {
        var eventObj = this._createEventObject(dom, event, eventName);

        EventManager.trigger(dom, eventObj);
    }

    protected getDefaultDom(): HTMLElement {
        return document.body;
    }

    protected addEngineHandler(eventName: EEventName, handler: (event: KeyboardEvent) => void) {
        var resultHandler = null;

        switch (eventName) {
            case EEventName.KEYDOWN:
                resultHandler = this._handleKeyDown(handler);
                break;
            case EEventName.KEYUP:
                resultHandler = this._handleKeyUp(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }

        return resultHandler;
    }

    protected createEventData(): Hash<any> {
        var eventData = Hash.create<any>();

        eventData.addChild("keyState", {});

        return eventData;
    }

    private _handleKeyDown(handler: (event: KeyboardEvent) => void) {
        var self = this;

        return (event: KeyboardEvent, eventData: Hash<any>) => {
            var keyState: any = eventData.getChild("keyState");

            self._setKeyStateAllFalse(keyState);
            keyState[event.key] = true;

            self._copyEventDataToEventObject(event, eventData);

            handler(event);
        };
    }

    private _handleKeyUp(handler: (event: KeyboardEvent) => void) {
        var self = this;

        return (event: KeyboardEvent, eventData: Hash<any>) => {
            self._setKeyStateAllFalse(eventData.getChild("keyState"));

            self._copyEventDataToEventObject(event, eventData);

            handler(event);
        };
    }

    private _copyEventDataToEventObject(event: KeyboardEvent, eventData: Hash<any>) {
        event.keyState = eventData.getChild("keyState");
    }

    private _setKeyStateAllFalse(keyState: any) {
        for (let i in keyState) {
            if (keyState.hasOwnProperty(i)) {
                keyState[i] = false;
            }
        }
    }

    private _createEventObject(dom: HTMLElement, event: any, eventName: EEventName) {
        var obj = KeyboardEvent.create(event ? event : root.event, eventName);

        obj.target = dom;

        return obj;
    }
}