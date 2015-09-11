/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CustomEventHandler extends EventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(eventName:string, handler:Function, priority:number):void;
        public on(target:GameObject, eventName:string, handler:Function, priority:number):void;

        public on(args) {
            if(arguments.length === 3){
                let eventName = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                EventRegister.getInstance().register(
                    null,
                    <any>eventName,
                    handler,
                    null,
                    priority
                );
            }
            else if(arguments.length === 4){
                let target = arguments[0],
                    eventName = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                EventRegister.getInstance().register(
                    target,
                    <any>eventName,
                    handler,
                    null,
                    priority
                );
            }
        }

        public off(eventName:string):void;
        public off(uid:number, eventName:string):void;
        public off(eventName:string, handler:Function):void;
        public off(target:GameObject, eventName:string, handler:Function):void;

        public off(args) {
            var eventRegister = EventRegister.getInstance();

            eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
        }

        public trigger(event:Event):boolean;
        public trigger(event:Event, userData:any):boolean;
        public trigger(target:GameObject, event:Event, notSetTarget:boolean):boolean;
        public trigger(target:GameObject, event:Event, userData:any, notSetTarget:boolean):boolean;

        public trigger(args) {
            var event:Event = null;

            if(arguments.length === 1 || arguments.length === 2){
                let userData = null;

                if(arguments.length === 1){
                    event = arguments[0];
                }
                else{
                    event = arguments[0];
                    userData = arguments[1];
                }

                return this._triggerEventHandler(event, userData);
            }
            else if(arguments.length === 3 || arguments.length === 4){
                let target = null,
                    userData = null,
                    notSetTarget = null;

                if(arguments.length === 3){
                    target = arguments[0];
                    event = arguments[1];
                    notSetTarget = arguments[2];
                }
                else{
                    target = arguments[0];
                    event = arguments[1];
                    userData = arguments[2];
                    notSetTarget = arguments[3];
                }

                return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
            }

        }

        private _triggerEventHandler(event, userData){
            var listenerDataList:dyCb.Collection<IEventRegisterData> = null,
                isStopPropagation = false,
                self = this;

            listenerDataList = EventRegister.getInstance().getEventRegisterDataList(event.name);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return false;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                var eventCopy = event.copy();

                eventCopy.currentTarget = listenerData.target;
                eventCopy.target = listenerData.target;

                self._setUserData(eventCopy, userData);

                listenerData.handler(eventCopy);

                //if(eventCopy.isStopPropagation){
                //    isStopPropagation = true;
                //}
            });

            //return isStopPropagation;
            return true;
        }

        private _triggerTargetAndEventHandler(target, event, userData, notSetTarget){
            var listenerDataList:dyCb.Collection<IEventRegisterData> = null,
                isStopPropagation = false,
                self = this;

            if(!notSetTarget){
                event.target = target;
            }

            listenerDataList = EventRegister.getInstance().getEventRegisterDataList(target, event.name);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return false;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                var eventCopy = event.copy();

                eventCopy.currentTarget = listenerData.target;

                self._setUserData(eventCopy, userData);

                listenerData.handler(eventCopy);

                if(eventCopy.isStopPropagation){
                    isStopPropagation = true;
                }
            });

            return isStopPropagation;
        }

        private _setUserData(event:CustomEvent, userData){
            if(userData){
                event.userData = userData;
            }
        }
    }
}
