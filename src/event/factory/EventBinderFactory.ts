module wd{
    export class EventBinderFactory{
        public static createEventBinder(eventName:EventName){
            let binder = null,
                eventType = EventTable.getEventType(eventName);

            switch (eventType){
                case EEventType.MOUSE:
                case EEventType.KEYBOARD:
                    binder = DomEventBinder.getInstance();
                    break;
                case EEventType.CUSTOM:
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
