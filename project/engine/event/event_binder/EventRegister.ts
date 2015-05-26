module Engine3D {
    export interface IEventRegisterData{
        target:GameObject,
        handler:Function,
        priority:number
    }

    export class EventRegister {
        //private _listenerMap:EventListenerMap = EventListenerMap.create();
        private _listenerMap:Hash = Hash.create();

        public register(target:GameObject, eventName: EventName, handler:Function, priority:number) {
            //var isBindEventOnView = false,
                var data = <IEventRegisterData>{
                    target: target,
                    handler: handler,
                    priority: priority
                };
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

        public remove(target:GameObject) {
            this.setBubbleParent(target, null);

            this._removeFromMap(target);
        }

        public getListenerDataList(target:GameObject, eventName: EventName):[{}] {
            return this._listenerMap.getChild(eventName)
                .filter(function (data) {
                    return JudgeUtils.isEqual(data.target, target);
                    //return listener.hasHandler(eventName);
                })
                .sort(function (dataA, dataB) {
                    return dataB.priority - dataA.priority;
                });
        }

        public setBubbleParent(target:GameObject, parent:any) {
            target.__event_bubbleParent = parent;
        }

        public getBubbleParent(target:GameObject):GameObject {
            return target.__event_bubbleParent;
        }

        public isBindEventOnView(eventName){
            return this._listenerMap.hasChild(eventName)
                && EventTable.isEventOnView(eventName);
        }

        public filter(func:Functon){
            return this._listenerMap.filter(func);
        }

        public forEach(func:Function){
            return this._listenerMap.forEach(func);
        }

        private _removeFromMap(target){
            this._listenerMap.removeChild(function(data, eventName){
                return target.uid === data.target.uid;
            });
        }


        //private _buildKey(uid, eventName){
        //    return String(uid) + "_" + eventName;
        //}
    }
}