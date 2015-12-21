/// <reference path="../../filePath.d.ts"/>
module wd{
    export class FactoryEventBinder{
        public static createEventBinder(eventName:EventName){
            let binder = null,
                eventType = EventTable.getEventType(eventName);

            switch (eventType){
                case EventType.MOUSE:
                case EventType.KEYBOARD:
                    binder = DomEventBinder.getInstance();
                    break;
                case EventType.CUSTOM:
                    binder = CustomEventBinder.getInstance();
                    break;
                default :
                    Log.error(true, Log.info.FUNC_INVALID(`eventName:${eventName}`));
                    break;
            }

            return binder;
        }
    }
}
