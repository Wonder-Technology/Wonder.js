module wd {
    @singleton()
    export class MouseEventHandler extends PointEventHandler{
        public static getInstance():any {}

		private constructor(){super();}

        protected addEngineHandler(eventName:EEventName, handler:(event:MouseEvent) => void){
            var resultHandler = null;

            switch (eventName){
                case EEventName.MOUSEMOVE:
                    resultHandler = this.handleMove(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }

            return resultHandler;
        }

        protected createEventObject(dom:HTMLElement, event:IMouseEventData, eventName:EEventName) {
            var obj = MouseEvent.create(event ? event : root.event, eventName);

            obj.target = dom;

            return obj;
        }
    }
}

