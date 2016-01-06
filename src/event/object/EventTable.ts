//todo add more event type
module wd {
     const _table = wdCb.Hash.create<EventType>();

    //todo not declare "<any>"!
    _table.addChild(<any>EventName.CLICK, EventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEOVER, EventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEOUT, EventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEMOVE, EventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEDOWN, EventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEUP, EventType.MOUSE);
    _table.addChild(<any>EventName.MOUSEWHEEL, EventType.MOUSE);
    _table.addChild(<any>EventName.KEYDOWN, EventType.KEYBOARD);
    _table.addChild(<any>EventName.KEYPRESS, EventType.KEYBOARD);
    _table.addChild(<any>EventName.KEYUP, EventType.KEYBOARD);

    export class EventTable {
        public static getEventType(eventName:EventName):EventType {
            var result = _table.getChild(<any>eventName);

            if(result === void 0){
                result = EventType.CUSTOM;
            }

            return result;
        }
    }
}
