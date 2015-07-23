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

        public on(eventName:EventName, handler:Function, priority:number):void;
        public on(target:GameObject, arg:{}|EventListener):void;
        public on(target:GameObject, eventName:EventName, handler:Function, priority:number):void;

        public on(args) {
            if(arguments.length === 2){
                let target = arguments[0],
                    arg = arguments[1],
                    listener:EventListener = null;

                listener = !(arg instanceof EventListener) ?  EventListener.create(arg): arg;

                listener.handlerDataList.forEach(function (handlerData:IEventHandlerData) {
                    FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if(arguments.length === 3){
                let eventName = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if(arguments.length === 4) {
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        }

        public off():void;
        public off(eventName:EventName):void;
        public off(eventName:EventName, handler:Function):void;
        public off(target:GameObject):void;
        public off(target:GameObject, eventName:EventName):void;
        public off(target:GameObject, eventName:EventName, handler:Function):void;

        public off() {
            var eventRegister = EventRegister.getInstance(),
                eventOffDataList:dyCb.Collection = null,
                argArr = Array.prototype.slice.call(arguments, 0);

            if(arguments.length === 0){
                eventRegister.forEach((list:dyCb.Collection, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key),
                        targetUid = eventRegister.getUidFromKey(key);

                    if(!targetUid){
                        FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);

                        return;
                    }

                    FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                        .off(targetUid, eventName);
                });
            }
            else if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if(arguments.length === 2 && JudgeUtils.isFunction(arguments[1])){
                let eventName = arguments[0],
                    handler = arguments[1];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                eventRegister.forEach((list:dyCb.Collection, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key);

                    if(eventRegister.isTarget(key, target, list)){
                        FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        }
    }
}
