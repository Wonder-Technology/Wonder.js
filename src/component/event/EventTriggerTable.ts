module wd{
    const _scriptHandlerNameTable = wdCb.Hash.create<string>(),
        _scriptEngineEventTable = wdCb.Hash.create<string>();

    //todo not declare "<any>"!
    _scriptHandlerNameTable.addChild(<any>EventName.CLICK, "onMouseClick");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEOVER, "onMouseOver");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEOUT, "onMouseOut");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEMOVE, "onMouseMove");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEDOWN, "onMouseDown");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEUP, "onMouseUp");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEWHEEL, "onMouseWheel");
    _scriptHandlerNameTable.addChild(<any>EventName.MOUSEDRAG, "onMouseDrag");


    _scriptEngineEventTable.addChild(<any>EventName.CLICK, "MOUSE_CLICK");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEDOWN, "MOUSE_DOWN");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEUP, "MOUSE_UP");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEMOVE, "MOUSE_MOVE");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEOVER, "MOUSE_OVER");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEOUT, "MOUSE_OUT");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEWHEEL, "MOUSE_WHEEL");
    _scriptEngineEventTable.addChild(<any>EventName.MOUSEDRAG, "MOUSE_DRAG");

    export class EventTriggerTable{
        public static getScriptHandlerName(eventName:EventName){
            var result = _scriptHandlerNameTable.getChild(<any>eventName);

            return result;
        }

        public static getScriptEngineEvent(eventName:EventName){
            var result = _scriptEngineEventTable.getChild(<any>eventName);

            return result;
        }
    }
}