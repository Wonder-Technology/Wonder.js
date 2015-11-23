/// <reference path="../../filePath.d.ts"/>
module dy {
    export class EventRegister {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        private _listenerMap:EventListenerMap = EventListenerMap.create();

        public register(target:GameObject, eventName:EventName, handler:Function, wrapHandler:Function, priority:number) {
            //var isBindEventOnView = false,
            var data = <EventRegisterData>{
                target: target,
                handler: handler,
                wrapHandler: wrapHandler,
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

        public remove(eventName:EventName):void;
        public remove(eventName:EventName, handler:Function):void;
        public remove(uid:number, eventName:EventName):void;
        public remove(target:GameObject):void;
        public remove(target:GameObject, eventName:EventName):void;
        public remove(target:GameObject, eventName:EventName, handler:Function):void;

        public remove(args) {
            var target = arguments[0];

            if(arguments.length === 1 && JudgeUtils.isString(arguments[0])){
                let eventName = arguments[0];

                this._listenerMap.removeChild(eventName);

                return null;
            }
            else if(arguments.length === 2 && JudgeUtils.isFunction(arguments[1])){
                let eventName = arguments[0],
                    handler = arguments[1];

                this._listenerMap.removeChild(eventName, handler);

                return null;
            }
            else if(arguments.length === 2 && JudgeUtils.isNumber(arguments[0])){
                let uid = arguments[0],
                    eventName = arguments[1];

                this._listenerMap.removeChild(uid, eventName);

                return null;
            }
            else if(arguments.length === 1){
                let dataList = null;

                dataList = this._listenerMap.getEventOffDataList(target);

                this._listenerMap.removeChild(target);

                this._handleAfterAllEventHandlerRemoved(target);

                return dataList;
            }
            else if(arguments.length === 2 || arguments.length === 3){
                let eventName = arguments[1];

                this._listenerMap.removeChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));

                if(this._isAllEventHandlerRemoved(target)){
                    this._handleAfterAllEventHandlerRemoved(target);

                    return this._listenerMap.getEventOffDataList(target, eventName);
                }

                return null;
            }
        }

        public getEventRegisterDataList(eventName:EventName):any;
        public getEventRegisterDataList(currentTarget:GameObject, eventName:EventName):any;

        public getEventRegisterDataList(args){
            var result:dyCb.Collection<EventRegisterData> = this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0)),
                self = this;

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

        public isBinded(target:GameObject, eventName:EventName) {
            return this._listenerMap.hasChild(target, eventName);
        }

        public filter(func:Function) {
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function) {
            return this._listenerMap.forEach(func);
        }

        public getChild(target:GameObject, eventName?:EventName){
            return this._listenerMap.getChild.apply(
                this._listenerMap,
                Array.prototype.slice.call(arguments, 0)
            );
        }

        public getEventNameFromKey(key:string){
            return this._listenerMap.getEventNameFromKey(key);
        }

        public getUidFromKey(key:string){
            return this._listenerMap.getUidFromKey(key);
        }

        public getWrapHandler(target:GameObject, eventName:EventName){
            var list:dyCb.Collection<EventOffData> = this.getChild(target, eventName);

            if(list && list.getCount() > 0){
                return list.getChild(0).wrapHandler;
            }
        }

        public isTarget(key:string, target:GameObject, list:dyCb.Collection<EventRegisterData>){
            return this._listenerMap.isTarget(key, target, list);
        }

        //public copy(){
        //
        //}

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


        //private _removeFromMap(target:GameObject, eventName:EventName) {
        //}

        private _isAllEventHandlerRemoved(target:GameObject){
            return !this._listenerMap.hasChild((list:dyCb.Collection<EventRegisterData>, key:string) => {
                return key.indexOf(String(target.uid)) > -1 && list !== undefined;
            });
        }

        private _handleAfterAllEventHandlerRemoved(target:GameObject){
            this.setBubbleParent(target, null);
        }

        //private _buildKey(uid, eventName){
        //    return String(uid) + "_" + eventName;
        //}
    }

    export type EventRegisterData = {
        target:GameObject,
        //user's event handler
        handler:Function,
        //the actual event handler
        wrapHandler:Function,
        priority:number
    };
}