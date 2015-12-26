/// <reference path="../../filePath.d.ts"/>
module wd{
    export abstract class EventListenerMap{
        protected listenerMap:wdCb.Hash<wdCb.Collection<EventRegisterData>> = wdCb.Hash.create<wdCb.Collection<EventRegisterData>>();

        public abstract getChild(...args):wdCb.Collection<any>;
        public abstract removeChild(...args):any;

        public hasChild(func:(...args) => boolean):boolean;
        public hasChild(target:GameObject, eventName:EventName):boolean;
        public hasChild(dom:HTMLElement, eventName:EventName):boolean;

        public hasChild(...args){
            if(args.length === 1 && JudgeUtils.isFunction(args[0])){
                return this.listenerMap.hasChild(args[0]);
            }
            else{
                let target = args[0],
                    eventName = args[1],
                    list = this.listenerMap.getChild(this.buildKey(target, eventName));

                return list && list.getCount() > 0;
            }
        }

        public appendChild(target:GameObject|HTMLElement, eventName:EventName, data:any){
            this.listenerMap.appendChild(
                this.buildKey(target, eventName),
                data
            );
        }

        public filter(func:Function){
            return this.listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this.listenerMap.forEach(func);
        }

        public getEventNameFromKey(key:string):EventName{
            var separator = this.getEventSeparator();

            return key.indexOf(separator) > -1 ? <any>key.split(separator)[1] : key;
        }


        protected abstract buildKey(...args):string;
        protected abstract getEventSeparator():string;


        protected isEventName(key:string, eventName:EventName){
            return key.indexOf(`${this.getEventSeparator()}${eventName}`) > -1
                || key === <any>eventName;
        }
    }
}

