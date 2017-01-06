module wd {
    export abstract class PointEvent extends DomEvent{
        public event:IPointEventData;

        //Get cursor location(related to document)
        public abstract location:Point;
        //Returns the current cursor location in screen coordinates(related to canvas)
        public abstract locationInView:Point;
        public abstract button:number|null;
        public readonly abstract wheel:number|null;
        public readonly abstract movementDelta:Point;

        get lastX(){
            return this.eventObj.lastX;
        }
        set lastX(x:number){
            this.eventObj.lastX = x;
        }

        get lastY(){
            return this.eventObj.lastY;
        }
        set lastY(y:number){
            this.eventObj.lastY = y;
        }

        public readonly type:EEventType = EEventType.POINT;

        public eventObj:MouseEvent|TouchEvent = null;

        public abstract getDataFromEventObj(eventObj:TouchEvent|MouseEvent):void;

        protected cloneHelper(eventObj:PointEvent){
            eventObj.event = this.event;

            return <PointEvent>this.copyMember(eventObj, this, ["eventObj", "target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
        }
    }
}

