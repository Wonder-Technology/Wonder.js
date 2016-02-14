module wd{
    const _scriptHandlerNameTable = wdCb.Hash.create<string>(),
        _scriptEngineEventTable = wdCb.Hash.create<string>();

    //todo not declare "<any>"!
    _scriptHandlerNameTable.addChild(<any>EEventName.CLICK, "onMouseClick");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEOVER, "onMouseOver");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEOUT, "onMouseOut");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEMOVE, "onMouseMove");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEDOWN, "onMouseDown");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEUP, "onMouseUp");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEWHEEL, "onMouseWheel");
    _scriptHandlerNameTable.addChild(<any>EEventName.MOUSEDRAG, "onMouseDrag");


    _scriptEngineEventTable.addChild(<any>EEventName.CLICK, "MOUSE_CLICK");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEDOWN, "MOUSE_DOWN");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEUP, "MOUSE_UP");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEMOVE, "MOUSE_MOVE");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEOVER, "MOUSE_OVER");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEOUT, "MOUSE_OUT");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEWHEEL, "MOUSE_WHEEL");
    _scriptEngineEventTable.addChild(<any>EEventName.MOUSEDRAG, "MOUSE_DRAG");

    export class EventTriggerTable{
        public static getScriptHandlerName(eventName:EEventName){
            var result = _scriptHandlerNameTable.getChild(<any>eventName);

            return result;
        }

        public static getScriptEngineEvent(eventName:EEventName){
            var result = _scriptEngineEventTable.getChild(<any>eventName);

            return result;
        }
    }
}