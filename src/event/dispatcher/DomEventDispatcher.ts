module wd {
    export class DomEventDispatcher extends EventDispatcher{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public trigger(event:Event):void;
        public trigger(dom:HTMLElement, event:Event):void;

        public trigger(...args):any {
            if(args.length === 1){
                let event = args[0],
                    eventType = event.type;

                EventHandlerFactory.createEventHandler(eventType)
                    .trigger(event);
            }
            else if(args.length === 2){
                let dom = args[0],
                    event = args[1],
                    eventType = event.type;

                EventHandlerFactory.createEventHandler(eventType)
                    .trigger(dom, event);
            }
        }
    }
}

