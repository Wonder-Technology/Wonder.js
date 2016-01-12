module wd {
    declare var document:any;

    //todo bind on EntityObject which has the focus
    export class KeyboardEventHandler extends DomEventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        //public keyState:any = {};

        public on(eventName:EventName, handler:(event:MouseEvent) => void, priority:number);
        public on(dom:HTMLElement, eventName:EventName, handler:(event:MouseEvent) => void, priority:number);

        public on(...args) {
            var eventName = null,
                handler = null,
                priority = null;

            if(args.length === 3){
                eventName = args[0];
                handler = args[1];
                priority = args[2];
            }
            else{
                Log.warn("keyboard event can only bind on document.body");

                eventName = args[1];
                handler = args[2];
                priority = args[3];
            }

            this.handler(this.getDefaultDom(), eventName, handler, priority);
        }

        protected triggerDomEvent(dom:HTMLElement, event:Event, eventName:EventName){
            var eventObj = this._createEventObject(dom, event, eventName);

            EventManager.trigger(dom, eventObj);
        }

        protected getDefaultDom():HTMLElement{
            return document.body;
        }

        protected addEngineHandler(eventName:EventName, handler:(event:KeyboardEvent) => void){
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

        protected createEventData():wdCb.Hash<any>{
            var eventData = wdCb.Hash.create<any>();

            eventData.addChild("keyState", {});

            return eventData;
        }

        private _handleKeyDown(handler:(event:KeyboardEvent) => void){
            var self = this;

            return (event:KeyboardEvent, eventData:wdCb.Hash<any>) => {
                var keyState:any = eventData.getChild("keyState");

                self._setKeyStateAllFalse(keyState);
                keyState[event.key] = true;

                self._copyEventDataToEventObject(event, eventData);

                handler(event);
            };
        }

        private _handleKeyUp(handler:(event:KeyboardEvent) => void){
            var self = this;

            return (event:KeyboardEvent, eventData:wdCb.Hash<any>) => {
                self._setKeyStateAllFalse(eventData.getChild("keyState"));

                self._copyEventDataToEventObject(event, eventData);

                handler(event);
            };
        }

        private _copyEventDataToEventObject(event:KeyboardEvent, eventData:wdCb.Hash<any>){
            event.keyState = eventData.getChild("keyState");
        }

        private _setKeyStateAllFalse(keyState:any) {
            for (let i in keyState) {
                if (keyState.hasOwnProperty(i)) {
                    keyState[i] = false;
                }
            }
        }

        private _createEventObject(dom:HTMLElement, event:any, eventName:EventName) {
            var obj = KeyboardEvent.create(event ? event : root.event, eventName);

            obj.target = dom;

            return obj;
        }
    }
}

