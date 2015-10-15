/// <reference path="../../definitions.d.ts"/>
module dy{
    export class EventListenerMap{
        public static eventSeparator = "@";

        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:dyCb.Hash<dyCb.Collection<EventRegisterData>> = dyCb.Hash.create<dyCb.Collection<EventRegisterData>>();

        public appendChild(eventName:EventName, data:EventRegisterData){
            this._listenerMap.appendChild(
                //String(data.target.uid) + "_" + eventName,
                this._buildKey(data.target, eventName),
                data
            );
        }

        public getChild(eventName:EventName):dyCb.Collection<EventRegisterData>;
        public getChild(target:GameObject):dyCb.Collection<EventRegisterData>;
        public getChild(target:GameObject, eventName:EventName):dyCb.Collection<EventRegisterData>;

        public getChild(args):any{
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventName);
            //});
            //
            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                return this._listenerMap.getChild(eventName);
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                return this._listenerMap.filter((list:dyCb.Collection<EventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1];

                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        }

        public hasChild(...args){
            if(arguments.length === 1 && JudgeUtils.isFunction(arguments[0])){
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventName = arguments[1];

                return this._listenerMap.hasChild(this._buildKey(target, eventName));
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(eventName:EventName):void;
        public removeChild(eventName:EventName, handler:Function):void;
        public removeChild(uid:number, eventName:EventName):void;
        public removeChild(target:GameObject):void;
        public removeChild(target:GameObject, eventName:EventName):void;
        public removeChild(target:GameObject, eventName:EventName, handler:Function):void;

        public removeChild(args){
            var self = this;

            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                this._listenerMap.removeChild(eventName);
            }
            else if(arguments.length === 2 && JudgeUtils.isFunction(arguments[1])){
                let eventName = arguments[0],
                    handler = arguments[1],
                    list:dyCb.Collection<EventRegisterData> = null;

                list = this._listenerMap.getChild(eventName);

                list.removeChild((val:EventRegisterData) => {
                        return val.handler === handler;
                    });

                if(list.getCount() === 0){
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if(arguments.length === 2 && JudgeUtils.isNumber(arguments[0])){
                let uid = arguments[0],
                    eventName = arguments[1];

                this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if(arguments.length === 1){
                let target = arguments[0];

                this._listenerMap.removeChild((list:dyCb.Collection<EventRegisterData>, key:string) => {
                    return self.isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                eventName = arguments[1];

                this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2];

                this._listenerMap.map((list:dyCb.Collection<EventRegisterData>, key:string) => {
                    list.removeChild((val:EventRegisterData) => {
                        return val.handler === handler;
                    });

                    if(list.getCount() === 0){
                        return dyCb.$REMOVE;
                    }

                    return [key, list];
                });
            }
        }

        public getEventOffDataList(target:GameObject, eventName?:EventName){
            var result:dyCb.Collection<EventOffData> = dyCb.Collection.create<EventOffData>(),
                self = this;

            if(arguments.length === 1){
                this.getChild(target)
                .forEach((list:dyCb.Collection<EventRegisterData>, key:string) => {
                        if(list && list.getCount() > 0){
                            result.addChild(
                                <EventOffData>{
                                    eventName: self.getEventNameFromKey(key),
                                    wrapHandler: list.getChild(0).wrapHandler
                                }
                            );
                        }
                    });

                return result;
            }
            else if(arguments.length === 2){
                var list:dyCb.Collection<EventRegisterData> = this.getChild(target, eventName);

                if(list && list.getCount() > 0){
                    result.addChild(
                        <EventOffData>{
                            eventName: eventName,
                            wrapHandler: list.getChild(0).wrapHandler
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

        public isTarget(key:string, target:GameObject, list:dyCb.Collection<EventRegisterData>){
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
        wrapHandler:Function
    }
}
