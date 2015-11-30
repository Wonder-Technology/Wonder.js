/// <reference path="../../filePath.d.ts"/>
module wd {
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

        //public off(eventName:EventName):void;
        //public off(eventName:EventName, handler:Function):void;

        //public off(...args) {
        //    super.off.apply(super, args);
        //}

        public on(eventName:EventName, handler:(event:KeyboardEvent) => void, priority:number) {
            this.handler(null, eventName, handler, priority);
        }

        public trigger(event:Event):boolean{
            var eventName = event.name,
                eventType = event.type,
                registerDataList:wdCb.Collection<EventRegisterData> = null,
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

        protected triggerDomEvent(event:Event, eventName:EventName, target:GameObject){
            var eventObj = this._createEventObject(event, eventName);

            EventManager.trigger(eventObj);
        }

        protected addEngineHandler(target:GameObject, eventName:EventName, handler:(event:KeyboardEvent) => void){
            var resultHandler = null;

            switch (eventName){
                case EventName.KEYDOWN:
                    resultHandler = this._handleKeyDown(handler);
                    break;
                case EventName.KEYUP:
                    resultHandler = this._handleKeyUp(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }

            return resultHandler;
        }

        protected clearHandler(){
            this.keyState = {};
        }

        private _handleKeyDown(handler:(event:KeyboardEvent) => void){
            var self = this;

            return (event:KeyboardEvent) => {
                self._setKeyStateAllFalse();
                self.keyState[event.key] = true;

                handler(event);
            };
        }

        private _handleKeyUp(handler:(event:KeyboardEvent) => void){
            var self = this;

            return (event:KeyboardEvent) => {
                self._setKeyStateAllFalse();

                handler(event);
            };
        }

        private _setKeyStateAllFalse() {
            for (let i in this.keyState) {
                if (this.keyState.hasOwnProperty(i)) {
                    this.keyState[i] = false;
                }
            }
        }

        private _createEventObject(event:any, eventName:EventName) {
            var obj = KeyboardEvent.create(event ? event : root.event, eventName);

            return obj;
        }
    }
}

