import { DomEventHandler } from "./DomEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { DomEvent } from "../object/DomEvent";
import { require, it } from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { IEventData } from "../interface/IEventData";
import { EventManager } from "../EventManager";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { MouseEvent } from "../object/MouseEvent";
import { TouchEvent } from "../object/TouchEvent";

export abstract class PointEventHandler extends DomEventHandler {
    public on(eventName: EEventName, handler: (event: DomEvent) => void, priority: number);
    public on(dom: HTMLElement, eventName: EEventName, handler: (event: DomEvent) => void, priority: number);

    @require(function(...args) {
        if (args.length === 4) {
            let dom = args[0];

            it("first param should be HTMLElement", () => {
                expect(JudgeUtils.isDom(dom)).true;
            });
        }
    })
    public on(...args) {
        var dom: HTMLElement = null,
            eventName = null,
            handler = null,
            priority = null;

        if (args.length === 3) {
            dom = this.getDefaultDom();

            eventName = args[0];
            handler = args[1];
            priority = args[2];
        }
        else {
            dom = args[0];
            eventName = args[1];
            handler = args[2];
            priority = args[3];
        }

        this.handler(dom, eventName, handler, priority);
    }

    protected abstract createEventObject(dom: HTMLElement, event: IEventData, eventName: EEventName): DomEvent;

    protected getDefaultDom(): HTMLElement {
        return document.body;
    }

    protected triggerDomEvent(dom: HTMLElement, event: IEventData, eventName: EEventName) {
        var eventObj = this.createEventObject(dom, event, eventName);

        EventManager.trigger(dom, eventObj);
    }

    protected createEventData(): Hash<any> {
        var eventData = Hash.create<any>();

        eventData.addChild("lastX", null);
        eventData.addChild("lastY", null);

        return eventData;
    }

    protected handleMove(handler: (event: MouseEvent | TouchEvent) => void) {
        var self = this;

        return (event: MouseEvent | TouchEvent, eventData: Hash<any>) => {
            self._copyEventDataToEventObject(event, eventData);

            handler(event);

            self._saveLocation(event, eventData);
        };
    }

    private _copyEventDataToEventObject(event: MouseEvent | TouchEvent, eventData: Hash<any>) {
        event.lastX = eventData.getChild("lastX");
        event.lastY = eventData.getChild("lastY");
    }

    private _saveLocation(event: MouseEvent | TouchEvent, eventData: Hash<any>) {
        var location = event.location;

        eventData.setValue("lastX", location.x);
        eventData.setValue("lastY", location.y);
    }
}