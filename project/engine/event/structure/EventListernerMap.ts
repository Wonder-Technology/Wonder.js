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
                this.buildKey(data.currentTarget, eventName),
                data
            );
        }

        public getChild(currentTarget:GameObject, eventName:EventName){
            //var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self.buildKey(currentTarget, eventName);
            //});
            //
            return this._listenerMap.getChild(this.buildKey(currentTarget, eventName));
        }

        public hasChild(currentTarget:GameObject, eventName:EventName){
            return this._listenerMap.hasChild(this.buildKey(currentTarget, eventName));
        }

        public filter(func:Function){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        public buildKey(currentTarget:GameObject, eventName:EventName){
            return String(currentTarget.uid) + "_" + eventName;
        }
    }
}
