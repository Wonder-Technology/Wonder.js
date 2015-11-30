/// <reference path="../../filePath.d.ts"/>
module wd {
    export class EventBinder {
        public static create() {
            var obj = new this();

            return obj;
        }

        public on(eventName:EventName|string, handler:Function, priority:number):void;
        public on(listener:{}|EventListener):void;
        public on(target:GameObject, listener:{}|EventListener):void;
        public on(target:GameObject, eventName:EventName|string, handler:Function, priority:number):void;

        @require(function(...args){
            if(args.length === 1){
            }
            else if(args.length === 2){
            }
            else if(args.length === 3){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2];

                this._checkEventSeparator(eventName);
            }
            else if(args.length === 4) {
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3];

                this._checkEventSeparator(eventName);
            }
        })
        public on(...args) {
            if(args.length === 1){
                let listener:EventListener = !(args[0] instanceof EventListener) ?  EventListener.create(args[0]): args[0];

                listener.handlerDataList.forEach(function (handlerData:EventHandlerData) {
                    FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if(args.length === 2){
                let target = args[0],
                    listener:EventListener = !(args[1] instanceof EventListener) ?  EventListener.create(args[1]): args[1];

                listener.handlerDataList.forEach(function (handlerData:EventHandlerData) {
                    FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if(args.length === 3){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if(args.length === 4) {
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3];

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

        public off(...args) {
            var eventRegister = EventRegister.getInstance();

            if(args.length === 0){
                eventRegister.forEach((list:wdCb.Collection<EventHandlerData>, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key),
                        targetUid = eventRegister.getUidFromKey(key);

                    if(!targetUid){
                        FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);
                    }
                    else{
                        FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName)).off(targetUid, eventName);
                    }
                });
            }
            else if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if(args.length === 2 && JudgeUtils.isFunction(args[1])){
                let eventName = args[0],
                    handler = args[1];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if(args.length === 1){
                let target = args[0];

                eventRegister.forEach((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key);

                    if(eventRegister.isTarget(key, target, list)){
                        FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if(args.length === 2){
                let target = args[0],
                    eventName = args[1];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if(args.length === 3){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2];

                FactoryEventHandler.createEventHandler(EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        }

        private _checkEventSeparator(eventName:string){
            assert(eventName.indexOf(EventListenerMap.eventSeparator) === -1, Log.info.FUNC_SHOULD_NOT("eventName", `contain ${EventListenerMap.eventSeparator}`));
        }
    }
}
