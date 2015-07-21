/// <reference path="../../definitions.d.ts"/>
module Engine3D{
    export class FactoryEventHandler{
        public static createEventHandler(eventCategory:EventCategory){
            let handler = null;

            switch (eventCategory){
                case EventCategory.MOUSE:
                    handler = EventMouseHandler.getInstance();
                    break;
                //todo more type
                default :
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventCategory"));
                    break;
            }

            return handler;
        }
        //
        //public static createEvent(eventCategory:EventCategory, eventType:EventType, phase:EventPhase=EventPhase.EMIT){
        //    var eventObj = null;
        //
        //    switch (eventCategory){
        //        case EventCategory.MOUSE:
        //            eventObj = MouseEvent.create(null, eventType);
        //            break;
        //        //todo more type
        //        default :
        //            dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventCategory"));
        //            break;
        //    }
        //
        //    eventObj.phase = phase;
        //
        //    return eventObj;
        //}

        //private static _createAllEventHandlers(){
        //     return dyCb.Collection.create([EventMouseHandler.getInstance()]);
        //}
    }
}
