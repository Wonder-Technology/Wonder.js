/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class CustomEventHandler extends EventHandler{
        private static _instance:CustomEventHandler = null;

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
        public trigger(target:GameObject, event:Event, notSetTarget:boolean):boolean;

        public trigger(args) {
            var event:Event = null,
                listenerDataList:dyCb.Collection = null,
                isStopPropagation = false;

            if(arguments.length === 1){
                event = arguments[0];

                listenerDataList = EventRegister.getInstance().getEventRegisterDataList(event.name);

                if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                    return false;
                }

                listenerDataList.forEach((listenerData:IEventRegisterData) => {
                    var eventCopy = event.copy();

                    eventCopy.currentTarget = listenerData.target;
                    eventCopy.target = listenerData.target;

                    listenerData.handler(eventCopy);
                    if(eventCopy.isStopPropagation){
                        isStopPropagation = true;
                    }
                });

                return isStopPropagation;
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    notSetTarget = arguments[2];

                event = arguments[1];
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

                    listenerData.handler(eventCopy);
                    if(eventCopy.isStopPropagation){
                        isStopPropagation = true;
                    }
                });

                return isStopPropagation;
            }

        }
    }
}
