/// <reference path="../../filePath.d.ts"/>
module wd{
    export class CustomEventListenerMap extends EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:wdCb.Hash<wdCb.Collection<CustomEventRegisterData>> = wdCb.Hash.create<wdCb.Collection<CustomEventRegisterData>>();

        public appendChild(target:GameObject, eventName:EventName, data:CustomEventRegisterData){
            this._listenerMap.appendChild(
                this._buildKey(target, eventName),
                data
            );
        }

        public getChild(eventName:EventName):wdCb.Collection<CustomEventRegisterData>;
        public getChild(target:GameObject):wdCb.Collection<CustomEventRegisterData>;
        public getChild(target:GameObject, eventName:EventName):wdCb.Collection<CustomEventRegisterData>;

        public getChild(...args):any{
            var self = this;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                return this._listenerMap.getChild(eventName);
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let target = args[0];

                return this._listenerMap.filter((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(args.length === 2){
                let target = args[0],
                    eventName = args[1];

                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        }


        public hasChild(func:(...args) => boolean):boolean;
        public hasChild(target:GameObject, eventName:EventName):boolean;

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

        public removeChild(eventName:EventName):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;
        public removeChild(target:GameObject):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;

        public removeChild(eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;
        public removeChild(uid:number, eventName:EventName):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;
        public removeChild(target:GameObject, eventName:EventName):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;

        public removeChild(target:GameObject, eventName:EventName, handler:Function):wdCb.Collection<wdCb.Collection<CustomEventOffData>>;


        public removeChild(...args):wdCb.Collection<wdCb.Collection<CustomEventOffData>>{
            var self = this,
                result:any = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                result =this._getEventDataOffDataList(eventName, this._listenerMap.removeChild((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    return self._isEventName(key, eventName);
                }));
            }
            else if(args.length === 1 && args[0] instanceof GameObject){
                let target = args[0];

                result = this._listenerMap.removeChild((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    list:wdCb.Collection<CustomEventRegisterData> = null;

                list = this._listenerMap.getChild(eventName);
                result =this._getEventDataOffDataList(eventName, wdCb.Collection.create().addChild(list.removeChild((val:CustomEventRegisterData) => {
                    return val.originHandler === handler;
                })));

                if(list.getCount() === 0){
                    this._listenerMap.removeChild(eventName);
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
            else if(args.length === 3 && args[0] instanceof GameObject){
                let eventName = args[1],
                    handler = args[2];

                this._listenerMap.forEach((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                    list.removeChild((val:CustomEventRegisterData) => {
                        return val.originHandler === handler;
                    });

                    if(list.getCount() === 0){
                        return wdCb.$REMOVE;
                    }
                });

                result = null;
            }

            return result;
        }

        public getEventNameFromKey(key:string):EventName{
            var separator = `${CustomEventListenerMap.eventSeparator}`;

            return key.indexOf(separator) > -1 ? <any>key.split(separator)[1] : key;
        }

        public getUidFromKey(key:string):number{
            var separator = `${CustomEventListenerMap.eventSeparator}`;

            return key.indexOf(separator) > -1 ? Number(<any>key.split(separator)[0]) : null;
        }

        public isTarget(key:string, target:GameObject, list:wdCb.Collection<CustomEventRegisterData>){
            return key.indexOf(this._buildKeyPrefix(target.uid)) > -1 && list !== undefined;
        }

        private _isEventName(key:string, eventName:EventName){
            return key.indexOf(`${CustomEventListenerMap.eventSeparator}${eventName}`) > -1
            || key === <any>eventName;
        }

        private _buildKey(uid:number, eventName:EventName):string;
        private _buildKey(target:GameObject, eventName:EventName):string;

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
            else if(args[0] === null){
                let eventName = args[1];

                return eventName;
            }
        }

        private _buildKeyWithUid(uid:number, eventName:EventName){
            return `${this._buildKeyPrefix(uid)}${CustomEventListenerMap.eventSeparator}${eventName}`;
        }

        private _buildKeyPrefix(uid:number){
            return `${String(uid)}`;
        }

        private _getEventDataOffDataList(eventName:string, result:any):any{
            return result.map((list:wdCb.Collection<any>) => {
                return list.map((data:CustomEventRegisterData) => {
                    return {
                        eventName: eventName,
                        domHandler: data.domHandler
                    }
                });
            });
        }
    }

    export type CustomEventOffData = {
        eventName:EventName,
        domHandler:Function
    }
}
