/// <reference path="../../definitions.d.ts"/>
module Engine3D{
    export class EventListernerMap{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _listenerMap:dyCb.Hash = dyCb.Hash.create();

        public appendChild(eventName:EventName, data:IEventRegisterData){
            this._listenerMap.appendChild(
                //String(data.currentTarget.uid) + "_" + eventName,
                this._buildKey(data.currentTarget, eventName),
                data
            );
        }

        public getChild(currentTarget:GameObject, eventName?:EventName){
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(currentTarget, eventName);
            //});
            //
            if(arguments.length === 1){
                return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
                    return self._isTarget(key, currentTarget, list);
                });
            }
            else if(arguments.length === 2){
                return this._listenerMap.getChild(this._buildKey(currentTarget, eventName));
            }
        }

        public hasChild(...args){
            if(arguments.length === 1 && JudgeUtils.isFunction(arguments[0])){
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if(arguments.length === 2){
                let currentTarget = arguments[0],
                    eventName = arguments[1];

                return this._listenerMap.hasChild(this._buildKey(currentTarget, eventName));
            }
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public removeChild(currentTarget:GameObject, eventName?:EventName){
            var self = this;

            if(arguments.length === 1){
                return this._listenerMap.removeChild((list:dyCb.Collection, key:string) => {
                    return self._isTarget(key, currentTarget, list);
                });
            }
            else if(arguments.length === 2){
                return this._listenerMap.removeChild(this._buildKey(currentTarget, eventName));
            }
        }

        private _buildKey(currentTarget:GameObject, eventName:EventName){
            return String(currentTarget.uid) + "_" + eventName;
        }

        private _isTarget(key:string, target:GameObject, list:dyCb.Collection){
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        }
    }
}
