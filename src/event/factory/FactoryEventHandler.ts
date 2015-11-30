/// <reference path="../../filePath.d.ts"/>
module wd{
    export class FactoryEventHandler{
        public static createEventHandler(eventType:EventType){
            let handler = null;

            switch (eventType){
                case EventType.MOUSE:
                    handler = MouseEventHandler.getInstance();
                    break;
                case EventType.KEYBOARD:
                    handler = KeyboardEventHandler.getInstance();
                    break;
                case EventType.CUSTOM:
                    handler = CustomEventHandler.getInstance();
                    break;
                //todo more type
                default :
                    Log.error(true, Log.info.FUNC_INVALID("eventType"));
                    break;
            }

            return handler;
        }
        //
        //public static createEvent(eventType:EventType, eventName:EventName, phase:EventPhase=EventPhase.EMIT){
        //    var eventObj = null;
        //
        //    switch (eventType){
        //        case EventType.MOUSE:
        //            eventObj = MouseEvent.create(null, eventName);
        //            break;
        //        //todo more type
        //        default :
        //            Log.error(true, Log.info.FUNC_INVALID("eventType"));
        //            break;
        //    }
        //
        //    eventObj.phase = phase;
        //
        //    return eventObj;
        //}

        //private static _createAllEventHandlers(){
        //     return wdCb.Collection.create([MouseEventHandler.getInstance()]);
        //}
    }
}
