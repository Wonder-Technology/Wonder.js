module wd {
    export abstract class EventRegister {
        protected abstract listenerMap:EventListenerMap;

        public abstract register(...args):void;
        public abstract remove(...args):void;

        public getEventRegisterDataList(eventName:EEventName):any;

        public getEventRegisterDataList(currentTarget:EntityObject, eventName:EEventName):any;
        public getEventRegisterDataList(dom:HTMLElement, eventName:EEventName):any;

        public getEventRegisterDataList(...args) {
            var result:wdCb.Collection<EventRegisterData> = this.listenerMap.getChild.apply(this.listenerMap, args);

            if (!result) {
                return null;
            }

            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        }

        public filter(func:Function) {
            return this.listenerMap.filter(func);
        }

        public forEach(func:Function) {
            return this.listenerMap.forEach(func);
        }

        public getChild(eventName:EEventName);
        public getChild(target:EntityObject);

        public getChild(target:EntityObject, eventName:EEventName);
        public getChild(dom:HTMLElement, eventName:EEventName);

        public getChild(...args) {
            return this.listenerMap.getChild.apply(
                this.listenerMap,
                Array.prototype.slice.call(arguments, 0)
            );
        }

        public getEventNameFromKey(key:string) {
            return this.listenerMap.getEventNameFromKey(key);
        }
    }

    export type EventRegisterData = {
        //user's event handler
        originHandler: Function,
        //wraped user's event handler
        handler:Function,
        //dom event handler
        domHandler:Function,
        priority:number
    };
}
