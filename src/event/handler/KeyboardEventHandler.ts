/// <reference path="../../filePath.d.ts"/>
module dy {
    declare var document:any;

    //todo bind on GameObject which has the focus
    export class KeyboardEventHandler extends DomEventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public keyState:any = {};

        public on(eventName:EventName, handler:Function, priority:number) {
            this.handler(null, eventName, handler, priority);
        }

        public trigger(event:Event):boolean{
            var eventName = event.name,
                eventType = event.type,
                registerDataList:dyCb.Collection<EventRegisterData> = null,
                self = this;

            registerDataList = EventRegister.getInstance().getEventRegisterDataList(eventName);

            if (registerDataList === null || registerDataList.getCount()=== 0) {
                return;
            }

            registerDataList.forEach((registerData:EventRegisterData) => {
                var eventCopy = event.copy();

                registerData.handler(eventCopy);
            });

            return true;
        }

        protected getDom() {
            return document;
        }

        protected createEventObject(event:any, eventName:EventName, currentTarget:GameObject) {
            var obj = KeyboardEvent.create(event ? event : root.event, eventName);

            return obj;
        }

        //todo test
        protected handleEvent(eventName:EventName, event:KeyboardEvent){
            if (!event.event) {
                return;
            }

            switch (eventName){
                case EventName.KEYDOWN:
                    this._handleKeyDown(event);
                    break;
                case EventName.KEYUP:
                    this._handleKeyUp(event);
                    break;
                //todo handle more key event
                default:
                    EventManager.trigger(event);
                    break;
            }
        }

        private _handleKeyDown(event:KeyboardEvent){
            this._setKeyStateAllFalse();
            this.keyState[event.key] = true;

            EventManager.trigger(event);
        }

        private _handleKeyUp(event:KeyboardEvent){
            this._setKeyStateAllFalse();

            EventManager.trigger(event);
        }

        private _setKeyStateAllFalse() {
            for (let i in this.keyState) {
                if (this.keyState.hasOwnProperty(i)) {
                    this.keyState[i] = false;
                }
            }
        }
    }
}
