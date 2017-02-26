import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { chrome, firefox } from "bowser";

enum EBrowserIdentifier {
    FALLBACK = <any>"fallback",
    FIREFOX = <any>"firefox",
    CHROME = <any>"chrome"
}

export enum EEventName {
    CLICK = <any>"click",
    MOUSEOVER = <any>"mouseover",
    MOUSEUP = <any>"mouseup",
    MOUSEOUT = <any>"mouseout",
    MOUSEMOVE = <any>"mousemove",
    MOUSEDOWN = <any>"mousedown",
    MOUSEWHEEL = <any>`mousewheel|DOMMouseScroll*${EBrowserIdentifier.FIREFOX}`,
    MOUSEDRAG = <any>"mousedrag",

    TOUCHUP = <any>"touchend",
    TOUCHMOVE = <any>"touchmove",
    TOUCHDOWN = <any>"touchstart",


    KEYDOWN = <any>"keydown",
    KEYUP = <any>"keyup",
    KEYPRESS = <any>"keypress"
}

const EVENTNAME_SPLITTER = '|',
    BROWSER_IDENTIFIER = '*';

@registerClass("EventNameHandler")
export class EventNameHandler {
    public static handleEventName(domEventName: EEventName) {
        var eventName: string = <any>domEventName,
            fallbackEventName = null,
            specifyBrowserEventNameArr = [],
            result: string = null;

        for (let name of eventName.split(EVENTNAME_SPLITTER)) {

            if (this._isFallbackEventName(name)) {
                fallbackEventName = name;
            }
            else {
                specifyBrowserEventNameArr.push(name);
            }
        }

        result = this._getSpecifyBrowserEventName(specifyBrowserEventNameArr);

        return result !== null ? result : fallbackEventName;
    }

    private static _isFallbackEventName(eventName: string) {
        return eventName.split(BROWSER_IDENTIFIER).length === 1;
    }

    private static _getSpecifyBrowserEventName(specifyBrowserEventNameArr: Array<string>) {
        var result = null;

        for (let eventName of specifyBrowserEventNameArr) {
            let [domEventName, browserIdentifier] = eventName.split(BROWSER_IDENTIFIER);

            switch (<any>browserIdentifier) {
                case EBrowserIdentifier.CHROME:
                    if (chrome) {
                        result = domEventName;
                    }
                    break;
                case EBrowserIdentifier.FIREFOX:
                    if (firefox) {
                        result = domEventName;
                    }
                    break;
                default:
                    //todo judge IE
                    break;
            }

            if (result) {
                break;
            }
        }

        return result;
    }
}