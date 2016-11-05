module wd {
    @singleton()
    export class CustomEventBinder extends EventBinder{
        public static getInstance():any {}

        private constructor(){super();}

        public on(eventName:EEventName|string, handler:Function):void;

        public on(eventName:EEventName|string, handler:Function, priority:number):void;
        public on(target:EntityObject, eventName:EEventName|string, handler:Function):void;

        public on(target:EntityObject, eventName:EEventName|string, handler:Function, priority:number):void;

        public on(...args) {
            if(args.length === 2){
                let eventName = args[0],
                    handler = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler);
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(target, eventName, handler);
            }
            else if(args.length === 4) {
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        }

        public off():void;

        public off(eventName:EEventName|string):void;
        public off(target:EntityObject):void;

        public off(eventName:EEventName|string, handler:Function):void;
        public off(target:EntityObject, eventName:EEventName|string):void;

        public off(target:EntityObject, eventName:EEventName|string, handler:Function):void;

        public off(...args) {
            var eventRegister = CustomEventRegister.getInstance();

            if(args.length === 0){
                eventRegister.forEachAll((list:wdCb.Collection<CustomEventRegisterData>, eventName:EEventName) => {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                        .off(eventName);
                });

                eventRegister.clear();
            }
            else if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                eventRegister.forEachEventName((list:wdCb.Collection<CustomEventRegisterData>, registeredEventName:string) => {
                    if(registeredEventName === eventName){
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);
                    }
                });
            }
            else if(args.length === 1 && args[0] instanceof EntityObject){
                let target:EntityObject = args[0],
                    secondMap = null;

                secondMap = eventRegister.getChild(target);

                if(!!secondMap){
                    secondMap.forEach((list:wdCb.Collection<CustomEventRegisterData>, eventName:EEventName) => {
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(target, eventName);
                    });
                }
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if(args.length === 2 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        }
    }
}
