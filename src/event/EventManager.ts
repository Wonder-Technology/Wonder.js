/// <reference path="../filePath.d.ts"/>
module wd {
    export class EventManager {
        //private static _eventBinder:EventBinder = EventBinder.create();
        private static _eventDispatcher:EventDispatcher = EventDispatcher.create();

        public static on(listener:{}|EventListener):void;

        public static on(eventName:EventName|string, handler:Function):void;
        //public static on(target:GameObject, listener:{}|EventListener):void;
        public static on(dom:HTMLElement, listener:{}|EventListener):void;

        public static on(eventName:EventName|string, handler:Function, priority:number):void;
        public static on(target:GameObject, eventName:EventName|string, handler:Function):void;
        public static on(dom:HTMLElement, eventName:EventName|string, handler:Function):void;

        public static on(target:GameObject, eventName:EventName|string, handler:Function, priority:number):void;
        public static on(dom:HTMLElement, eventName:EventName|string, handler:Function, priority:number):void;

        @require(function(...args){
            if(args[0] instanceof GameObject){
                let eventName = args[1];

                assert(EventTable.getEventType(eventName) === EventType.CUSTOM, Log.info.FUNC_MUST_BE("event", "custom event"));
            }
            else if(JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    eventType = EventTable.getEventType(eventName);

                assert(eventType === EventType.MOUSE || eventType === EventType.KEYBOARD, Log.info.FUNC_MUST_BE("event", "dom event"));
            }
        })
        public static on(...args) {
            if(args.length === 1){
                let listener = args[0],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(listener);
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = 1,
                    eventBinder = FactoryEventBinder.createEventBinder(eventName);

                eventBinder.on(eventName, handler, priority);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    listener = args[1],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(dom, listener);
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2],
                    eventBinder = FactoryEventBinder.createEventBinder(eventName);

                eventBinder.on(eventName, handler, priority);
            }
            else if(args.length === 3 && args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = 1,
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.on(target, eventName, handler, priority);
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = 1,
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(dom, eventName, handler, priority);
            }
            else if(args.length === 4 && args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.on(target, eventName, handler, priority);
            }
            else if(args.length === 4 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.on(dom, eventName, handler, priority);
            }
        }

        public static off():void;

        public static off(eventName:EventName|string):void;
        public static off(target:GameObject):void;
        public static off(dom:HTMLElement):void;

        public static off(eventName:EventName|string, handler:Function):void;
        public static off(target:GameObject, eventName:EventName|string):void;
        public static off(dom:HTMLElement, eventName:EventName):void;

        public static off(target:GameObject, eventName:EventName|string, handler:Function):void;
        public static off(dom:HTMLElement, eventName:EventName, handler:Function):void;


        @require(function(...args){
            if(args.length > 2 && args[0] instanceof GameObject){
                let eventName = args[1];

                assert(EventTable.getEventType(eventName) === EventType.CUSTOM, Log.info.FUNC_MUST_BE("event", "custom event"));
            }
            else if(args.length > 2 && JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    eventType = EventTable.getEventType(eventName);

                assert(eventType === EventType.MOUSE || eventType === EventType.KEYBOARD, Log.info.FUNC_MUST_BE("event", "dom event"));
            }
        })
        public static off(...args) {
            if(args.length === 0){
                let customEventBinder = CustomEventBinder.getInstance(),
                    domEventBinder = DomEventBinder.getInstance();

                customEventBinder.off();
                domEventBinder.off();
            }
            else if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    eventBinder = FactoryEventBinder.createEventBinder(eventName);

                eventBinder.off(eventName);
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let eventName = args[0],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.off(eventName);
            }
            else if(args.length === 1 && JudgeUtils.isDom(args[0])){
                let eventName = args[0],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.off(eventName);
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    eventBinder = FactoryEventBinder.createEventBinder(eventName);

                eventBinder.off(eventName, handler);
            }
            else if(args.length === 2 && args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.off(target, eventName);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.off(dom, eventName);
            }
            else if(args.length === 3 && args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    eventBinder = CustomEventBinder.getInstance();

                eventBinder.off(target, eventName, handler);
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    eventBinder = DomEventBinder.getInstance();

                eventBinder.off(dom, eventName, handler);
            }
        }

        public static trigger(event:Event):void;

        public static trigger(event:Event, userData:any):void;
        public static trigger(target:GameObject, event:Event):void;
        public static trigger(dom:HTMLElement, event:Event):void;

        public static trigger(target:GameObject, event:Event, userData:any):void;


        public static trigger(...args) {
            this._eventDispatcher.trigger.apply(this._eventDispatcher, args);
        }


        public static broadcast(target:GameObject, event:Event);
        public static broadcast(target:GameObject, event:Event, userData:any);

        @require(function(target:GameObject, eventObject:Event, userData?:any){
            assert(eventObject instanceof CustomEvent, Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
        })
        public static broadcast(...args) {
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, args);
        }

        public static emit(target:GameObject, event:Event);
        public static emit(target:GameObject, event:Event, userData:any);

        @require(function(target:GameObject, eventObject:Event, userData?:any){
            assert(eventObject instanceof CustomEvent, Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
        })
        public static emit(...args) {
            this._eventDispatcher.emit.apply(this._eventDispatcher, args);
        }

        public static fromEvent(eventName:EventName):wdFrp.FromEventPatternStream;

        public static fromEvent(eventName:EventName, priority:number):wdFrp.FromEventPatternStream;
        public static fromEvent(target:GameObject, eventName:EventName):wdFrp.FromEventPatternStream;
        public static fromEvent(dom:HTMLElement, eventName:EventName):wdFrp.FromEventPatternStream;

        public static fromEvent(target:GameObject, eventName:EventName, priority:number):wdFrp.FromEventPatternStream;
        public static fromEvent(dom:HTMLElement, eventName:EventName, priority:number):wdFrp.FromEventPatternStream;

        public static fromEvent(...args):any {
            var addHandler = null,
                removeHandler = null;

            if (args.length === 1) {
                let eventName = args[0];

                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (args.length === 2 && JudgeUtils.isNumber(args[1])) {
                let eventName = args[0],
                    priority = args[1];

                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (args.length === 2) {
                let eventName = args[1];

                addHandler = function (handler) {
                    EventManager.on(args[0], eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(args[0], eventName, handler);
                };
            }
            else if (args.length === 3) {
                let eventName = args[1],
                    priority = args[2];

                addHandler = function (handler) {
                    EventManager.on(args[0], eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(args[0], eventName, handler);
                };
            }

            return wdFrp.fromEventPattern(addHandler, removeHandler);
        }

        @require(function(target:GameObject, parent:any){
            assert(target instanceof GameObject, "only GameObject can setBubleParent");
        })
        public static setBubbleParent(target:GameObject, parent:any) {
            CustomEventRegister.getInstance().setBubbleParent(target, parent);
        }
    }
}
