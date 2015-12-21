/// <reference path="../../filePath.d.ts"/>
module wd{
    export class EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:wdCb.Hash<wdCb.Collection<EventRegisterData>> = wdCb.Hash.create<wdCb.Collection<EventRegisterData>>();

        public appendChild(target:GameObject, eventName:EventName, data:EventRegisterData);
        public appendChild(dom:HTMLElement, eventName:EventName, data:EventRegisterData);

        public appendChild(...args){
            var eventName = args[1],
                data = args[2];

            if(args[0] === null || args[0] instanceof GameObject){
                let target = args[0];

                this._listenerMap.appendChild(
                    this._buildKey(target, eventName),
                    data
                );
            }
            else if(JudgeUtils.isDom(args[0])){
                let dom = args[0];

                this._listenerMap.appendChild(
                    this._buildDomKey(dom, eventName),
                    data
                );
            }

        }

        public getChild(eventName:EventName):wdCb.Collection<EventRegisterData>;
        public getChild(target:GameObject):wdCb.Collection<EventRegisterData>;
        public getChild(target:GameObject, eventName:EventName):wdCb.Collection<EventRegisterData>;
        public getChild(dom:HTMLElement, eventName:EventName):wdCb.Collection<EventRegisterData>;

        public getChild(...args):any{
            var self = this;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                //todo split!
                let eventName = args[0];

                //return this._listenerMap.getChild(eventName);
                return this._listenerMap.getChild(eventName);
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let target = args[0];

                //todo fix? filter?
                return this._listenerMap.filter((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(args.length === 2 && args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1];

                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1];

                return this._listenerMap.getChild(this._buildDomKey(dom, eventName));
            }
        }


        public hasChild(func:(...args) => boolean):boolean;
        public hasChild(target:GameObject, eventName:EventName):boolean;
        public hasChild(dom:HTMLElement, eventName:EventName):boolean;

