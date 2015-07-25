/// <reference path="../../definitions.d.ts"/>
module dy {
    declare var document:any;

    //todo bind on GameObject which has the focus
    export class KeyboardEventHandler extends DomEventHandler{
        private static _instance:KeyboardEventHandler = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(eventName:EventName, handler:Function, priority:number) {
            this.handler(null, eventName, handler, priority);
        }

        public trigger(event:Event):boolean{
            var eventName = event.name,
                eventType = event.type,
                registerDataList:dyCb.Collection = null,
                self = this;

            registerDataList = EventRegister.getInstance().getEventRegisterDataList(eventName);

            if (registerDataList === null || registerDataList.getCount()=== 0) {
                return;
            }

            registerDataList.forEach((registerData:IEventRegisterData) => {
                var eventCopy = event.copy();

                registerData.handler(eventCopy);
            });

            return true;
        }

        protected getDom() {
            return document;
        }

        protected buildWrapHandler(target:GameObject, eventName:EventName){
            var self = this,
                context = window;

            return dyCb.EventUtils.bindEvent(context, function (event) {
                EventManager.trigger(self._createEventObject(event, eventName));
            });
        }


        private _isTrigger(result){
            return result && result.getCount() > 0;
        }

        private _createEventObject(event:any, eventName:EventName) {
            var obj = KeyboardEvent.create(event ? event : window.event, eventName);

            return obj;
        }
    }
}
