module wd{
    export class EventDispatcherFactory{
        public static createEventDispatcher(event:Event){
            let dispatcher = null,
                eventType = event.type;

            switch (eventType){
                case EventType.MOUSE:
                case EventType.KEYBOARD:
                    dispatcher = DomEventDispatcher.getInstance();
                    break;
                case EventType.CUSTOM:
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
