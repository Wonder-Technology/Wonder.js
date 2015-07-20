/// <reference path="../../definitions.d.ts"/>
module Engine3D{
    export interface IEventOffData {
        eventType:EventType,
        wrapHandler:Function
    }

    export class EventListenerMap{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:dyCb.Hash = dyCb.Hash.create();

        public appendChild(eventType:EventType, data:IEventRegisterData){
            this._listenerMap.appendChild(
                //String(data.target.uid) + "_" + eventType,
                this._buildKey(data.currentTarget, eventType),
                data
            );
        }

        public getChild(target:GameObject, eventType?:EventType){
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventType);
            //});
            //
            if(arguments.length === 1){
                return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
                    return self._isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                return this._listenerMap.getChild(this._buildKey(target, eventType));
            }
        }

        public hasChild(...args){
            if(arguments.length === 1 && JudgeUtils.isFunction(arguments[0])){
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if(arguments.length === 2){
                let target = arguments[0],
                    eventType = arguments[1];

                return this._listenerMap.hasChild(this._buildKey(target, eventType));
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(target:GameObject):void;
        public removeChild(target:GameObject, eventType:EventType):void;
        public removeChild(target:GameObject, eventType:EventType, handler:Function):void;

        public removeChild(args){
            var self = this,
                target = arguments[0];

            if(arguments.length === 1){
                return this._listenerMap.removeChild((list:dyCb.Collection, key:string) => {
                    return self._isTarget(key, target, list);
                });
            }
            else if(arguments.length === 2){
                let eventType = arguments[1];

                return this._listenerMap.removeChild(this._buildKey(target, eventType));
            }
            else if(arguments.length === 3){
                let eventType = arguments[1],
                    handler = arguments[2];

                return this._listenerMap.map((list:dyCb.Collection, key:string) => {
                    list.removeChild((val:IEventRegisterData) => {
                        return val.handler === handler;
                    });

                    if(list.getCount() === 0){
                        return dyCb.$REMOVE;
                    }

                    return [key, list];
                });
            }
        }

        public getEventOffDataList(target:GameObject, eventType?:EventType){
            var result:dyCb.Collection = dyCb.Collection.create(),
                self = this;

            if(arguments.length === 1){
                this.getChild(target)
                .forEach((list:dyCb.Collection, key:string) => {
                        if(list && list.getCount() > 0){
                            result.addChild(
                                <IEventOffData>{
                                    eventType: self.getEventTypeFromKey(key),
                                    wrapHandler: list.getChild(0).wrapHandler
                                }
                            );
                        }
                    });

                return result;
            }
            else if(arguments.length === 2){
                var list:dyCb.Collection = this.getChild(target, eventType);

                if(list && list.getCount() > 0){
                    result.addChild(
                        <IEventOffData>{
                            eventType: eventType,
                            wrapHandler: list.getChild(0).wrapHandler
                        }
                    );
                }

                return result;
            }
        }

        public getEventTypeFromKey(key:string):EventType{
            return <any>key.split("_")[1];
        }

        private _buildKey(target:GameObject, eventType:EventType){
            return String(target.uid) + "_" + eventType;
        }

        private _isTarget(key:string, target:GameObject, list:dyCb.Collection){
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        }
    }
}
