/// <reference path="../../definitions.d.ts"/>
//todo complete it(add more event type)
module Engine3D {
    private const _table = dyCb.Hash.create();

    _table.addChild(EventName.CLICK, EventType.MOUSE);
    _table.addChild(EventName.MOUSEOVER, EventType.MOUSE);
    _table.addChild(EventName.MOUSEOUT, EventType.MOUSE);
    _table.addChild(EventName.MOUSEMOVE, EventType.MOUSE);

    export class EventTable {
        //getEventType should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        public static getEventType(eventName:EventName):EventType {
            return _table.getChild(eventName);
        }

        public static isEventOnView(eventName:EventName){
            var result = false;

            switch(this.getEventType(eventName)){
                case EventType.MOUSE:
                    result = true;
                    break;
                default:
                    dyCb.Log.assert(false, dyCb.Log.info.FUNC_UNKNOW("eventName"));
                    result = false;
                    break;
            }

            return result;
        }
    }
}
