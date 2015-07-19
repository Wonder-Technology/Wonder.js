/// <reference path="../../definitions.d.ts"/>
//todo complete it(add more event type)
module Engine3D {
     const _table = dyCb.Hash.create();

    //todo not declare "<any>"!
    _table.addChild(<any>EventName.CLICK, EventCategory.MOUSE);
    _table.addChild(<any>EventName.MOUSEOVER, EventCategory.MOUSE);
    _table.addChild(<any>EventName.MOUSEOUT, EventCategory.MOUSE);
    _table.addChild(<any>EventName.MOUSEMOVE, EventCategory.MOUSE);
    _table.addChild(<any>EventName.MOUSEDOWN, EventCategory.MOUSE);
    _table.addChild(<any>EventName.MOUSEUP, EventCategory.MOUSE);

    export class EventTable {
        //getEventType should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        public static getEventType(eventName:EventName):EventCategory {
            return _table.getChild(<any>eventName);
        }

        //public static isEventOnView(eventName:EventName){
        //    var result = false;
        //
        //    switch(this.getEventType(eventName)){
        //        case EventCategory.MOUSE:
        //            result = true;
        //            break;
        //        default:
        //            dyCb.Log.assert(false, dyCb.Log.info.FUNC_UNKNOW("eventName"));
        //            result = false;
        //            break;
        //    }
        //
        //    return result;
        //}
    }
}
