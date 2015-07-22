/// <reference path="../../definitions.d.ts"/>
//todo complete it(add more event type)
module Engine3D {
     const _table = dyCb.Hash.create();

    //todo not declare "<any>"!
    _table.addChild(<any>EventType.CLICK, EventCategory.MOUSE);
    _table.addChild(<any>EventType.MOUSEOVER, EventCategory.MOUSE);
    _table.addChild(<any>EventType.MOUSEOUT, EventCategory.MOUSE);
    _table.addChild(<any>EventType.MOUSEMOVE, EventCategory.MOUSE);
    _table.addChild(<any>EventType.MOUSEDOWN, EventCategory.MOUSE);
    _table.addChild(<any>EventType.MOUSEUP, EventCategory.MOUSE);

    export class EventTable {
        //getEventCategory should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        public static getEventCategory(eventType:EventType):EventCategory {
            var result = _table.getChild(<any>eventType);

            if(result === void 0){
                result = EventCategory.CUSTOM;
            }

            return result;
        }

        //public static isEventOnView(eventType:EventType){
        //    var result = false;
        //
        //    switch(this.getEventCategory(eventType)){
        //        case EventCategory.MOUSE:
        //            result = true;
        //            break;
        //        default:
        //            dyCb.Log.assert(false, dyCb.Log.info.FUNC_UNKNOW("eventType"));
        //            result = false;
        //            break;
        //    }
        //
        //    return result;
        //}
    }
}
