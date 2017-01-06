module wd{
    export class EventBinderFactory{
        public static createEventBinder(eventName:EEventName){
            let binder = null,
                eventType = EventTable.getEventType(eventName);

            switch (eventType){
                case EEventType.MOUSE:
                case EEventType.TOUCH:
                case EEventType.KEYBOARD:
                    binder = DomEventBinder.getInstance();
                    break;
                case EEventType.CUSTOM:
                case EEventType.POINT:
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
