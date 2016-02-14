module wd {
    export class DomEventRegister extends EventRegister {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        protected listenerMap:DomEventListenerMap = DomEventListenerMap.create();


        public register(dom:HTMLElement, eventName:EEventName, eventData:wdCb.Hash<any>, handler:Function, originHandler:Function, domHandler:Function, priority:number) {
            this.listenerMap.appendChild(dom, eventName, <DomEventRegisterData>{
                dom: dom,
                eventName: eventName,
                //eventHandler: eventHandler,
                eventData: eventData,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }

        public remove(eventName:EEventName);

        public remove(eventName:EEventName, handler:Function);
        public remove(dom:HTMLElement, eventName:EEventName);

        public remove(dom:HTMLElement, eventName:EEventName, handler:Function);


        public remove(...args) {
            var result = null;

            if (args.length === 1 && JudgeUtils.isString(args[0])) {
                let eventName = args[0];

                result = this.listenerMap.removeChild(eventName);
            }
            else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
                let eventName = args[0],
                    handler = args[1];

                result = this.listenerMap.removeChild(eventName, handler);
            }
            else if ((args.length === 2 && JudgeUtils.isDom(args[0])) || args.length === 3) {
                result = this.listenerMap.removeChild.apply(this.listenerMap, args);
            }

            return result;
        }

        public isBinded(dom:HTMLElement, eventName:EEventName) {
            return this.listenerMap.hasChild(dom, eventName);
        }

        public isDom(key:string, dom:HTMLElement, list:wdCb.Collection<DomEventRegisterData>){
            return this.listenerMap.isDom(key, dom, list);
        }

        public getDomHandler(dom:HTMLElement, eventName:EEventName) {
            var list:wdCb.Collection<DomEventRegisterData> = this.getChild(dom, eventName);

            if (list && list.getCount() > 0) {
                return list.getChild(0).domHandler;
            }
        }
    }

    export type DomEventRegisterData = {
        dom?:HTMLElement,
        target?:EntityObject,
        //eventHandler:EventHandler,
        eventData:wdCb.Hash<any>,
        //user's event handler
        originHandler:Function,
        //wraped user's event handler
        handler:Function,
        //dom event handler
        domHandler:Function,
        priority:number
    };
}
