/// <reference path="../../filePath.d.ts"/>
module wd{
    export class EventHandlerFactory{
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
    }
}
