/// <reference path="../../filePath.d.ts"/>
module wd {
    export class DomEventRegister extends EventRegister {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        private _listenerMap:DomEventListenerMap = DomEventListenerMap.create();


        public register(dom:HTMLElement, eventName:EventName, handler:Function, originHandler:Function, domHandler:Function, priority:number) {
            this._listenerMap.appendChild(dom, eventName, <DomEventRegisterData>{
                dom: dom,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }

        public remove(eventName:EventName);

        public remove(eventName:EventName, handler:Function);
        public remove(dom:HTMLElement, eventName:EventName);

        public remove(dom:HTMLElement, eventName:EventName, handler:Function);


        public remove(...args) {
            var result = null;

            if (args.length === 1 && JudgeUtils.isString(args[0])) {
                let eventName = args[0];

                result = this._listenerMap.removeChild(eventName);
            }
            else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
                let eventName = args[0],
                    handler = args[1];

                result = this._listenerMap.removeChild(eventName, handler);
            }
            else if ((args.length === 2 && JudgeUtils.isDom(args[0])) || args.length === 3) {
                result = this._listenerMap.removeChild.apply(this._listenerMap, args);
            }

            return result;
        }

        public getEventRegisterDataList(eventName:EventName):any;
        public getEventRegisterDataList(dom:HTMLElement, eventName:EventName):any;

        public getEventRegisterDataList(...args) {
            var result:wdCb.Collection<DomEventRegisterData> = this._listenerMap.getChild.apply(this._listenerMap, args);

            if (!result) {
                return null;
            }

            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        }

        public isBinded(dom:HTMLElement, eventName:EventName) {
            return this._listenerMap.hasChild(dom, eventName);
        }

        public isDom(key:string, dom:HTMLElement, list:wdCb.Collection<DomEventRegisterData>){
            return this._listenerMap.isDom(key, dom, list);
        }

        public filter(func:Function) {
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function) {
            return this._listenerMap.forEach(func);
        }

        public getChild(eventName:EventName);
        public getChild(dom:HTMLElement, eventName:EventName);

        public getChild(...args) {
            return this._listenerMap.getChild.apply(
                this._listenerMap,
                Array.prototype.slice.call(arguments, 0)
            );
        }

        public getEventNameFromKey(key:string) {
            return this._listenerMap.getEventNameFromKey(key);
        }

        public getDomHandler(dom:HTMLElement, eventName:EventName) {
            var list:wdCb.Collection<DomEventRegisterData> = this.getChild(dom, eventName);

            if (list && list.getCount() > 0) {
                return list.getChild(0).domHandler;
            }
        }
    }

    export type DomEventRegisterData = {
        dom?:HTMLElement,
        target?:GameObject,
        //user's event handler
        originHandler: Function,
        //wraped user's event handler
        handler:Function,
        //dom event handler
        domHandler:Function,
        priority:number
    };
}