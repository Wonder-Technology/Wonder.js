module wd{
    export class EventDispatcherFactory{
        public static createEventDispatcher(event:Event){
            let dispatcher = null,
                eventType = event.type;

            switch (eventType){
                case EEventType.MOUSE:
                case EEventType.KEYBOARD:
                    dispatcher = DomEventDispatcher.getInstance();
                    break;
                case EEventType.CUSTOM:
                    dispatcher = CustomEventDispatcher.getInstance();
                    break;
                default :
                    Log.error(true, Log.info.FUNC_INVALID(`event:${event}`));
                    break;
            }

            return dispatcher;
        }
    }
}
