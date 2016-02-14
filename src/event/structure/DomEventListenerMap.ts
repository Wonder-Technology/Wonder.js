module wd{
    export class DomEventListenerMap extends EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        protected listenerMap:wdCb.Hash<wdCb.Collection<DomEventRegisterData>>;

        public getChild(eventName:EEventName):wdCb.Collection<DomEventRegisterData>;
        public getChild(dom:HTMLElement, eventName:EEventName):wdCb.Collection<DomEventRegisterData>;

        public getChild(...args):any{
            if(args.length === 1){
                let eventName = args[0];

                return this.listenerMap.getChild(eventName);
            }
            else if(args.length === 2){
                let dom = args[0],
                    eventName = args[1];

                return this.listenerMap.getChild(this.buildKey(dom, eventName));
            }
        }

        public removeChild(eventName:EEventName):wdCb.Collection<wdCb.Collection<DomEventOffData>>;

        public removeChild(eventName:EEventName, handler:Function):wdCb.Collection<wdCb.Collection<DomEventOffData>>;
        public removeChild(dom:HTMLElement, eventName:EEventName):wdCb.Collection<wdCb.Collection<DomEventOffData>>;

        public removeChild(dom:HTMLElement, eventName:EEventName, handler:Function):wdCb.Collection<wdCb.Collection<DomEventOffData>>;


        public removeChild(...args):wdCb.Collection<wdCb.Collection<DomEventOffData>>{
            var self = this,
                result:any = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                result =this._getEventDataOffDataList(eventName, this.listenerMap.removeChild((list:wdCb.Collection<DomEventRegisterData>, key:string) => {
                    return self.isEventName(key, eventName);
                }));
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    resultList = wdCb.Collection.create();

                    this.listenerMap.forEach((list:wdCb.Collection<DomEventRegisterData>, key:string) => {
                        if(self.isEventName(key, eventName)){
                            let result = list.removeChild((val:DomEventRegisterData) => {
                                return val.originHandler === handler;
                            });

                            if(result.getCount() > 0){
                                resultList.addChild(result);
                            }

                            if(list.getCount() === 0){
                                return wdCb.$REMOVE;
                            }
                        }
                    });

                    result = this._getEventDataOffDataList(eventName, resultList);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1];


                result =this._getEventDataOffDataList(eventName, this.listenerMap.removeChild(this.buildKey(dom, eventName)));
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    resultList = wdCb.Collection.create(),
                    handler = args[2];

                this.listenerMap.forEach((list:wdCb.Collection<DomEventRegisterData>, key:string) => {
                    let result = list.removeChild((val:DomEventRegisterData) => {
                        return val.originHandler === handler;
                    });

                    if(result.getCount() > 0){
                        resultList.addChild(result);
                    }

                    if(list.getCount() === 0){
                        return wdCb.$REMOVE;
                    }
                });

                result = this._getEventDataOffDataList(eventName, resultList);
            }

            return result;
        }

        public isDom(key:string, dom:HTMLElement, list:wdCb.Collection<DomEventRegisterData>){
            return key.indexOf(this._buildKeyPrefix(dom)) > -1 && list !== undefined;
        }

        protected getEventSeparator():string{
            return `${DomEventListenerMap.eventSeparator}`;
        }

        protected buildKey(dom:HTMLElement, eventName:EEventName):string{
            return `${this._buildKeyPrefix(dom)}${DomEventListenerMap.eventSeparator}${eventName}`;
        }

        private _buildKeyPrefix(dom:HTMLElement){
            return dom.id ? `${dom.tagName}${dom.id}` : `${dom.tagName}`;
        }

        private _getEventDataOffDataList(eventName:string, result:any):any{
            return result.map((list:wdCb.Collection<any>) => {
                return list.map((data:DomEventRegisterData) => {
                    return {
                        dom: data.dom,
                        eventName: eventName,
                        domHandler: data.domHandler
                    }
                });
            });
        }
    }

    export type DomEventOffData = {
        dom:HTMLElement,
        eventName:EEventName,
        domHandler:Function
    }
}
