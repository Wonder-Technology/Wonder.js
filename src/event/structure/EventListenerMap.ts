/// <reference path="../../filePath.d.ts"/>
module wd{
    export class EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:wdCb.Hash<wdCb.Collection<EventRegisterData>> = wdCb.Hash.create<wdCb.Collection<EventRegisterData>>();

        public appendChild(target:GameObject, eventName:EventName, data:EventRegisterData){
            this._listenerMap.appendChild(
                //String(data.target.uid) + "_" + eventName,
                this._buildKey(target, eventName),
                data
            );
        }

        //public update(target:GameObject, eventName:EventName, data:EventRegisterData){
            //:wdCb.Collection<EventRegisterData>
            //this._listenerMap.getChild(this._buildKey(target, eventName)).replace((data:EventRegisterData) => {
            //
            //});
            //this._listenerMap.update(target, eventName,
            //    <EventRegisterData>{
            //        target: target,
            //        handler: handler,
            //        domHandler: domHandler,
            //        priority: priority
            //    });
        //}

        public getChild(eventName:EventName):wdCb.Collection<EventRegisterData>;
        public getChild(target:GameObject):wdCb.Collection<EventRegisterData>;
        public getChild(target:GameObject, eventName:EventName):wdCb.Collection<EventRegisterData>;

        public getChild(args):any{
            var self = this;
            //
            //return this._listenerMap.filter((list:wdCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventName);
            //});
            //
            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                return this._listenerMap.getChild(eventName);
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                return this._listenerMap.filter((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1];

                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        }


        public hasChild(func:(...args) => boolean):boolean;
        public hasChild(target:GameObject, eventName:EventName):boolean;

        public hasChild(...args){
            if(arguments.length === 1 && JudgeUtils.isFunction(arguments[0])){
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1],
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
        public removeChild(eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(uid:number, eventName:EventName):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(target:GameObject):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(target:GameObject, eventName:EventName):wdCb.Collection<wdCb.Collection<EventOffData>>;
        public removeChild(target:GameObject, eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<EventOffData>>;

        public removeChild(args){
            var self = this,
                result = null;

            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                result = this._listenerMap.removeChild(eventName);
            }
            else if(arguments.length === 2 && JudgeUtils.isFunction(arguments[1])){
                let eventName = arguments[0],
                    handler = arguments[1],
                    list:wdCb.Collection<EventRegisterData> = null;

                list = this._listenerMap.getChild(eventName);

                result = wdCb.Collection.create().addChild(list.removeChild((val:EventRegisterData) => {
                    return val.originHandler === handler;
                }));

                if(list.getCount() === 0){
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if(arguments.length === 2 && JudgeUtils.isNumber(arguments[0])){
                let uid = arguments[0],
                    eventName = arguments[1];

                result = this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                result = this._listenerMap.removeChild((list:wdCb.Collection<EventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                eventName = arguments[1];

                result = this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    eventName = arguments[1],
                    resultList = wdCb.Collection.create(),
                    handler = arguments[2];

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

                result = resultList;
            }

            return result;
        }

        public getEventOffDataList(target:GameObject, eventName?:EventName){
            var result:wdCb.Collection<EventOffData> = wdCb.Collection.create<EventOffData>(),
                self = this;

            if(arguments.length === 1){
                this.getChild(target)
                .forEach((list:wdCb.Collection<EventRegisterData>, key:string) => {
                        if(list && list.getCount() > 0){
                            result.addChild(
                                <EventOffData>{
                                    eventName: self.getEventNameFromKey(key),
                                    domHandler: list.getChild(0).domHandler
                                }
                            );
                        }
                    });

                return result;
            }
            else if(arguments.length === 2){
                var list:wdCb.Collection<EventRegisterData> = this.getChild(target, eventName);

                if(list && list.getCount() > 0){
                    result.addChild(
                        <EventOffData>{
                            eventName: eventName,
                            domHandler: list.getChild(0).domHandler
                        }
                    );
                }

                return result;
            }
        }

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

        private _buildKey(uid:number, eventName:EventName):string;
        private _buildKey(target:GameObject, eventName:EventName):string;

        private _buildKey(args){
            if(JudgeUtils.isNumber(arguments[0])){
                let uid = arguments[0],
                    eventName = arguments[1];

                return this._buildKeyWithUid(uid, eventName);
            }
            else{
                let target = arguments[0],
                    eventName = arguments[1];

                return target ? this._buildKeyWithUid(target.uid, eventName) : <any>eventName;
            }
        }

        private _buildKeyWithUid(uid:number, eventName:EventName){
            return `${String(uid)}${EventListenerMap.eventSeparator}${eventName}`;
        }
    }

    export type EventOffData = {
        eventName:EventName,
        domHandler:Function
    }
}
