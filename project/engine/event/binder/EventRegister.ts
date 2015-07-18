/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export interface IEventRegisterData {
        currentTarget:GameObject,
        handler:Function,
        priority:number
    }

    export class EventRegister {
        private static _instance:EventRegister = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        //private _listenerMap:EventListenerMap = EventListenerMap.create();
        //todo refactor structure to {"targetUid_eventName": target.handler} ?
        private _listenerMap:EventListernerMap = EventListernerMap.create();

        public register(target:GameObject, eventName:EventName, handler:Function, priority:number) {
            //var isBindEventOnView = false,
            var data = <IEventRegisterData>{
                currentTarget: target,
                handler: handler,
                priority: priority
            };

            //eventName = <string>eventName;
            ////priority set in listener, not in this(binder)!
            //if(priority){
            //    listener.setPriority(priority);
            //}


            //if (this.isBindEventOnView(eventName)){
            //    isBindEventOnView = true;
            //    //this._listenerMap.appendChild(this._buildKey(target.uid, eventName), handler);
            //}
            //else {
            //    isBindEventOnView = false;
            //    //this._listenerMap.addChild(eventName, data);
            //}


            this._listenerMap.appendChild(eventName, data);


            //this._listenerList.addChild(listener.eventType,  {
            //    target:target,
            //    listener:listener
            //});

            //return isBindEventOnView;
        }

        public remove(target:GameObject, eventName:EventName) {
            this._removeFromMap(target, eventName);
        }

        public getListenerDataList(currentTarget:GameObject, eventName:EventName){
            //var result = this._listenerMap.getChild(<any>eventName),
            //    self = this;
            //
            //if(!result || !currentTarget){
            //    return null;
            //}
            //
            //return result.filter(function (data) {
            //    return JudgeUtils.isEqual(data.currentTarget, currentTarget)
            //    || self._isContain(data.currentTarget, currentTarget);
            //})
            //    .sort(function (dataA, dataB) {
            //        return dataB.priority - dataA.priority;
            //    });


            var result:dyCb.Collection = this._listenerMap.getChild(currentTarget, eventName),
                self = this;

            //if(!result || !currentTarget){
            if(!result){
                return null;
            }

            return result.sort(function (dataA, dataB) {
                    return dataB.priority - dataA.priority;
                });
        }

        //todo move to eventutils?
        public setBubbleParent(target:GameObject, parent:GameObject) {
            target.bubbleParent = parent;
        }

        //todo move to eventutils?
        public getParent(target:GameObject):GameObject {
            var parent = target.bubbleParent;

            return parent ? parent : target.parent;
        }

        public isBinded(target:GameObject, eventName:EventName) {
            return this._listenerMap.hasChild(target, eventName);
        }

        public filter(func:Function) {
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function) {
            return this._listenerMap.forEach(func);
        }

        public getChild(target:GameObject, eventName:EventName){
            return this._listenerMap.getChild(target, eventName);
        }

        //private _isContain(parentTarget:GameObject, childTarget:GameObject){
        //    var parent = null;
        //
        //    parent = childTarget.parent;
        //
        //    while(parent){
        //        if(JudgeUtils.isEqual(parent, parentTarget)){
        //            return true;
        //        }
        //
        //        parent = childTarget.parent;
        //    }
        //
        //    return false;
        //}


        private _removeFromMap(target:GameObject, eventName:EventName) {
            //var self = this,
            //    result = this._listenerMap;
            //
            //if(eventName){
            //    result = this._listenerMap.filter((list:dyCb.Collection, name:EventName) => {
            //        return name === eventName;
            //    });
            //}
            //
            //result.forEach((list:dyCb.Collection, eventName:EventName) => {
            //    var listResult = list.filter((data:IEventRegisterData) => {
            //        return target.uid !== data.currentTarget.uid;
            //    });
            //
            //    if(listResult.getCount() > 0){
            //        //todo no <any>
            //        self._listenerMap.addChild(<any>eventName, listResult);
            //    }
            //    else{
            //        self.setBubbleParent(target, null);
            //        self._listenerMap.removeChild(eventName);
            //    }
            //});
            ////this._listenerMap.removeChild(function (data:IEventRegisterData, eventName) {
            ////    return target.uid === data.currentTarget.uid;
            ////});
        }


        //private _buildKey(uid, eventName){
        //    return String(uid) + "_" + eventName;
        //}
    }
}