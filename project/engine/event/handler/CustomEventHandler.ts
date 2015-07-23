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

        public on(eventType:string, handler:Function, priority:number):void;
        public on(target:GameObject, eventType:string, handler:Function, priority:number):void;

        public on(args) {
            if(arguments.length === 3){
                let eventType = arguments[0],
                    handler = arguments[1],
                    priority = arguments[2];

                EventRegister.getInstance().register(
                    null,
                    <any>eventType,
                    handler,
                    null,
                    priority
                );
            }
            else if(arguments.length === 4){
                let target = arguments[0],
                    eventType = arguments[1],
                    handler = arguments[2],
                    priority = arguments[3];

                EventRegister.getInstance().register(
                    target,
                    <any>eventType,
                    handler,
                    null,
                    priority
                );
            }
        }

        public off(eventType:string):void;
        public off(uid:number, eventType:string):void;
        public off(eventType:string, handler:Function):void;
        public off(target:GameObject, eventType:string, handler:Function):void;

        public off(args) {
            var eventRegister = EventRegister.getInstance();

            eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
        }

        public trigger(event:Event):void;
        public trigger(target:GameObject, event:Event, notSetTarget:boolean):void;

        public trigger(args) {
            var event:Event = null,
                listenerDataList:dyCb.Collection = null;

            if(arguments.length === 1){
                event = arguments[0];

                listenerDataList = EventRegister.getInstance().getListenerDataList(event.name);

                if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                    return;
                }

                listenerDataList.forEach((listenerData:IEventRegisterData) => {
                    var eventCopy = event.copy();

                    eventCopy.currentTarget = listenerData.target;
                    eventCopy.target = listenerData.target;

                    listenerData.handler(eventCopy);
                });
            }
            else if(arguments.length === 3){
                let target = arguments[0],
                    notSetTarget = arguments[2];

                event = arguments[1];
                if(!notSetTarget){
                    event.target = target;
                }

                listenerDataList = EventRegister.getInstance().getListenerDataList(target, event.name);

                if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                    return;
                }

                listenerDataList.forEach((listenerData:IEventRegisterData) => {
                    var eventCopy = event.copy();

                    eventCopy.currentTarget = listenerData.target;

                    listenerData.handler(eventCopy);
                });
            }

        }
    }
}
