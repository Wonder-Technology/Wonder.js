module wd{
    export class EventHandlerFactory{
        public static createEventHandler(eventType:EEventType){
            let handler = null;

            switch (eventType){
                case EEventType.MOUSE:
                    handler = MouseEventHandler.getInstance();
                    break;
                case EEventType.KEYBOARD:
                    handler = KeyboardEventHandler.getInstance();
                    break;
                case EEventType.CUSTOM:
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
