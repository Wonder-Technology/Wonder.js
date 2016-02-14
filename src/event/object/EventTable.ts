//todo add more event type
module wd {
     const _table = wdCb.Hash.create<EEventType>();

    //todo not declare "<any>"!
    _table.addChild(<any>EEventName.CLICK, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEOVER, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEOUT, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEMOVE, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEDOWN, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEUP, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEWHEEL, EEventType.MOUSE);
    _table.addChild(<any>EEventName.MOUSEDRAG, EEventType.MOUSE);

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
