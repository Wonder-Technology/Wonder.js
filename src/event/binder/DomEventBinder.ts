/// <reference path="../../filePath.d.ts"/>
module wd {
    export class DomEventBinder extends EventBinder{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(listener:{}|EventListener):void;

        public on(eventName:EventName|string, handler:Function):void;
        public on(dom:HTMLElement, listener:{}|EventListener):void;

        public on(eventName:EventName|string, handler:Function, priority:number):void;
        public on(dom:HTMLElement, eventName:EventName|string, handler:Function):void;

        public on(dom:HTMLElement, eventName:EventName|string, handler:Function, priority:number):void;

        @require(function(...args){
            if(args.length === 1){
            }
            else if(args.length === 2){
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                this._checkEventSeparator(eventName);
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let eventName = args[1];

                this._checkEventSeparator(eventName);
            }
            else if(args.length === 4) {
                let eventName = args[1];

                this._checkEventSeparator(eventName);
            }
        })
        public on(...args) {
            if(args.length === 1){
                let listener:EventListener = !(args[0] instanceof EventListener) ?  EventListener.create(args[0]): args[0];

                listener.handlerDataList.forEach(function (handlerData:EventHandlerData) {
                    EventHandlerFactory.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    listener:EventListener = !(args[0] instanceof EventListener) ?  EventListener.create(args[0]): args[0];

                listener.handlerDataList.forEach(function (handlerData:EventHandlerData) {
                    EventHandlerFactory.createEventHandler(listener.eventType)
                        .on(dom, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(dom, eventName, handler);
            }
            else if(args.length === 4) {
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .on(dom, eventName, handler, priority);
            }
        }

        public off():void;

        public off(eventName:EventName|string):void;
        public off(dom:HTMLElement):void;

        public off(eventName:EventName|string, handler:Function):void;
        public off(dom:HTMLElement, eventName:EventName):void;

        public off(dom:HTMLElement, eventName:EventName, handler:Function):void;

        public off(...args) {
            var eventRegister = DomEventRegister.getInstance();

            if(args.length === 0){
                eventRegister.forEach((list:wdCb.Collection<EventHandlerData>, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key);

                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);
                });
            }
            else if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                eventRegister.forEach((list:wdCb.Collection<EventHandlerData>, key:string) => {
                    var registeredEventName = eventRegister.getEventNameFromKey(key);

                    if(registeredEventName === eventName){
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(eventName);
                    }
                });
            }
            else if(args.length === 1 && JudgeUtils.isDom(args[0])){
                let dom = args[0];

                eventRegister.forEach((list:wdCb.Collection<EventHandlerData>, key:string) => {
                    var eventName = eventRegister.getEventNameFromKey(key);

                    if(eventRegister.isDom(key, dom, list)){
                        EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                            .off(dom, eventName);
                    }
                });
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(dom, eventName);
            }
            else if(args.length === 3){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2];

                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(dom, eventName, handler);
            }
        }

        private _checkEventSeparator(eventName:string){
            assert(eventName.indexOf(DomEventListenerMap.eventSeparator) === -1, Log.info.FUNC_SHOULD_NOT("eventName", `contain ${DomEventListenerMap.eventSeparator}`));
        }
    }
}
