module wd{
    const _scriptHandlerNameTable = wdCb.Hash.create<string>(),
        _scriptEngineEventTable = wdCb.Hash.create<string>();

    //todo not declare "<any>"!
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_TAP, "onPointTap");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_OVER, "onPointOver");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_OUT, "onPointOut");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_MOVE, "onPointMove");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_DOWN, "onPointDown");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_UP, "onPointUp");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_SCALE, "onPointScale");
    _scriptHandlerNameTable.addChild(<any>EEngineEvent.POINT_DRAG, "onPointDrag");


    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_TAP, "POINT_TAP");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_DOWN, "POINT_DOWN");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_UP, "POINT_UP");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_MOVE, "POINT_MOVE");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_OVER, "POINT_OVER");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_OUT, "POINT_OUT");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_SCALE, "POINT_SCALE");
    _scriptEngineEventTable.addChild(<any>EEngineEvent.POINT_DRAG, "POINT_DRAG");

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