/// <reference path="../../definitions.d.ts"/>
module Engine3D{
    export class EventListernerMap{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:dyCb.Hash = dyCb.Hash.create();

        public appendChild(eventType:EventType, data:IEventRegisterData){
            this._listenerMap.appendChild(
                //String(data.currentTarget.uid) + "_" + eventType,
                this._buildKey(data.currentTarget, eventType),
                data
            );
        }

        public getChild(currentTarget:GameObject, eventType?:EventType){
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(currentTarget, eventType);
            //});
            //
            if(arguments.length === 1){
                return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
                    return self._isTarget(key, currentTarget, list);
                });
            }
            else if(arguments.length === 2){
                return this._listenerMap.getChild(this._buildKey(currentTarget, eventType));
            }
        }

        public hasChild(...args){
            if(arguments.length === 1 && JudgeUtils.isFunction(arguments[0])){
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if(arguments.length === 2){
                let currentTarget = arguments[0],
                    eventType = arguments[1];

                return this._listenerMap.hasChild(this._buildKey(currentTarget, eventType));
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(currentTarget:GameObject, eventType?:EventType){
            var self = this;

            if(arguments.length === 1){
                return this._listenerMap.removeChild((list:dyCb.Collection, key:string) => {
                    return self._isTarget(key, currentTarget, list);
                });
            }
            else if(arguments.length === 2){
                return this._listenerMap.removeChild(this._buildKey(currentTarget, eventType));
            }
        }

        private _buildKey(currentTarget:GameObject, eventType:EventType){
            return String(currentTarget.uid) + "_" + eventType;
        }

        private _isTarget(key:string, target:GameObject, list:dyCb.Collection){
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        }
    }
}
