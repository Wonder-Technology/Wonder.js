/// <reference path="../../filePath.d.ts"/>
module dy {
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

        public on(eventName:EventName|string, handler:Function, priority:number):void;
        public on(listener:{}|EventListener):void;
        public on(target:GameObject, listener:{}|EventListener):void;
        public on(target:GameObject, eventName:EventName|string, handler:Function, priority:number):void;

        @require(function(args){
            if(arguments.length === 1){
            }
            else if(arguments.length === 2){
            }
            else if(arguments.length === 3){
                let eventName = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                this._checkEventSeparator(eventName);
            }
            else if(arguments.length === 4) {
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                this._checkEventSeparator(eventName);
            }
        })
        public on(args) {
            if(arguments.length === 1){
                let listener:EventListener = !(arguments[0] instanceof EventListener) ?  EventListener.create(arguments[0]): arguments[0];

                listener.handlerDataList.forEach(function (handlerData:EventHandlerData) {
                    FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    listener:EventListener = !(arguments[1] instanceof EventListener) ?  EventListener.create(arguments[1]): arguments[1];

                listener.handlerDataList.forEach(function (handlerData:EventHandlerData) {
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
                argArr = Array.prototype.slice.call(arguments, 0);

            if(arguments.length === 0){
                eventRegister.forEach((list:dyCb.Collection<EventHandlerData>, key:string) => {
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

                eventRegister.forEach((list:dyCb.Collection<EventRegisterData>, key:string) => {
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

        private _checkEventSeparator(eventName:string){
            assert(eventName.indexOf(EventListenerMap.eventSeparator) === -1, Log.info.FUNC_SHOULD_NOT("eventName", `contain ${EventListenerMap.eventSeparator}`));
        }
    }
}
