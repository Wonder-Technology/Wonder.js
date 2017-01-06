module wd {
     const _table = wdCb.Hash.create<EEventType>();

    //todo not declare "<any>"!
    _table.addChild(<any>EEventName.CLICK, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEMOVE, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEDOWN, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEDRAG, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEOUT, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEOVER, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEUP, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEWHEEL, EEventType.MOUSE);

    _table.addChild(<any>EEventName.TOUCHMOVE, EEventType.TOUCH);
    _table.addChild(<any>EEventName.TOUCHDOWN, EEventType.TOUCH);
    _table.addChild(<any>EEventName.TOUCHUP, EEventType.TOUCH);

    _table.addChild(<any>EEngineEvent.POINT_TAP, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_OVER, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_OUT, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_MOVE, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_DOWN, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_UP, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_SCALE, EEventType.POINT);
    _table.addChild(<any>EEngineEvent.POINT_DRAG, EEventType.POINT);


    _table.addChild(<any>EEventName.KEYDOWN, EEventType.KEYBOARD);
    _table.addChild(<any>EEventName.KEYPRESS, EEventType.KEYBOARD);
    _table.addChild(<any>EEventName.KEYUP, EEventType.KEYBOARD);

    export class EventTable {
        public static getEventType(eventName:EEventName):EEventType {
            var result = _table.getChild(<any>eventName);

            if(result === void 0){
                result = EEventType.CUSTOM;
            }

            return result;
        }
    }
}
