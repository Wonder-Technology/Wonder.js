export declare enum EEventName {
    CLICK,
    MOUSEOVER,
    MOUSEUP,
    MOUSEOUT,
    MOUSEMOVE,
    MOUSEDOWN,
    MOUSEWHEEL,
    MOUSEDRAG,
    TOUCHUP,
    TOUCHMOVE,
    TOUCHDOWN,
    KEYDOWN,
    KEYUP,
    KEYPRESS,
}
export declare class EventNameHandler {
    static handleEventName(domEventName: EEventName): any;
    private static _isFallbackEventName(eventName);
    private static _getSpecifyBrowserEventName(specifyBrowserEventNameArr);
}