        public hasChild(...args){
            if(args.length === 1 && JudgeUtils.isFunction(args[0])){
                return this._listenerMap.hasChild(args[0]);
            }
            else{
                let target = args[0],
                    eventName = args[1],
                    list = this._listenerMap.getChild(this._buildKey(target, eventName));

                return list && list.getCount() > 0;
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(eventName:EventName):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(target:GameObject):wdCb.Collection<wdCb.Collection<EventOffData>>;

        public removeChild(eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(uid:number, eventName:EventName):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(target:GameObject, eventName:EventName):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(dom:HTMLElement, eventName:EventName):wdCb.Collection<wdCb.Collection<EventOffData>>;

        public removeChild(target:GameObject, eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(dom:HTMLElement, eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<EventOffData>>;


        //todo refactor
        public removeChild(...args):wdCb.Collection<wdCb.Collection<EventOffData>>{
            var self = this,
                result:any = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                //result =this._getEventDataOffDataList(eventName, this._listenerMap.removeChild(eventName));
                result =this._getEventDataOffDataList(eventName, this._listenerMap.removeChild((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    return self._isEventName(key, eventName);
                }));
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let target = args[0];

                result = this._listenerMap.removeChild((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(args.length === 2 && JudgeUtils.isFunction(args[1])){
                let eventName = args[0],
                    handler = args[1],
                    list:wdCb.Collection<EventRegisterData> = null;

                list = this._listenerMap.getChild(eventName);

                //todo dom event
                if(!list){
                    //let totalList = wdCb.Collection.create<any>(),
                    let resultList = wdCb.Collection.create();

                    //this._listenerMap.((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    //    if(self._isEventName(key, eventName)){
                    //        totalList.addChildren(list);
                    //    }
                    //});


                    this._listenerMap.forEach((list:wdCb.Collection<EventRegisterData>, key:string) => {
                        if(self._isEventName(key, eventName)){
                            let result = list.removeChild((val:EventRegisterData) => {
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





                    //result =this._getEventDataOffDataList(eventName, wdCb.Collection.create().addChild(list.removeChild((val:EventRegisterData) => {
                    //    return val.originHandler === handler;
                    //})));

                    //if(list.getCount() === 0){
                    //    this._listenerMap.removeChild(eventName);
                    //}

                    result = this._getEventDataOffDataList(eventName, resultList);
                }
                else{
                    result =this._getEventDataOffDataList(eventName, wdCb.Collection.create().addChild(list.removeChild((val:EventRegisterData) => {
                        return val.originHandler === handler;
                    })));

                    if(list.getCount() === 0){
                        this._listenerMap.removeChild(eventName);
                    }
                }

            }
            else if(args.length === 2 && JudgeUtils.isNumber(args[0])){
                let uid = args[0],
                    eventName = args[1];

                result = this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if(args.length === 2 && args[0] instanceof GameObject){
                let target = args[0],
                eventName = args[1];

                result = this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1];

                //result = this._listenerMap.removeChild(this._buildDomKey(dom, eventName));

                result =this._getEventDataOffDataList(eventName, this._listenerMap.removeChild(this._buildDomKey(dom, eventName)));
            }
            else if(args.length === 3 && args[0] instanceof GameObject){
                let eventName = args[1],
                    //resultList = wdCb.Collection.create(),
                    handler = args[2];

                this._listenerMap.forEach((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    //let result = list.removeChild((val:EventRegisterData) => {
                    list.removeChild((val:EventRegisterData) => {
                        return val.originHandler === handler;
                    });

                    //if(result.getCount() > 0){
                    //    resultList.addChild(result);
                    //}

                    if(list.getCount() === 0){
                        return wdCb.$REMOVE;
                    }
                });

                //result = resultList;
                result = null;
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let eventName = args[1],
                    resultList = wdCb.Collection.create(),
                    handler = args[2];

                this._listenerMap.forEach((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    let result = list.removeChild((val:EventRegisterData) => {
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

        private _getEventDataOffDataList(eventName:string, result:any):any{
            return result.map((list:wdCb.Collection<any>) => {
                return list.map((data:EventRegisterData) => {
                    if (data.dom) {
                        return {
                            dom: data.dom,
                            eventName: eventName,
                            domHandler: data.domHandler
                        }
                    }
                    else {
                        return {
                            eventName: eventName,
                            domHandler: data.domHandler
                        }
                    }
                });
            });
        }

        //public getEventOffDataList(target:GameObject);
        //public getEventOffDataList(target:GameObject, eventName:EventName);
        //
        //public getEventOffDataList(...args){
        //    var result:wdCb.Collection<EventOffData> = wdCb.Collection.create<EventOffData>(),
        //        target = args[0],
        //        self = this;
        //
        //    if(args.length === 1){
        //        this.getChild(target)
        //            .forEach((list:wdCb.Collection<EventRegisterData>, key:string) => {
        //                if(list && list.getCount() > 0){
        //                    result.addChild(
        //                        <EventOffData>{
        //                            eventName: self.getEventNameFromKey(key),
        //                            domHandler: list.getChild(0).domHandler
        //                        }
        //                    );
        //                }
        //            });
        //
        //        return result;
        //    }
        //    else if(args.length === 2){
        //        let eventName:EventName = args[1],
        //            list:wdCb.Collection<EventRegisterData> = this.getChild(target, eventName);
        //
        //        if(list && list.getCount() > 0){
        //            result.addChild(
        //                <EventOffData>{
        //                    eventName: eventName,
        //                    domHandler: list.getChild(0).domHandler
        //                }
        //            );
        //        }
        //
        //        return result;
        //    }
        //}

        public getEventNameFromKey(key:string):EventName{
            var separator = `${EventListenerMap.eventSeparator}`;

            return key.indexOf(separator) > -1 ? <any>key.split(separator)[1] : key;
        }

        public getUidFromKey(key:string):number{
            var separator = `${EventListenerMap.eventSeparator}`;

            return key.indexOf(separator) > -1 ? Number(<any>key.split(separator)[0]) : null;
        }

        public isTarget(key:string, target:GameObject, list:wdCb.Collection<EventRegisterData>){
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        }

        private _isEventName(key:string, eventName:EventName){
            return key.indexOf(`${EventListenerMap.eventSeparator}${eventName}`) > -1
                    //todo move to custom event
            || key === <any>eventName;
        }

        private _buildKey(uid:number, eventName:EventName):string;
        private _buildKey(target:GameObject, eventName:EventName):string;
        private _buildKey(dom:HTMLElement, eventName:EventName):string;

        private _buildKey(...args){
            if(JudgeUtils.isNumber(args[0])){
                let uid = args[0],
                    eventName = args[1];

                return this._buildKeyWithUid(uid, eventName);
            }
            else if(args[0] instanceof GameObject){
                let target = args[0],
                    eventName = args[1];

                return this._buildKeyWithUid(target.uid, eventName);
            }
            else if(JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1];

                return this._buildDomKey(dom, eventName);
            }
            else if(args[0] === null){
                let eventName = args[1];

                return eventName;
            }
        }

        private _buildKeyWithUid(uid:number, eventName:EventName){
            return `${String(uid)}${EventListenerMap.eventSeparator}${eventName}`;
        }

        private _buildDomKey(dom:HTMLElement, eventName:EventName){
            return dom.id ? `${dom.tagName}${dom.id}${EventListenerMap.eventSeparator}${eventName}` : `${dom.tagName}${EventListenerMap.eventSeparator}${eventName}`;
        }
    }

    export type EventOffData = {
        dom?:HTMLElement,
        eventName:EventName,
        domHandler:Function
    }
}
