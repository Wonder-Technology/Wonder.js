//todo add more event type
module wd {
     const _table = wdCb.Hash.create<EEventType>();

    //todo not declare "<any>"!
    _table.addChild(<any>EventName.CLICK, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEOVER, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEOUT, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEMOVE, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEDOWN, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEUP, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEWHEEL, EEventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEDRAG, EEventType.MOUSE);

    _table.addChild(<any>EventName.KEYDOWN, EEventType.KEYBOARD);
    _table.addChild(<any>EventName.KEYPRESS, EEventType.KEYBOARD);
    _table.addChild(<any>EventName.KEYUP, EEventType.KEYBOARD);

    export class EventTable {
        public static getEventType(eventName:EventName):EEventType {
            var result = _table.getChild(<any>eventName);

            if(result === void 0){
                result = EEventType.CUSTOM;
            }

            return result;
        }
    }
}
