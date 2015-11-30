/// <reference path="../filePath.d.ts"/>
module wd {
    export class EventManager {
        private static _eventBinder:EventBinder = EventBinder.create();
        private static _eventDispatcher:EventDispatcher = EventDispatcher.create();

        public static on(eventName:EventName|string, handler:Function):void;
        public static on(eventName:EventName|string, handler:Function, priority:number):void;
        public static on(listener:{}|EventListener):void;
        public static on(target:GameObject, listener:{}|EventListener):void;
        public static on(target:GameObject, eventName:EventName|string, handler:Function):void;
        public static on(target:GameObject, eventName:EventName|string, handler:Function, priority:number):void;

        public static on(...args) {
            if(args.length === 1){
                let listener = args[0];

                this._eventBinder.on(listener);
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0]) && JudgeUtils.isFunction(args[1])){
                let eventName = args[0],
                    handler = args[1],
                    priority = 1;

                this._eventBinder.on(eventName, handler, priority);
            }
            else if(args.length === 2){
                let target = args[0],
                    listener = args[1];

                this._eventBinder.on(target, listener);
            }
            else if(args.length === 3 && JudgeUtils.isString(args[0]) && JudgeUtils.isFunction(args[1]) && JudgeUtils.isNumber(args[2])){
                let eventName = args[0],
                    handler = args[1],
                    priority = args[2];

                this._eventBinder.on(eventName, handler, priority);
            }
            else if(args.length === 3 || args.length === 4){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    priority = args[3] === undefined? 1 :args[3];

                this._eventBinder.on(target, eventName, handler, priority);
            }
        }

        public static off():void;
        public static off(eventName:EventName|string):void;
        public static off(eventName:EventName|string, handler:Function):void;
        public static off(target:GameObject):void;
        public static off(target:GameObject, eventName:EventName|string):void;
        public static off(target:GameObject, eventName:EventName|string, handler:Function):void;

        public static off(...args) {
            this._eventBinder.off.apply(this._eventBinder, args);
        }

        public static trigger(event:Event):void;
        public static trigger(event:Event, userData:any):void;
        public static trigger(target:GameObject, event:Event):void;
        public static trigger(target:GameObject, event:Event, userData:any):void;

        public static trigger(...args) {
            this._eventDispatcher.trigger.apply(this._eventDispatcher, args);
        }


        public static broadcast(target:GameObject, event:Event);
        public static broadcast(target:GameObject, event:Event, userData:any);

        public static broadcast(...args) {
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, args);
        }

        public static emit(target:GameObject, event:Event);
        public static emit(target:GameObject, event:Event, userData:any);

        public static emit(...args) {
            this._eventDispatcher.emit.apply(this._eventDispatcher, args);
        }

        public static fromEvent(eventName:EventName):wdFrp.FromEventPatternStream;
        public static fromEvent(eventName:EventName, priority:number):wdFrp.FromEventPatternStream;
        public static fromEvent(target:GameObject, eventName:EventName):wdFrp.FromEventPatternStream;
        public static fromEvent(target:GameObject, eventName:EventName, priority:number):wdFrp.FromEventPatternStream;

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
                let target = args[0],
                    eventName = args[1];

                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            else if (args.length === 3) {
                let target = args[0],
                    eventName = args[1],
                    priority = args[2];

                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }

            return wdFrp.fromEventPattern(addHandler, removeHandler);
        }

        public static setBubbleParent(target:GameObject, parent:any) {
            EventRegister.getInstance().setBubbleParent(target, parent);
        }
    }
}
