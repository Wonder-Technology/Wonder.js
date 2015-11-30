/// <reference path="../../filePath.d.ts"/>
module wd {
    export class EventRegister {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        private _listenerMap:EventListenerMap = EventListenerMap.create();

        public register(target:GameObject, eventName:EventName, handler:Function, originHandler:Function, domHandler:Function, priority:number) {
            this._listenerMap.appendChild(target, eventName, <EventRegisterData>{
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }

        public remove(eventName:EventName):void;
        public remove(eventName:EventName, handler:Function):void;
        public remove(uid:number, eventName:EventName):void;
        public remove(target:GameObject):void;
        public remove(target:GameObject, eventName:EventName):void;
        public remove(target:GameObject, eventName:EventName, handler:Function):void;

        public remove(...args) {
            var target = args[0],
                result = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                result = this._listenerMap.removeChild(eventName);
            }
            else if(args.length === 2 && JudgeUtils.isFunction(args[1])){
                let eventName = args[0],
                    handler = args[1];

                result = this._listenerMap.removeChild(eventName, handler);
            }
            else if(args.length === 2 && JudgeUtils.isNumber(args[0])){
                let uid = args[0],
                    eventName = args[1];

                result = this._listenerMap.removeChild(uid, eventName);
            }
            else if(args.length === 1){
                result = this._listenerMap.removeChild(target);

                this._handleAfterAllEventHandlerRemoved(target);
            }
            else if(args.length === 2 || args.length === 3){
                result = this._listenerMap.removeChild.apply(this._listenerMap, args);

                if(this._isAllEventHandlerRemoved(target)){
                    this._handleAfterAllEventHandlerRemoved(target);
                }
            }

            return result;
        }

        public getEventRegisterDataList(eventName:EventName):any;
        public getEventRegisterDataList(currentTarget:GameObject, eventName:EventName):any;

        public getEventRegisterDataList(...args){
            var result:wdCb.Collection<EventRegisterData> = this._listenerMap.getChild.apply(this._listenerMap, args);

            if(!result){
                return null;
            }

            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        }

        public setBubbleParent(target:GameObject, parent:GameObject) {
            target.bubbleParent = parent;
        }

        public isBinded(target:GameObject, eventName:EventName) {
            return this._listenerMap.hasChild(target, eventName);
        }

        public filter(func:Function) {
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function) {
            return this._listenerMap.forEach(func);
        }

        public getChild(target:GameObject, eventName?:EventName){
            return this._listenerMap.getChild.apply(
                this._listenerMap,
                Array.prototype.slice.call(arguments, 0)
            );
        }

        public getEventNameFromKey(key:string){
            return this._listenerMap.getEventNameFromKey(key);
        }

        public getUidFromKey(key:string){
            return this._listenerMap.getUidFromKey(key);
        }

        public getDomHandler(target:GameObject, eventName:EventName){
            var list:wdCb.Collection<EventOffData> = this.getChild(target, eventName);

            if(list && list.getCount() > 0){
                return list.getChild(0).domHandler;
            }
        }

        public isTarget(key:string, target:GameObject, list:wdCb.Collection<EventRegisterData>){
            return this._listenerMap.isTarget(key, target, list);
        }

        private _isAllEventHandlerRemoved(target:GameObject){
            return !this._listenerMap.hasChild((list:wdCb.Collection<EventRegisterData>, key:string) => {
                return key.indexOf(String(target.uid)) > -1 && (list && list.getCount() > 0);
            });
        }

        private _handleAfterAllEventHandlerRemoved(target:GameObject){
            this.setBubbleParent(target, null);
        }
    }

    export type EventRegisterData = {
        target:GameObject,
        //user's event handler
        originHandler: Function,
        //wraped user's event handler
        handler:Function,
        //dom event handler
        domHandler:Function,
        priority:number
    };
}