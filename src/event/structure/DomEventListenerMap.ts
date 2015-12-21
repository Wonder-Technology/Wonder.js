/// <reference path="../../filePath.d.ts"/>
module wd{
    export class DomEventListenerMap extends EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:wdCb.Hash<wdCb.Collection<DomEventRegisterData>> = wdCb.Hash.create<wdCb.Collection<DomEventRegisterData>>();

        public appendChild(dom:HTMLElement, eventName:EventName, data:DomEventRegisterData){
            this._listenerMap.appendChild(
                this._buildDomKey(dom, eventName),
                data
            );
        }

        public getChild(eventName:EventName):wdCb.Collection<DomEventRegisterData>;
        public getChild(dom:HTMLElement, eventName:EventName):wdCb.Collection<DomEventRegisterData>;

        public getChild(...args):any{
            if(args.length === 1){
                let eventName = args[0];

                return this._listenerMap.getChild(eventName);
            }
            else if(args.length === 2){
                let dom = args[0],
                    eventName = args[1];

                return this._listenerMap.getChild(this._buildDomKey(dom, eventName));
            }
        }


        public hasChild(func:(...args) => boolean):boolean;
        public hasChild(dom:HTMLElement, eventName:EventName):boolean;

        public hasChild(...args){
            if(args.length === 1 && JudgeUtils.isFunction(args[0])){
                return this._listenerMap.hasChild(args[0]);
            }
            else{
                let dom = args[0],
                    eventName = args[1],
                    list = this._listenerMap.getChild(this._buildDomKey(dom, eventName));

                return list && list.getCount() > 0;
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(eventName:EventName):wdCb.Collection<wdCb.Collection<DomEventOffData>>;

        public removeChild(eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<DomEventOffData>>;
        public removeChild(dom:HTMLElement, eventName:EventName):wdCb.Collection<wdCb.Collection<DomEventOffData>>;

        public removeChild(dom:HTMLElement, eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<DomEventOffData>>;


        public removeChild(...args):wdCb.Collection<wdCb.Collection<DomEventOffData>>{
            var self = this,
                result:any = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                result =this._getEventDataOffDataList(eventName, this._listenerMap.removeChild((list:wdCb.Collection<DomEventRegisterData>, key:string) => {
                    return self._isEventName(key, eventName);
                }));
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    resultList = wdCb.Collection.create();

                    this._listenerMap.forEach((list:wdCb.Collection<DomEventRegisterData>, key:string) => {
                        if(self._isEventName(key, eventName)){
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


                result =this._getEventDataOffDataList(eventName, this._listenerMap.removeChild(this._buildDomKey(dom, eventName)));
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    resultList = wdCb.Collection.create(),
                    handler = args[2];

                this._listenerMap.forEach((list:wdCb.Collection<DomEventRegisterData>, key:string) => {
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

        public getEventNameFromKey(key:string):EventName{
            var separator = `${DomEventListenerMap.eventSeparator}`;

            return key.indexOf(separator) > -1 ? <any>key.split(separator)[1] : key;
        }

        public isDom(key:string, dom:HTMLElement, list:wdCb.Collection<DomEventRegisterData>){
            return key.indexOf(this._buildKeyPrefix(dom)) > -1 && list !== undefined;
        }

        private _isEventName(key:string, eventName:EventName){
            return key.indexOf(`${DomEventListenerMap.eventSeparator}${eventName}`) > -1
                    //todo move to custom event
            || key === <any>eventName;
        }

        private _buildDomKey(dom:HTMLElement, eventName:EventName){
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
        eventName:EventName,
        domHandler:Function
    }
}
