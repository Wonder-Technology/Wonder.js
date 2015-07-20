/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export interface IEventRegisterData {
        currentTarget:GameObject,
        //user's event handler
        handler:Function,
        //the actual event handler
        wrapHandler:Function,
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


        private _listenerMap:EventListenerMap = EventListenerMap.create();

        public register(target:GameObject, eventType:EventType, handler:Function, wrapHandler:Function, priority:number) {
            //var isBindEventOnView = false,
            var data = <IEventRegisterData>{
                currentTarget: target,
                handler: handler,
                wrapHandler: wrapHandler,
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

        public remove(target:GameObject):void;
        public remove(target:GameObject, eventType:EventType):void;
        public remove(target:GameObject, eventType:EventType, handler:Function):void;

        public remove(args) {
            var target = arguments[0];

            if(arguments.length === 1){
                this._listenerMap.removeChild(target);

                this._handleAfterAllEventHandlerRemoved(target);

                return this._listenerMap.getEventOffDataList(target);
            }
            else if(arguments.length === 2 || arguments.length === 3){
                let eventType = arguments[1];

                this._listenerMap.removeChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));

                if(this._isAllEventHandlerRemoved(target)){
                    this._handleAfterAllEventHandlerRemoved(target);

                    return this._listenerMap.getEventOffDataList(target, eventType);
                }

                return null;
            }
        }

        //todo rename to getEventRegisterDataList
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

        public getEventTypeFromKey(key:string){
            return this._listenerMap.getEventTypeFromKey(key);
        }

        public getWrapHandler(target:GameObject, eventType:EventType){
            var list:dyCb.Collection = this.getChild(target, eventType);

            if(list && list.getCount() > 0){
                return list.getChild(0).wrapHandler;
            }
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