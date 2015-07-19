/// <reference path="../../definitions.d.ts"/>
module Engine3D{
    export class FactoryEventHandler{
        public static createEventHandler(eventCategory?:EventCategory){

            if(arguments.length === 0){
                return this._createAllEventHandlers();
            }
            else if(arguments.length === 1){
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

        }
        //
        //public static createEvent(eventCategory:EventCategory, eventName:EventName, phase:EventPhase=EventPhase.EMIT){
        //    var eventObj = null;
        //
        //    switch (eventCategory){
        //        case EventCategory.MOUSE:
        //            eventObj = EventMouse.create(null, eventName);
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

        private static _createAllEventHandlers(){
             return dyCb.Collection.create([EventMouseHandler.getInstance()]);
        }
    }
}
