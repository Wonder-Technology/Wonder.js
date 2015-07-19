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


        private _listenerMap:EventListernerMap = EventListernerMap.create();

        public register(target:GameObject, eventType:EventType, handler:Function, priority:number) {
            //var isBindEventOnView = false,
            var data = <IEventRegisterData>{
                currentTarget: target,
                handler: handler,
                priority: priority
            };

            //eventType = <string>eventType;
            ////priority set in listener, not in this(binder)!
            //if(priority){
            //    listener.setPriority(priority);
            //}


            //if (this.isBindEventOnView(eventType)){
            //    isBindEventOnView = true;
            //    //this._listenerMap.appendChild(this._buildKey(target.uid, eventType), handler);
            //}
            //else {
            //    isBindEventOnView = false;
            //    //this._listenerMap.addChild(eventType, data);
            //}


            this._listenerMap.appendChild(eventType, data);


            //this._listenerList.addChild(listener.eventCategory,  {
            //    target:target,
            //    listener:listener
            //});

            //return isBindEventOnView;
        }

        public remove(target:GameObject, eventType?:EventType) {
            //this._removeFromMap(target, eventType);
            //var self = this,
            //    result = this._listenerMap;

            if(arguments.length === 1){
                this._listenerMap.removeChild(target);

                this._handleAfterAllEventHandlerRemoved(target);

                return;
            }
            else if(arguments.length === 2){
                this._listenerMap.removeChild(target, eventType);
                if(this._isAllEventHandlerRemoved(target)){
                    this._handleAfterAllEventHandlerRemoved(target);
                }
            }
            //
            //if(eventType){
            //    result = this._listenerMap.filter((list:dyCb.Collection, name:EventType) => {
            //        return name === eventType;
            //    });
            //}
            //
            //result.forEach((list:dyCb.Collection, eventType:EventType) => {
            //    var listResult = list.filter((data:IEventRegisterData) => {
            //        return target.uid !== data.currentTarget.uid;
            //    });
            //
            //    if(listResult.getCount() > 0){
            //        //todo no <any>
            //        self._listenerMap.addChild(<any>eventType, listResult);
            //    }
            //    else{
            //        self.setBubbleParent(target, null);
            //        self._listenerMap.removeChild(eventType);
            //    }
            //});
            ////this._listenerMap.removeChild(function (data:IEventRegisterData, eventType) {
            ////    return target.uid === data.currentTarget.uid;
            ////});
        }

        public getListenerDataList(currentTarget:GameObject, eventType:EventType){
            //var result = this._listenerMap.getChild(<any>eventType),
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


            var result:dyCb.Collection = this._listenerMap.getChild(currentTarget, eventType),
                self = this;

            //if(!result || !currentTarget){
            if(!result){
                return null;
            }

            return result.sort(function (dataA, dataB) {
                    return dataB.priority - dataA.priority;
                });
        }

        public setBubbleParent(target:GameObject, parent:GameObject) {
            target.bubbleParent = parent;
        }

        public isBinded(target:GameObject, eventType:EventType) {
            return this._listenerMap.hasChild(target, eventType);
        }

        public filter(func:Function) {
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function) {
            return this._listenerMap.forEach(func);
        }

        public getChild(target:GameObject, eventType?:EventType){
            return this._listenerMap.getChild.apply(
                this._listenerMap,
                Array.prototype.slice.call(arguments, 0)
            );
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


        //private _removeFromMap(target:GameObject, eventType:EventType) {
        //}

        private _isAllEventHandlerRemoved(target:GameObject){
            return !this._listenerMap.hasChild((list:dyCb.Collection, key:string) => {
                return key.indexOf(String(target.uid)) > -1 && list !== undefined;
            });
        }

        private _handleAfterAllEventHandlerRemoved(target:GameObject){
            this.setBubbleParent(target, null);
        }

        //private _buildKey(uid, eventType){
        //    return String(uid) + "_" + eventType;
        //}
    }
}