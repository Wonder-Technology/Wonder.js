module wd {
    export abstract class EventRegister {
        protected abstract listenerMap:EventListenerMap;

        public abstract register(...args):void;
        public abstract remove(...args):any;

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
            }, true);
        }

        public forEachAll(func:(list:wdCb.Collection<any>, eventName:EEventName) => void) {
            return this.listenerMap.forEachAll(func);
        }

        public forEachEventName(func:(list:wdCb.Collection<EventRegisterData>, eventName:EEventName) => void){
            this.listenerMap.forEachEventName(func);
        }

        public clear() {
            return this.listenerMap.clear();
        }

        public getChild(target:EntityObject);
        public getChild(dom:HTMLElement);

        public getChild(target:EntityObject, eventName:EEventName);
        public getChild(dom:HTMLElement, eventName:EEventName);

        public getChild(...args) {
            return this.listenerMap.getChild.apply(
                this.listenerMap,
                Array.prototype.slice.call(arguments, 0)
            );
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
