module wd {
    @singleton()
    export class TouchEventHandler extends PointEventHandler{
        public static getInstance():any {}

		private constructor(){super();}

        protected addEngineHandler(eventName:EEventName, handler:(event:TouchEvent) => void){
            var resultHandler = null;

            switch (eventName){
                case EEventName.TOUCHMOVE:
                    resultHandler = this.handleMove(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }

            return resultHandler;
        }

        protected createEventObject(dom:HTMLElement, event:ITouchEventData, eventName:EEventName) {
            var obj = TouchEvent.create(event ? event : root.event, eventName);

            obj.target = dom;

            return obj;
        }
    }
}

