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

        public on(eventType:string, handler:Function, priority:number) {
            EventRegister.getInstance().register(
                null,
                <any>eventType,
                handler,
                null,
                priority
            );
        }

        public off(eventType:string):void;
        public off(eventType:string, handler:Function):void;

        public off(args) {
            var eventRegister = EventRegister.getInstance();

            eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
        }

        public trigger(event:Event) {
            var eventType= event.name,
                listenerDataList = EventRegister.getInstance().getListenerDataList(eventType);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return;
            }

            listenerDataList.forEach((listenerData:IEventRegisterData) => {
                event.target = listenerData.currentTarget;
                listenerData.handler(event);
            });
        }
    }
}
