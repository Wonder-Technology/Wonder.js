module wd {
    export class MouseEventHandler extends DomEventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        //public static create() {
        //	var obj = new this();
        //
        //	return obj;
        //}


        //public lastX:number = null;
        //public lastY:number = null;


        public on(eventName:EventName, handler:(event:MouseEvent) => void, priority:number);
        public on(dom:HTMLElement, eventName:EventName, handler:(event:MouseEvent) => void, priority:number);

        @require(function(...args){
            if(args.length === 4){
                let dom = args[0];

                assert(JudgeUtils.isDom(dom), Log.info.FUNC_MUST_BE("first param", "HTMLElement"));
            }
        })
        public on(...args) {
            var dom:HTMLElement = null,
                eventName = null,
                handler = null,
                priority = null;

            if(args.length === 3){
                dom = this.getDefaultDom();

                eventName = args[0];
                handler = args[1];
                priority = args[2];
            }
            else{
                dom = args[0];
                eventName = args[1];
                handler = args[2];
                priority = args[3];
            }

            this.handler(dom, eventName, handler, priority);
        }

        protected getDefaultDom():HTMLElement{
            return document.body;
        }

        protected triggerDomEvent(dom:HTMLElement, event:Event, eventName:EventName){
            var eventObj = this._createEventObject(dom, event, eventName);

            EventManager.trigger(dom, eventObj);
        }

        protected addEngineHandler(eventName:EventName, handler:(event:MouseEvent) => void){
            var resultHandler = null;

            switch (eventName){
                case EventName.MOUSEMOVE:
                    resultHandler = this._handleMove(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }

            return resultHandler;
        }

        protected createEventData():wdCb.Hash<any>{
            var eventData = wdCb.Hash.create<any>();

            eventData.addChild("lastX", null);
            eventData.addChild("lastY", null);

            return eventData;
        }

        private _handleMove(handler:(event:MouseEvent) => void){
            var self = this;

            return (event:MouseEvent, eventData:wdCb.Hash<any>) => {
                self._copyEventDataToEventObject(event, eventData);

                handler(event);

                self._saveLocation(event, eventData);
            };
        }

        private _createEventObject(dom:HTMLElement, event:any, eventName:EventName) {
            var obj = MouseEvent.create(event ? event : root.event, eventName);

            obj.target = dom;

            return obj;
        }

        private _copyEventDataToEventObject(event:MouseEvent, eventData:wdCb.Hash<any>){
            event.lastX = eventData.getChild("lastX");
            event.lastY = eventData.getChild("lastY");
        }

        private _saveLocation(event:MouseEvent, eventData:wdCb.Hash<any>){
            var location = event.location;

            eventData.addChild("lastX", location.x);
            eventData.addChild("lastY", location.y);
        }
    }
}

