module wd {
    export abstract class EventRegister {
        protected listenerMap:EventListenerMap = ABSTRACT_ATTRIBUTE;

        public abstract register(...args):void;
        public abstract remove(...args):void;

        public getEventRegisterDataList(eventName:EventName):any;

        public getEventRegisterDataList(currentTarget:EntityObject, eventName:EventName):any;
        public getEventRegisterDataList(dom:HTMLElement, eventName:EventName):any;

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

        public getChild(eventName:EventName);
        public getChild(target:EntityObject);

        public getChild(target:EntityObject, eventName:EventName);
        public getChild(dom:HTMLElement, eventName:EventName);

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
