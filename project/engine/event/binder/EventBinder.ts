/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    //responsibilty:on, off event(manage list)

    export class EventBinder {
        public static create() {
            var obj = new this();

            return obj;
        }

        //private _listenerList:EventListener = EventListener.create();
        //private _eventRegister:EventRegister = null;

        constructor() {
            //EventRegister.getInstance() = eventRegister;
        }

        public on(eventType:EventType, handler:Function, priority:number):void;
        public on(target:GameObject, arg:{}|EventListener):void;
        public on(target:GameObject, eventType:EventType, handler:Function, priority:number):void;

        public on(args) {
            if(arguments.length === 2){
                let target = arguments[0],
                    arg = arguments[1],
                    listener:EventListener = null;

                listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;

                listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                    FactoryEventHandler.createEventHandler(listener.eventCategory)
                        .on(target, handlerData.eventType, handlerData.handler, listener.priority);
                });
            }
            else if(arguments.length === 3){
                let eventType = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                    .on(eventType, handler, priority);
            }
            else if(arguments.length === 4) {
                let target = arguments[0],
                    eventType = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                    .on(target, eventType, handler, priority);
            }
        }

        public off():void;
        public off(eventType:EventType):void;
        public off(eventType:EventType, handler:Function):void;
        public off(target:GameObject):void;
        public off(target:GameObject, eventType:EventType):void;
        public off(target:GameObject, eventType:EventType, handler:Function):void;

        public off() {
            var eventRegister = EventRegister.getInstance(),
                eventOffDataList:dyCb.Collection = null,
                argArr = Array.prototype.slice.call(arguments, 0);

            if(arguments.length === 0){
                eventRegister.forEach((list:dyCb.Collection, key:string) => {
                    var eventType = eventRegister.getEventTypeFromKey(key),
                        targetUid = eventRegister.getUidFromKey(key);

                    if(!targetUid){
                        FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                            .off(eventType);

                        return;
                    }

                    FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                        .off(targetUid, eventType);
                });
            }
            else if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventType = arguments[0];

                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                    .off(eventType);
            }
            else if(arguments.length === 2 && JudgeUtils.isFunction(arguments[1])){
                let eventType = arguments[0],
                    handler = arguments[1];

                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                    .off(eventType, handler);
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                eventRegister.forEach((list:dyCb.Collection, key:string) => {
                    var eventType = eventRegister.getEventTypeFromKey(key);

                    if(eventRegister.isTarget(key, target, list)){
                        FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                            .off(target, eventType);
                    }
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventType = arguments[1];

                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                    .off(target, eventType);
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    eventType = arguments[1],
                    handler = arguments[2];

                FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType))
                    .off(target, eventType, handler);
            }
        }
    }
}
